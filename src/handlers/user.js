"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const auth_1 = require("../utils/auth");
// @ts-ignore
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new user_1.UserStore();
const indexHandler = async (req, res) => {
    try {
        const users = await store.index();
        res.json(users);
    }
    catch (err) {
        res.status(401);
        res.json(err);
    }
};
const showHandler = async (req, res) => {
    try {
        const user = await store.show(req.params.id);
        res.json(user);
    }
    catch (err) {
        res.status(404);
        res.json(err);
    }
};
const createHandler = async (req, res) => {
    try {
        const newUser = await store.create(req.body);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.JWT_TOKEN_PAS);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroyHandler = async (req, res) => {
    try {
        const deleted = await store.delete(req.body.id);
        res.json(deleted);
    }
    catch (err) {
        res.status(401);
        res.json(err);
    }
};
const authenticateHandler = async (req, res) => {
    try {
        const user = {
            firstname: req.body.username,
            password: req.body.password,
        };
        const u = await store.authenticate(user.firstname, user.password);
        res.json(u);
    }
    catch (error) {
        res.status(401);
        res.json({ error });
    }
};
const userRoutes = (app) => {
    app.post('/users', createHandler);
    app.get('/users', auth_1.verifyAuthToken, indexHandler);
    app.get('/users/:id', auth_1.verifyAuthToken, showHandler);
    app.delete('/users/:id', auth_1.verifyAuthToken, destroyHandler);
    app.post('/users/auth', auth_1.verifyAuthToken, authenticateHandler);
};
exports.default = userRoutes;
