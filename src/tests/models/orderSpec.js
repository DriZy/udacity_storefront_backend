"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../models/order");
const store = new order_1.OrderStore();
describe("Order Model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have a view by category method method', () => {
        expect(store.addProduct).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });
    it('create method should add a product', async () => {
        const result = await store.create({
            status: 'pending',
            user_id: 3,
        });
        expect(result).toEqual({
            id: 1,
            status: 'pending',
            user_id: 3,
        });
    });
    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result).toEqual([{
                id: 1,
                status: 'pending',
                user_id: 3
            }]);
    });
    it('show method should return the correct products', async () => {
        const result = await store.show("1");
        expect(result).toEqual({
            id: 1,
            status: 'pending',
            user_id: 3
        });
    });
    it('delete method should remove the product', async () => {
        store.delete("1");
        const result = await store.index();
        expect(result).toEqual([]);
    });
});
