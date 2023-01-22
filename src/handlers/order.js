"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const auth_1 = require("../utils/auth");
const store = new order_1.OrderStore();
const indexHandler = async (_req, res) => {
    try {
        const articles = await store.index();
        res.json(articles);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const showHandler = async (req, res) => {
    try {
        const article = await store.show(req.params.id);
        res.json(article);
    }
    catch (err) {
        res.status(404);
        res.json(err);
    }
};
// create order
const createHandler = async (req, res) => {
    try {
        const newOrder = await store.create(req.body);
        return res.json(newOrder);
    }
    catch (err) {
        res.status(401);
        res.json(err);
    }
};
const updateHandler = async (req, res) => {
    try {
        const status = req.query.status;
        const orderId = parseInt(req.query.orderId);
        if (orderId && ['active', 'complete'].includes(status)) {
            const updatedOrder = await store.update(status, orderId);
            return res.json(updatedOrder);
        }
        else {
            return res.status(400).json({ Error: 'Bad parameters' });
        }
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
    catch (error) {
        res.status(400);
        res.json({ error });
    }
};
const addProductHandler = async (req, res) => {
    try {
        const orderId = req.params.id;
        const productId = req.body.prdId;
        const quantity = parseInt(req.body.qnty);
        const addedProduct = await store.addProduct(quantity, orderId, productId);
        res.json(addedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const ordersByUserHandler = async (req, res) => {
    try {
        const orders = await store.ordersByUser(parseInt(req.params.user_id));
        res.json(orders);
    }
    catch (error) {
        res.status(400);
        res.json({ error });
    }
};
const orderByStatusHandler = async (req, res) => {
    try {
        const userId = parseInt(req.params.user_id);
        const status = req.params.status;
        const currentOrder = await store.completedOrdersByUser(userId);
        return res.json(currentOrder);
    }
    catch (err) {
        res.status(401);
        res.json(err);
    }
};
const currentOrderByStatusHandler = async (req, res) => {
    try {
        const userId = parseInt(req.params.user_id);
        const currentOrder = await store.currentOrderByUser(userId);
        return res.json(currentOrder);
    }
    catch (err) {
        res.status(401);
        res.json(err);
    }
};
const orderRoutes = (app) => {
    app.get('/orders', auth_1.verifyAuthToken, indexHandler);
    app.get('/orders/:id', auth_1.verifyAuthToken, showHandler);
    app.put('/orders', auth_1.verifyAuthToken, updateHandler);
    app.post('/orders/:id/products', addProductHandler);
    app.post('/orders', auth_1.verifyAuthToken, createHandler);
    app.delete('/orders/:id', auth_1.verifyAuthToken, destroyHandler);
    app.get('/orders/user/:user_id/', auth_1.verifyAuthToken, ordersByUserHandler);
    app.get('/orders/completed/:user_id', auth_1.verifyAuthToken, orderByStatusHandler);
    app.get('/orders/current/:user_id', auth_1.verifyAuthToken, currentOrderByStatusHandler);
};
// ... other methods
exports.default = orderRoutes;
