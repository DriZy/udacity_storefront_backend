"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const supertest_1 = __importDefault(require("supertest"));
const product_1 = require("../../models/product");
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
const token = process.env.JWT_TOKEN_PAS;
describe('Test Product endpoint responses', () => {
    beforeAll(() => {
        spyOn(product_1.ProductStore.prototype, 'index').and.returnValue(Promise.resolve([
            {
                id: 1,
                name: 'iphone',
                price: 3000,
                category: 'phone'
            }
        ]));
        spyOn(product_1.ProductStore.prototype, 'show').and.returnValue(Promise.resolve({
            id: 1,
            name: 'iphone',
            price: 3000,
            category: 'phone'
        }));
        spyOn(product_1.ProductStore.prototype, 'productsByCategory').and.returnValue(Promise.resolve([
            {
                id: 1,
                name: 'iphone',
                price: 3000,
                category: 'phone'
            }
        ]));
        spyOn(product_1.ProductStore.prototype, 'create').and.returnValue(Promise.resolve({
            id: 1,
            name: 'iphone',
            price: 3000,
            category: 'phone'
        }));
        spyOn(product_1.ProductStore.prototype, 'delete').and.returnValue(Promise.resolve({
            id: 1,
            name: 'iphone',
            price: 3000,
            category: 'phone'
        }));
    });
    it('gets all products api endpoint', async (done) => {
        const res = await request
            .get('/products')
            .set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
        expect(res.body).toEqual([
            {
                id: 1,
                name: 'iphone',
                price: '3000',
                category: 'phone'
            }
        ]);
        done();
    });
    it('gets product by id api endpoint', async (done) => {
        const res = await request
            .get('/products/1')
            .set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            id: 1,
            name: 'iphone',
            price: '3000',
            category: 'phone'
        });
        done();
    });
    it('gets product by category api endpoint', async (done) => {
        const res = await request
            .get('/products/category/phone')
            .set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
        expect(res.body).toEqual([
            {
                id: 1,
                name: 'iphone',
                price: '3000',
                category: 'phone'
            }
        ]);
        done();
    });
    it('create product api endpoint', async (done) => {
        const res = await request
            .post('/products')
            .set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            id: 1,
            name: 'iphone',
            price: '3000',
            category: 'phone'
        });
        done();
    });
    it('delets a product api endpoint', async (done) => {
        const res = await request
            .delete('/products/1')
            .set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            id: 1,
            name: 'iphone',
            price: '3000',
            category: 'phone'
        });
        done();
    });
});
