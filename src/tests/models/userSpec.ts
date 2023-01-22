import {UserStore} from "../../models/user";

const store = new UserStore()

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
        expect(store.authenticate).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });

    it('create method should add a product', async () => {
        const result = await store.create({
            firstname: "Test user", lastname: "last name", password: "testPassword",
        });
        expect(result).toEqual({
            id: 1,
            firstname: "Test user", lastname: "last name", password: "testPassword",
        });
    });

    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result).toEqual([{
            id: 1,
            firstname: "Test user", lastname: "last name", password: "testPassword",
        }]);
    });

    it('show method should return the correct products', async () => {
        const result = await store.show("1");
        expect(result).toEqual({
            id: 1,
            firstname: "Test user", lastname: "last name", password: "testPassword",
        });
    });

    it('delete method should remove the product', async () => {
        store.delete("1");
        const result = await store.index()

        expect(result).toEqual([]);
    });
});
