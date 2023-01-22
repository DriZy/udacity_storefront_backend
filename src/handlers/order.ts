import express, {Request, Response} from "express";
import {Order, OrderStore} from "../models/order";
import {verifyAuthToken} from "../utils/auth";
// @ts-ignore
import jwt from 'jsonwebtoken'

const store = new OrderStore()

const indexHandler = async (_req: Request, res: Response) => {
    try {
        const users = await store.index()
        res.json(users)
    } catch (err) {
        res.status(400);
        res.json(err)
    }

}

const showHandler = async (req: Request, res: Response) => {
    try {
        const order = await store.show(req.params.id)
        res.json(order)
    } catch (err) {
        res.status(404);
        res.json(err)
    }
}

// create order

const createHandler = async (req: Request, res: Response) => {
    try {
        const newOrder: Order = await store.create(req.body);
        return res.json(newOrder);
    } catch (err) {
        res.status(401);
        res.json(err)
    }

}

const updateHandler = async (req: Request, res: Response) => {
    try {
        const status = req.query.status as string;
        const orderId = parseInt(req.query.orderId as string);

        if (orderId && ['active', 'complete'].includes(status)) {
            const updatedOrder: Order = await store.update(
                status,
                orderId
            );
            return res.json(updatedOrder);
        } else {
            return res.status(400).json({Error: 'Bad parameters'});
        }
    } catch (err) {
        res.status(400);
        res.json(err)
    }

}

const destroyHandler = async (req: Request, res: Response) => {
    try {
        const deleted = await store.delete(req.body.id)
        res.json(deleted)
    } catch (error) {
        res.status(400)
        res.json({error})
    }
}
const addProductHandler = async (req: Request, res: Response) => {

    try {
        const orderId: string = req.params.id
        const productId: string = req.body.prdId
        const quantity: number = parseInt(req.body.qnty)
        const addedProduct = await store.addProduct(quantity, orderId, productId)
        res.json(addedProduct)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const ordersByUserHandler = async (req: Request, res: Response) => {
    try {
        const orders = await store.ordersByUser(parseInt(req.params.user_id))
        res.json(orders)
    } catch (error) {
        res.status(400)
        res.json({error})
    }

}

const orderByStatusHandler = async (req: Request, res: Response) => {
    try {
        const userId: number = parseInt(req.params.user_id);
        const status: string = req.params.status;
        const currentOrder: Order[] = await store.completedOrdersByUser(userId);
        return res.json(currentOrder);
    } catch (err) {
        res.status(401)
        res.json(err)
    }

}
const currentOrderByStatusHandler = async (req: Request, res: Response) => {
    try {
        const userId: number = parseInt(req.params.user_id);
        const currentOrder: Order = await store.currentOrderByUser(
            userId
        );
        return res.json(currentOrder);
    } catch (err) {
        res.status(401)
        res.json(err)
    }

}

const orderRoutes = (app: express.Application) => {
    app.get('/orders', verifyAuthToken, indexHandler)
    app.get('/orders/:id', verifyAuthToken, showHandler)
    app.put('/orders', verifyAuthToken, updateHandler)
    app.post('/orders/:id/products', addProductHandler)
    app.post('/orders', verifyAuthToken, createHandler)
    app.delete('/orders/:id', verifyAuthToken, destroyHandler)
    app.get('/orders/user/:user_id/', verifyAuthToken, ordersByUserHandler)
    app.get('/orders/completed/:user_id', verifyAuthToken, orderByStatusHandler)
    app.get('/orders/current/:user_id', verifyAuthToken, currentOrderByStatusHandler)
}

// ... other methods
export default orderRoutes
