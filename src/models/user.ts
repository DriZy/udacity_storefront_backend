// @ts-ignore
import bcrypt from 'bcrypt';
// @ts-ignore
import Client from '../database'
import dotenv from 'dotenv'

dotenv.config()


export type User = {
    id?: number;
    username: string;
    password: string;
}

export class UserStore {

    async create(u: User): Promise<User> {
        try {
            const pepper = process.env.JWT_TOKEN_PAS
            const saltRounds = process.env.SALT_ROUNDS ?? '10'

            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'INSERT INTO users (username, password) VALUES($1, $2) RETURNING *'

            const hash = bcrypt.hashSync(
                u.password + pepper,
                parseInt(saltRounds)
            );

            const result = await conn.query(sql, [u.username, hash])
            const user = result.rows[0]

            conn.release()

            return user
        } catch(err) {
            throw new Error(`unable create user (${u.username}): ${err}`)
        }
    }    async index(): Promise<User[]> {
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM users'

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`)
        }
    }

    async show(id: string): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not get user ${id}. Error: ${err}`)
        }
    }

    async authenticate(username: string, password: string): Promise<User | null> {
        const pepper = process.env.JWT_TOKEN_PAS

        // @ts-ignore
        const conn = await Client.connect()
        const sql = 'SELECT password FROM users WHERE username=($1)'

        const result = await conn.query(sql, [username])

        console.log(password+pepper)

        if(result.rows.length) {

            const user = result.rows[0]

            console.log(user)

            if (bcrypt.compareSync(password+pepper, user.password)) {
                return user
            }
        }

        return null
    }
    async delete(id: string): Promise<User> {
        try {
            const sql = 'DELETE FROM users WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(sql, [id])

            const user = result.rows[0]

            conn.release()

            return user
        } catch (err) {
            throw new Error(`Could not delete article ${id}. Error: ${err}`)
        }
    }
}