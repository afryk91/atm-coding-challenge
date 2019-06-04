const request = require('supertest');
const sinon = require('sinon');

const express = require('express');
const testApp = express();
testApp.use(express.json());
testApp.use(require('../../src/api/v1'));

const { InvalidInputError, NoteUnavailableError } = require('../../src/errors');
const converter = require('../../src/cash-to-notes-converter');

describe('/withdraw route', () => {
    let converterStub;
    before(() => {
        converterStub = sinon.stub(converter, 'convert');
    });
    afterEach(() => {
        converterStub.resetBehavior();
    });
    it('should reject queries without amount', () => {
        return request(testApp)
            .post('/withdraw')
            .set('Content-Type', 'application/json')
            .send({})
            .expect(400);
    });

    it('should reject queries with invalid amount', () => {
        converterStub.throws(new InvalidInputError());
        return request(testApp)
            .post('/withdraw')
            .send({amount: -10})
            .set('Content-Type', 'application/json')
            .expect(400)
            .expect({error: 'InvalidInputError'});
    });

    it('should reject queries with unavailable amount', () => {
        converterStub.throws(new NoteUnavailableError());
        return request(testApp)
            .post('/withdraw')
            .send({amount: 12})
            .set('Content-Type', 'application/json')
            .expect(400)
            .expect({error: 'NoteUnavailableError'});
    });

    it('should return withdrawed notes set on correct query', () => {
        converterStub.returns([20, 20, 50]);
        return request(testApp)
            .post('/withdraw')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({amount: 90})
            .expect(200)
            .expect([20, 20, 50]);
    });
});