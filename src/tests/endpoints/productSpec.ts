// @ts-ignore
import supertest from 'supertest';
import {ProductStore} from "../../models/product";
import server from "../../server";

const request = supertest(server);
const token: string = process.env.TOKEN_SECRET as string;

describe('Test Product endpoint responses', () => {
    beforeAll(() => {
        spyOn(ProductStore.prototype, 'index').and.returnValue(
            Promise.resolve([
                {
                    id: 1,
                    name: 'iphone',
                    price: 3000,
                    category: 'phone'
                }
            ])
        );
        spyOn(ProductStore.prototype, 'show').and.returnValue(
            Promise.resolve({
                id: 1,
                name: 'iphone',
                price: 3000,
                category: 'phone'
            })
        );
        spyOn(ProductStore.prototype, 'productsByCategory').and.returnValue(
            Promise.resolve([
                {
                    id: 1,
                    name: 'iphone',
                    price: 3000,
                    category: 'phone'
                }
            ])
        );
        spyOn(ProductStore.prototype, 'create').and.returnValue(
            Promise.resolve({
                id: 1,
                name: 'iphone',
                price: 3000,
                category: 'phone'
            })
        );
    });

    it('gets all products api endpoint', async (done) => {
        await (async function () {
            const res = await request
                .get('/products')
                .set('Authorization', 'Bearer ' + token);
            expect(res.status).toBe(200);
            expect(res.body).toEqual([
                {
                    id: 1,
                    name: 'iphone',
                    price: 3000,
                    category: 'phone'
                }
            ]);
            done();
        })()
    });
    it('gets product by id api endpoint', async (done) => {
        await (async function () {
            const res = await request
                .get('/products/1')
                .set('Authorization', 'Bearer ' + token);
            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                id: 1,
                name: 'iphone',
                price: 3000,
                category: 'phone'
            });
            done();
        })()
    });
    it('gets product by category api endpoint', async (done) => {
        await (async function () {
            const res = await request
                .get('/products/category/phone')
                .set('Authorization', 'Bearer ' + token);
            expect(res.status).toBe(200);
            expect(res.body).toEqual([
                {
                    id: 1,
                    name: 'iphone',
                    price: 3000,
                    category: 'phone'
                }
            ]);
            done();
        })()
    });
    it('create product api endpoint', async (done) => {
        await (async function () {
            const res = await request
                .post('/products')
                .set('Authorization', 'Bearer ' + token);
            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                id: 1,
                name: 'iphone',
                price: 3000,
                category: 'phone'
            });
            done();
        })()
    });
});