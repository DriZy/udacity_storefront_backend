"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const supertest_1 = __importDefault(require("supertest"));
const user_1 = require("../../models/user");
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
const token = process.env.JWT_TOKEN_PAS;
describe('Test endpoint responses', () => {
    beforeAll(() => {
        spyOn(user_1.UserStore.prototype, 'index').and.returnValue(Promise.resolve([
            {
                id: 1,
                firstname: 'Dris',
                lastname: 'Drizy',
                password: 'thisisidris'
            }
        ]));
        spyOn(user_1.UserStore.prototype, 'show').and.returnValue(Promise.resolve({
            id: 1,
            firstname: 'Tabi',
            lastname: 'Idris',
            password: 'thisisidris'
        }));
        spyOn(user_1.UserStore.prototype, 'create').and.returnValue(Promise.resolve({
            id: 1,
            firstname: 'Tabi',
            lastname: 'Idris',
            password: 'eyJhbGciOiJIqzI1NiIsInRfcCI6IkpXVCJ9.330.J8BgsyqA3Y6F71NXbfuYyfRVuvRa_qb08RStxrCVhlQ'
        }));
        spyOn(user_1.UserStore.prototype, 'delete').and.returnValue(Promise.resolve({
            id: 1,
            firstname: 'eyong',
            lastname: 'kevin',
            password: 'thisisenow'
        }));
    });
    it('gets all users api endpoint', async (done) => {
        const res = await request
            .get('/users')
            .set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
        expect(res.body).toEqual([
            {
                id: 1,
                firstname: 'eyong',
                lastname: 'kevin',
                password: 'thisisenow'
            }
        ]);
        done();
    });
    it('gets user by id api endpoint', async (done) => {
        const res = await request
            .get('/users/1')
            .set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            id: 1,
            firstname: 'eyong',
            lastname: 'kevin',
            password: 'thisisenow'
        });
        done();
    });
    it('create user api endpoint', async (done) => {
        const res = await request
            .post('/users');
        expect(res.status).toBe(200);
        expect(res.body.auth).toEqual(true);
        expect(res.body.token).toBeDefined();
        done();
    });
    it('deletes a user api endpoint', async (done) => {
        const res = await request
            .delete('/users/1')
            .set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            id: 1,
            firstname: 'eyong',
            lastname: 'kevin',
            password: 'thisisenow'
        });
        done();
    });
});
