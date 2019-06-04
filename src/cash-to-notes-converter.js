const _ = require('lodash');

const { AVAILABLE_NOTES } = require('../src/constants');
const { InvalidInputError, NoteUnavailableError } = require('./errors');

const smallestNote = _.min(AVAILABLE_NOTES);

function splitCashToNotes(cash) {
	return _.chain(AVAILABLE_NOTES)
        .sortBy(x => -x)
        .reduce(({remainingCash, notes}, currentNote) => {
            const maxCurrentNotes = Math.floor(remainingCash / currentNote);
            return {
                remainingCash: remainingCash - ( maxCurrentNotes * currentNote ),
                notes: {
                    ...notes,
                    [currentNote]: maxCurrentNotes
                }
            };
        }, {remainingCash: cash, notes: {}})
        .get('notes')
        .reduce((withdrawal, amount, note) => withdrawal.concat(new Array(amount).fill(Number(note))), [])
        .value();
}

function convert(cash) {
    if (cash === null || cash === undefined) {
        return [];
    }

    if (_.isNaN(cash) || !_.isNumber(cash) || cash < 0) {
        throw new InvalidInputError();
    }
    if (cash % smallestNote) {
        throw new NoteUnavailableError();
    }
    return splitCashToNotes(cash);
}

module.exports = {
    convert
}
