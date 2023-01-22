// @ts-ignore
import supertest from 'supertest';
import {UserStore} from "../../models/user";
import server from "../../server";

const request = supertest(server);
const token: string = process.env.TOKEN_SECRET as string;

describe('Test endpoint responses', () => {
    beforeAll(() => {
        spyOn(UserStore.prototype, 'index').and.returnValue(
            Promise.resolve([
                {
                    id: 1,
                    firstname: 'Dris',
                    lastname: 'Drizy',
                    password: 'thisisidris'
                }
            ])
        );
        spyOn(UserStore.prototype, 'show').and.returnValue(
            Promise.resolve({
                id: 1,
                firstname: 'Tabi',
                lastname: 'Idris',
                password: 'thisisidris'
            })
        );
        spyOn(UserStore.prototype, 'create').and.returnValue(
            Promise.resolve({
                id: 1,
                firstname: 'Dris',
                lastname: 'Drizy',
                password: 'thisisidris'
            })
        );
    });

    it('gets all users api endpoint', async (done) => {
        await (async function () {
            const res = await request
                .get('/users')
                .set('Authorization', 'Bearer ' + token);
            expect(res.status).toBe(200);
            expect(res.body).toEqual([
                {
                    id: 1,
                    firstname: 'Dris',
                    lastname: 'Drizy',
                    password: 'thisisidris'
                }
            ]);
            done();
        })()
    });
    it('gets user by id api endpoint', async (done) => {
        await (async function () {
            const res = await request
                .get('/users/1')
                .set('Authorization', 'Bearer ' + token);
            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                id: 1,
                firstname: 'Dris',
                lastname: 'Drizy',
                password: 'thisisidris'
            });
            done();
        })()
    });
    it('create user api endpoint', async (done) => {
        await (async function () {
            const res = await request
                .post('/users')
            expect(res.status).toBe(200);
            done();
        })()
    });
});