const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../server');

describe('USER Routes /api/user', () => {
        beforeEach((done) => {
                mongoose.connect(
                        'mongodb+srv://kb:Fuckthis22@cluster0.8dyricr.mongodb.net/trades?retryWrites=true&w=majority',
                        { useNewUrlParser: true }
                )
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

        it('POST /api/user/signup should return 200 OK', async () => {
                const testEmail = `${Math.floor(1000 + Math.random() * 9000)}@hotmail.com`;
                // eslint-disable-next-line no-console
                console.log(testEmail);
                const response = await request(app)
                        .post('/api/user/signup')
                        .send({ email: testEmail, password: 'Fuckthis22!!!' });
                expect(response.statusCode).toBe(200);
        });

        it('POST /api/user/login should return 200 OK', async () => {
                const response = await request(app)
                        .post('/api/user/login')
                        .send({ email: 'tba@hotmail.com', password: 'Fuckthis22!!!' });
                expect(response.statusCode).toBe(200);
        });
});
