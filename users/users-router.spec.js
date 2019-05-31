const usersRouter = require('./users-router.js');
const request = erquire('supertest');

describe('get request', () => {
	it('should return 200', () => {
		return request(usersRouter).get('/').expect(200);
	});
});
