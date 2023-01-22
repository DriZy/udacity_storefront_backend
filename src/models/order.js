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
            const orderStatus = order.status ?? 'active';
            const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [orderStatus, order.user_id]);
            const createdOrder = result.rows[0];
            conn.release();
            return createdOrder;
        }
        catch (err) {
            throw new Error(`Could not add order ${order.id}. Error: ${err}`);
        }
    }
    // update an order
    async update(status, orderId) {
        try {
            const sql = 'UPDATE orders SET status=$1 WHERE id=$2 RETURNING *';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [status, orderId]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not update order status. Error: ${err}`);
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
    // select completed order by user id
    async completedOrdersByUser(userId) {
        try {
            const status = 'complete';
            const sql = 'SELECT * FROM orders WHERE user_id = ${userId} AND status = ($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [status]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get completed orders. Error: ${err}`);
        }
    }
    async addProduct(quantity, orderId, productId) {
        try {
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
            //@ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [quantity, orderId, productId]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`);
        }
    }
    async ordersByUser(userId) {
        try {
            const sql = 'SELECT * FROM orders WHERE user_id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get products of ${userId}. Error: ${err}`);
        }
    }
    // Get current order by user id
    async currentOrderByUser(userId) {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE user_id = ${userId} ORDER BY id DESC LIMIT 1';
            const result = await conn.query(sql);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not get current order. Error: ${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
