"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const order_1 = require("../../models/order");
const request = (0, supertest_1.default)(server_1.default);
const token = process.env.JWT_TOKEN_PAS;
/**
 * Unit tests suit for image resizing endpoint
 * */
describe('Test OrderStore endpoint responses', () => {
    beforeAll(() => {
        spyOn(order_1.OrderStore.prototype, 'create').and.returnValue(Promise.resolve({
            id: 2,
            product_id: 10,
            quantity: 4,
            user_id: 2,
            status: 'active'
        }));
        spyOn(order_1.OrderStore.prototype, 'index').and.returnValue(Promise.resolve([
            {
                id: 1,
                product_id: 13,
                quantity: 1,
                user_id: 2,
                status: 'complete'
            },
            {
                id: 2,
                product_id: 10,
                quantity: 4,
                user_id: 2,
                status: 'active'
            }
        ]));
        spyOn(order_1.OrderStore.prototype, 'currentOrderByUser').and.returnValue(Promise.resolve({
            id: 2,
            product_id: 10,
            quantity: 4,
            user_id: 2,
            status: 'active'
        }));
        spyOn(order_1.OrderStore.prototype, 'completedOrdersByUser').and.returnValue(Promise.resolve([
            {
                id: 1,
                product_id: 13,
                quantity: 1,
                user_id: 2,
                status: 'complete'
            }
        ]));
        spyOn(order_1.OrderStore.prototype, 'update').and.returnValue(Promise.resolve({
            id: 1,
            product_id: 13,
            quantity: 1,
            user_id: 2,
            status: 'active'
        }));
        spyOn(order_1.OrderStore.prototype, 'delete').and.returnValue(Promise.resolve({
            id: 1,
            product_id: 13,
            quantity: 1,
            user_id: 2,
            status: 'active'
        }));
    });
    it('create order api endpoint', async (done) => {
        const res = await request
            .post('/orders')
            .set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            id: 2,
            user_id: 2,
            status: 'active'
        });
        done();
    });
    it('gets all orders api endpoint', async (done) => {
        const res = await request
            .get('/orders/user/2')
            .set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
        expect(res.body).toEqual([
            {
                id: 1,
                user_id: 2,
                status: 'complete'
            },
            {
                id: 2,
                user_id: 2,
                status: 'active'
            }
        ]);
        done();
    });
    it('gets current user order by id api endpoint', async (done) => {
        const res = await request
            .get('/orders/current/2')
            .set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            id: 2,
            user_id: 2,
            status: 'active'
        });
        done();
    });
    it('gets completed user order api endpoint', async (done) => {
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
    });
    it('updates user order api endpoint', async (done) => {
        const res = await request
            .put('/orders?status=active&orderId=1')
            .set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            id: 1,
            user_id: 2,
            status: 'active'
        });
        done();
    });
    it('updates user order with wrong parameters api endpoint', async (done) => {
        const res = await request
            .put('/orders?status=acti&orderId=1')
            .set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(400);
        expect(res.body.Error).toEqual('Bad parameters');
        done();
    });
    it('Add product to order api endpoint', async (done) => {
        const res = await request
            .put('/orders/:id/products')
            .set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            id: 1,
            user_id: 2,
            status: 'active'
        });
        done();
    });
    it('deletes a user order api endpoint', async (done) => {
        const res = await request
            .delete('/orders/1')
            .set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            id: 1,
            user_id: 2,
            status: 'active'
        });
        done();
    });
});
