const expect = require('chai').expect;
const _ = require('lodash');
const converter = require('../src/cash-to-notes-converter');
const { AVAILABLE_NOTES } = require('../src/constants');
const { InvalidInputError, NoteUnavailableError } = require('../src/errors');

describe('Cash to notes converter', () => {
    it('should return empty set for empty value', () => {
        expect(converter.convert()).to.deep.equal([]);
    });

    it('should throw InvalidInputError for non-numeric values', () => {
        expect(() => converter.convert('string')).to.throw(InvalidInputError);
    });

    it('should throw InvalidInputError for negative values', () => {
        expect(() => converter.convert(-123)).to.throw(InvalidInputError);
    });

    it('should throw NoteUnavailableError if amount cannot be withdrawed with available notes', () => {
        expect(() => converter.convert(142)).to.throw(NoteUnavailableError);
    });

    it('should return exactly one note if value matches one of available notes', () => {
        _.forEach(AVAILABLE_NOTES, (note) => expect(converter.convert(note)).to.deep.equal([note]));
    });

    it('should return list notes that sum up to given cash amount', () => {
        expect(converter.convert(90)).to.deep.equal([20, 20, 50]);
    });
});

