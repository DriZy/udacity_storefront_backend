import {OrderStore} from "../../models/order";

const store = new OrderStore()

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


    it('create method should add a product', async () => {
        const result = await store.create({
            status: 'pending',
            user_id: 1,
        });
        expect(result).toEqual({
            id:1,
            status: 'pending',
            user_id: 1,
        });
    });

    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result).toEqual([{
            id: 1,
            status: 'pending',
            user_id: 1
        }]);
    });

    it('show method should return the correct products', async () => {
        const result = await store.show("1");
        expect(result).toEqual({
            id: 1,
            status: 'pending',
            user_id: 1
        });
    });

});
