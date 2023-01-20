"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
// @ts-ignore
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new user_1.UserStore();
const index = async (_req, res) => {
    const users = await store.index();
    res.json(users);
};
const show = async (req, res) => {
    const user = await store.show(req.params.id);
    res.json(user);
};
const create = async (req, res) => {
    try {
        const user = {
            username: req.body.username,
            password: req.body.password,
        };
        const newUser = await store.create(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.JWT_TOKEN_PAS);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    const deleted = await store.delete(req.body.id);
    res.json(deleted);
};
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        // @ts-ignore
        const token = authorizationHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN_PAS);
        next();
    }
    catch (error) {
        res.status(401);
    }
};
const update = async (req, res) => {
    const user = {
        id: parseInt(req.params.id),
        username: req.body.username,
        password: req.body.password,
    };
    try {
        const authorizationHeader = req.headers.authorization;
        // @ts-ignore
        const token = authorizationHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        if (decoded.id !== user.id) {
            throw new Error('User id does not match!');
        }
    }
    catch (err) {
        res.status(401);
        res.json(err);
        return;
    }
    try {
        const updated = await store.create(user);
        res.json(updated);
    }
    catch (err) {
        res.status(400);
        // @ts-ignore
        res.json(err + user);
    }
};
const authenticate = async (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
    };
    try {
        const u = await store.authenticate(user.username, user.password);
        var token = jsonwebtoken_1.default.sign({ user: u }, process.env.JWT_TOKEN_PAS);
        res.json(token);
    }
    catch (error) {
        res.status(401);
        res.json({ error });
    }
};
const userRoutes = (app) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', verifyAuthToken, create);
    app.delete('/users/:id', verifyAuthToken, destroy);
};
exports.default = userRoutes;
