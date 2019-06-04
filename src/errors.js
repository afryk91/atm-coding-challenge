class InvalidInputError extends Error {
    error = 'InvalidInputError'
};
class NoteUnavailableError extends Error {
    error = 'NoteUnavailableError'
};

module.exports = {
    InvalidInputError,
    NoteUnavailableError
}