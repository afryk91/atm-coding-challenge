const converter = require('../../cash-to-notes-converter');

module.exports = (req, res) => {
    const {amount} = req.body;

    if (amount === undefined) {
        return res.status(400).send();
    }

    try {
        const withdrawal = converter.convert(Number(amount));
        res.send(withdrawal);
    } catch (e) {
        res.status(400).send(e);
 
    }
}