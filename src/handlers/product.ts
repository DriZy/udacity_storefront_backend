import express, {Request, Response} from "express";
import {Product, ProductStore} from "../models/product";
// @ts-ignore
import jwt from 'jsonwebtoken'
import {verifyAuthToken} from "../utils/auth";

const store = new ProductStore()

const indexHandler = async (_req: Request, res: Response) => {
    const products = await store.index()
    res.json(products)
}

const showHandler = async (req: Request, res: Response) => {
    const product = await store.show(req.params.id)
    res.json(product)
}

const createHandler = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization
        // @ts-ignore
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.JWT_TOKEN_PAS)
    } catch (err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }

    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        }

        const newProduct = await store.create(product)
        res.json(newProduct)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
const destroyHandler = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization
        // @ts-ignore
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.JWT_TOKEN_PAS)
    } catch (err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }

    try {
        const deleted = await store.delete(req.body.id)
        res.json(deleted)
    } catch (error) {
        res.status(400)
        res.json({error})
    }
}

const productsByCategoryHandler = async (req: Request, res: Response) => {
    try {
        const category: string = String(req.params.category);
        const products = await store.productsByCategory(category)
        res.json(products)
    } catch (error) {
        res.status(400)
        res.json({error})
    }

}


const productRoutes = (app: express.Application) => {
    app.get('/products', indexHandler)
    app.get('/products/:id', showHandler)
    app.post('/products', verifyAuthToken, createHandler)
    app.delete('/products/:id', verifyAuthToken, destroyHandler)
    app.get('/products/category/:category', productsByCategoryHandler)
}

export default productRoutes
