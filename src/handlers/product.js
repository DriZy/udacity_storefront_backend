"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
// @ts-ignore
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new product_1.ProductStore();
const indexHandler = async (_req, res) => {
    const products = await store.index();
    res.json(products);
};
const showHandler = async (req, res) => {
    const article = await store.show(req.params.id);
    res.json(article);
};
const createHandler = async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        // @ts-ignore
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN_PAS);
    }
    catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    try {
        const product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        };
        const newProduct = await store.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroyHandler = async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        // @ts-ignore
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN_PAS);
    }
    catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    try {
        const deleted = await store.delete(req.body.id);
        res.json(deleted);
    }
    catch (error) {
        res.status(400);
        res.json({ error });
    }
};
const productsByCategoryHandler = async (req, res) => {
    try {
        const category = String(req.params.category);
        const products = await store.productsByCategory(category);
        res.json(products);
    }
    catch (error) {
        res.status(400);
        res.json({ error });
    }
};
const productRoutes = (app) => {
    app.get('/products', indexHandler);
    app.get('/products/:id', showHandler);
    app.post('/products', createHandler);
    app.delete('/products/:id', destroyHandler);
    app.get('/products/category/:category', productsByCategoryHandler);
};
exports.default = productRoutes;
