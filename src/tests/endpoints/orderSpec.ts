// @ts-ignore
import supertest from 'supertest';
import server from "../../server";
import {OrderStore} from "../../models/order";

const request = supertest(server);
const token: string = process.env.TOKEN_SECRET as string;

/**
 * Unit tests suit for image resizing endpoint
 * */

describe('Test OrderStore endpoint responses', () => {
    beforeAll(() => {
        spyOn(OrderStore.prototype, 'create').and.returnValue(
            Promise.resolve({
                id: 1,
                user_id: 2,
                status: 'active'
            })
        );
        spyOn(OrderStore.prototype, 'index').and.returnValue(
            Promise.resolve([
                {
                    id: 1,
                    user_id: 2,
                    status: 'active'
                }
            ])
        );
        spyOn(OrderStore.prototype, 'currentOrderByUser').and.returnValue(
            Promise.resolve({
                id: 1,
                user_id: 2,
                status: 'active'
            })
        );

        spyOn(OrderStore.prototype, 'completedOrdersByUser').and.returnValue(
            Promise.resolve([])
        );
        spyOn(OrderStore.prototype, 'update').and.returnValue(
            Promise.resolve({
                id: 1,
                user_id: 2,
                status: 'complete'
            })
        );

    });
    it('create order api endpoint', async (done) => {
        await (async function () {
            const res = await request
                .post('/orders')
                .set('Authorization', 'Bearer ' + token);

            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                id: 1,
                user_id: 2,
                status: 'active'
            });
            done();
        })()
    });
    it('create order api endpoint', async (done) => {
        await (async function () {
            const res = await request
                .post('/orders')
                .set('Authorization', 'Bearer ' + token);
            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                id: 1,
                user_id: 2,
                status: 'complete'
            });
            done();
        })()
    });
    it('gets all orders api endpoint', async (done) => {
        await (async function () {
            const res = await request
                .get('/orders/user/2')
                .set('Authorization', 'Bearer ' + token);
            expect(res.status).toBe(200);
            expect(res.body).toEqual([
                {
                    id: 1,
                    user_id: 2,
                    status: 'active'
                },
                {
                    id: 2,
                    user_id: 2,
                    status: 'complete'
                }
            ]);
            done();
        })()
    });
    it('gets current user order by id api endpoint', async (done) => {
        await (async function () {
            const res = await request
                .get('/orders/current/2')
                .set('Authorization', 'Bearer ' + token);
            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                id: 1,
                user_id: 2,
                status: 'active'
            });
            done();
        })()
    });
    it('gets completed user order api endpoint', async (done) => {
        await (async function () {
            const res = await request
                .get('/orders/completed/2')
                .set('Authorization', 'Bearer ' + token);
            expect(res.status).toBe(200);
            expect(res.body).toEqual([
                {
                    id: 1,
                    user_id: 2,
                    status: 'complete'
                }
            ]);
            done();
        })()
    });
    it('updates user order api endpoint', async (done) => {
        await (async function () {
            const res = await request
                .put('/orders?status=active&orderId=1')
                .set('Authorization', 'Bearer ' + token);
            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                id: 1,
                user_id: 2,
                status: 'complete'
            });
            done();
        })()
    });
    it('updates user order with wrong parameters api endpoint', async (done) => {
        await (async function () {
            const res = await request
                .put('/orders?status=acti&orderId=1')
                .set('Authorization', 'Bearer ' + token);
            expect(res.status).toBe(400);
            expect(res.body.Error).toEqual('Bad parameters');
            done();
        })()
    });
    it('Add product to order api endpoint', async (done) => {
        await (async function () {
            const res = await request
                .put('/orders/:id/products')
                .set('Authorization', 'Bearer ' + token);
            expect(res.status).toBe(400);
            expect(res.body).toEqual({
                id: 1,
                quantity: 1,
                order_id: 1,
                product_id: 1
            });
            done();
        })()
    });
});