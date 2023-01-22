import { ProductStore } from '../../models/product';

const store = new ProductStore()

describe("Product Model", () => {
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
        expect(store.productsByCategory).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });

    it('create method should add a product', async () => {
        const result = await store.create({
            name: 'Bridge to FSJD',
            price: 250,
            category: 'Course'
        });
        expect(result).toEqual({
            id: 10,
            name: 'Bridge to FSJD',
            price: 250,
            category: 'Course',
        });
    });

    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result).toEqual([{
            id: 1,
            name: 'Bridge to FSJD',
            price: 250,
            category: 'Course'
        }]);
    });

    it('show method should return the correct products', async () => {
        const result = await store.show("10");
        expect(result).toEqual({
            id: 10,
            name: 'Bridge to FSJD',
            price: 250,
            category: 'Course'
        });
    });
    
});
