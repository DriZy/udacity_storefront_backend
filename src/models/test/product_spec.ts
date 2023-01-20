import { Product, ProductStore } from '../product';

const store = new ProductStore()

describe("Product Model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a update method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(store.index).toBeDefined();
    });

    it('create method should add a product', async () => {
        const result = await store.create({
            name: 'Bridge to Terabithia',
            price: 250,
            category: 'Childrens'
        });
        expect(result).toEqual({
            id: 1,
            name: 'Bridge to Terabithia',
            price: 250,
            category: 'Adults',
        });
    });

    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result).toEqual([{
            id: 1,
            name: 'Bridge to Terabithia',
            price: 250,
            category: 'Childrens'
        }]);
    });

    it('show method should return the correct products', async () => {
        const result = await store.show("1");
        expect(result).toEqual({
            id: 1,
            name: 'Bridge to Terabithia',
            price: 250,
            category: 'Childrens'
        });
    });

    it('delete method should remove the product', async () => {
        store.delete("1");
        const result = await store.index()

        expect(result).toEqual([]);
    });
});
