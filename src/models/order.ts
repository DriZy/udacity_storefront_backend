// @ts-ignore
import bcrypt from 'bcrypt';
// @ts-ignore
import Client from '../database'
import dotenv from 'dotenv'
import {Product} from "./product";

dotenv.config()


export type Order = {
    id?: number;
    status?: string;
    user_id: number;
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM orders'

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get order. Error: ${err}`)
        }
    }

    async show(id: string): Promise<Order> {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not get order ${id}. Error: ${err}`)
        }
    }

    async create(order: Order): Promise<Order> {
        try {
            const orderStatus = order.status ?? 'active'
            const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *'
            // @ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(sql, [orderStatus, order.user_id])

            const createdOrder :Order = result.rows[0]

            conn.release()

            return createdOrder
        } catch (err) {
            throw new Error(`Could not add order ${order.id}. Error: ${err}`)
        }
    }

    // update an order
    async update(status: string, orderId: number): Promise<Order> {
        try {
            const sql = 'UPDATE orders SET status=$1 WHERE id=$2 RETURNING *';

            // @ts-ignore
            const conn = await Client.connect()
            const result = await conn.query(sql, [status, orderId]);
            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(
                `Could not update order status. Error: ${err}`
            );
        }
    }

    async delete(id: string): Promise<Order> {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(sql, [id])

            const order = result.rows[0]

            conn.release()

            return order
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`)
        }
    }
    async addOrder(quantity: number, orderId: string, productId: string): Promise<Order> {
        try {
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
            //@ts-ignore
            const conn = await Client.connect()

            const result = await conn
                .query(sql, [quantity, orderId, productId])

            const order = result.rows[0]

            conn.release()

            return order
        } catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
        }
    }


    // select completed order by user id
    async completedOrdersByUser(userId: number): Promise<Order[]> {
        try {
            const status = 'complete'
            const sql = 'SELECT * FROM orders WHERE user_id = ${userId} AND status = ($1)';
            // @ts-ignore
            const conn = await Client.connect();
            const result = await conn.query(sql, [status]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(
                `Could not get completed orders. Error: ${err}`
            );
        }
    }

    async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
        try {
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
            //@ts-ignore
            const conn = await Client.connect()
            const result = await conn.query(sql, [quantity, orderId, productId])
            const order = result.rows[0]
            conn.release()
            return order
        } catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
        }
    }
    async ordersByUser(userId: number):  Promise<Product[]> {
        try {
            const sql = 'SELECT * FROM orders WHERE user_id=($1)'
            // @ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(sql, [userId])

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get products of ${userId}. Error: ${err}`)
        }
    }

    // Get current order by user id
    async currentOrderByUser(userId: number): Promise<Order> {
        try {
            // @ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE user_id = ${userId} ORDER BY id DESC LIMIT 1';
            const result = await conn.query(sql);
            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not get current order. Error: ${err}`);
        }
    }

}