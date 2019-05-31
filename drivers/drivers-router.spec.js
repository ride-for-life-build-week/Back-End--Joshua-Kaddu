const driversRouter = require('./drivers-router.js');
const request = require('supertest');

describe('delete', () => {
	it('should return 200', () => {
		return request(driversRouter).delete('/:id').expect();
	});
});
