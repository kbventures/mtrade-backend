const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../server');

beforeEach((done) => {
        mongoose.set('strictQuery', false);
        mongoose.connect('mongodb+srv://kb:Fuckthis22@cluster0.8dyricr.mongodb.net/test?retryWrites=true&w=majority')
                .then(() => done())
                .catch((err) => done(err));
});

afterEach((done) => {
        mongoose.connection
                .close()
                .then(() => {
                        app.close(() => done());
                })
                .catch((err) => done(err));
});

describe('USER Routes /api/user', () => {
        const testEmail = `${Math.floor(1000 + Math.random() * 9000)}@hotmail.com`;

        it('POST /api/user/signup should return 200 OK', async () => {
                const response = await request(app)
                        .post('/api/user/signup')
                        .send({ email: testEmail, password: 'Fuckthis22!!!' });
                expect(response.statusCode).toBe(200);
        });

        it('POST /api/user/login should return 200 OK', async () => {
                const response = await request(app)
                        .post('/api/user/login')
                        .send({ email: testEmail, password: 'Fuckthis22!!!' });
                expect(response.statusCode).toBe(200);
        });
});
