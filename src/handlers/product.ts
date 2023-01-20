import express, {Request, Response} from "express";
import {Product, ProductStore} from "../models/product";
// @ts-ignore
import jwt from 'jsonwebtoken'

const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
    const products = await store.index()
    res.json(products)
}

const show = async (req: Request, res: Response) => {
    const article = await store.show(req.params.id)
    res.json(article)
}

const create = async (req: Request, res: Response) => {
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
const destroy = async (req: Request, res: Response) => {
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

const productsByCategory = async (req: Request, res: Response) => {
    try {
        const products = await store.productsByCategory(req.params.category)
        res.json(products)
    } catch (error) {
        res.status(400)
        res.json({error})
    }

}


const productRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', create)
    app.delete('/products/:id', destroy)
    app.delete('/products/:category', productsByCategory)
}

export default productRoutes
