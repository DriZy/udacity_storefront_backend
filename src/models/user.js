"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
// @ts-ignore
const bcrypt_1 = __importDefault(require("bcrypt"));
// @ts-ignore
const database_1 = __importDefault(require("../database"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class UserStore {
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
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
            const sql = 'SELECT * FROM users WHERE id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not get user ${id}. Error: ${err}`);
        }
    }
    async create(u) {
        try {
            const saltRounds = process.env.SALT_ROUNDS ?? '10';
            const pepper = process.env.BCRYPT_PASSWORD;
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO users (username, password_digest) VALUES($1, $2) RETURNING *';
            const hash = bcrypt_1.default.hashSync(u.password + pepper, parseInt(saltRounds));
            const result = await conn.query(sql, [u.username, hash]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`unable create user (${u.username}): ${err}`);
        }
    }
    async authenticate(username, password) {
        const pepper = process.env.BCRYPT_PASSWORD;
        // @ts-ignore
        const conn = await database_1.default.connect();
        const sql = 'SELECT password FROM users WHERE username=($1)';
        const result = await conn.query(sql, [username]);
        console.log(password + pepper);
        if (result.rows.length) {
            const user = result.rows[0];
            console.log(user);
            if (bcrypt_1.default.compareSync(password + pepper, user.password)) {
                return user;
            }
        }
        return null;
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM users WHERE id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not delete article ${id}. Error: ${err}`);
        }
    }
}
exports.UserStore = UserStore;
