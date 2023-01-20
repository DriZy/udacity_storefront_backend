"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class OrderStore {
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get articles. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not get article ${id}. Error: ${err}`);
        }
    }
    async create(order) {
        try {
            const sql = 'INSERT INTO orders (name, price) VALUES($1, $2) RETURNING *';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [order.status, order.user_id]);
            const createdOrder = result.rows[0];
            conn.release();
            return createdOrder;
        }
        catch (err) {
            throw new Error(`Could not add order ${order.id}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const article = result.rows[0];
            conn.release();
            return article;
        }
        catch (err) {
            throw new Error(`Could not delete article ${id}. Error: ${err}`);
        }
    }
    async addOrder(quantity, orderId, productId) {
        try {
            const sql = 'INSERT INTO order_orders (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
            //@ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn
                .query(sql, [quantity, orderId, productId]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`);
        }
    }
    async addProduct(quantity, orderId, productId) {
        // get order to see if it is open
        try {
            const ordersql = 'SELECT * FROM orders WHERE id=($1)';
            //@ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(ordersql, [orderId]);
            const order = result.rows[0];
            if (order.status !== "open") {
                throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`);
            }
            conn.release();
        }
        catch (err) {
            throw new Error(`${err}`);
        }
        try {
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
            //@ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn
                .query(sql, [quantity, orderId, productId]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
