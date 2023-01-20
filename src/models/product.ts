// @ts-ignore
import bcrypt from 'bcrypt';
// @ts-ignore
import Client from '../database'
import dotenv from 'dotenv'

dotenv.config()


export type Product = {
    id?: number;
    name?: string;
    price: number;
    category: string,
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM products'

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get products. Error: ${err}`)
        }
    }

    async show(id: string): Promise<Product> {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not get product ${id}. Error: ${err}`)
        }
    }

    async create(product: Product): Promise<Product> {
        try {
            const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *'
            // @ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(sql, [product.name, product.price])

            const createdProduct :Product = result.rows[0]

            conn.release()

            return createdProduct
        } catch (err) {
            throw new Error(`Could not add product ${product.name}. Error: ${err}`)
        }
    }

    async delete(id: string): Promise<Product> {
        try {
            const sql = 'DELETE FROM products WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(sql, [id])

            const article = result.rows[0]

            conn.release()

            return article
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`)
        }
    }

    async productsByCategory(cat: string):  Promise<Product[]> {
        try {
            const sql = 'SELECT * FROM products WHERE category=($1)'
            // @ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(sql, [cat])

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get products of ${cat}. Error: ${err}`)
        }
    }
}