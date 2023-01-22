import express, {Request, Response} from "express";
import {User, UserStore} from "../models/user";
import {verifyAuthToken} from "../utils/auth";
// @ts-ignore
import jwt from 'jsonwebtoken'

const store = new UserStore()

const indexHandler = async (req: Request, res: Response) => {
    try {
        const users = await store.index()
        res.json(users)
    } catch (err) {
        res.status(401)
        res.json(err)
    }
}

const showHandler = async (req: Request, res: Response) => {
    try {
        const user = await store.show(req.params.id)
        res.json(user)
    }catch (err) {
        res.status(404)
        res.json(err)
    }

}

const createHandler = async (req: Request, res: Response) => {
    try {
        const newUser = await store.create(req.body)
        const token = jwt.sign({user: newUser}, process.env.JWT_TOKEN_PAS);
        res.json(token)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const destroyHandler = async (req: Request, res: Response) => {
    try {
        const deleted = await store.delete(req.body.id)
        res.json(deleted)
    }catch (err) {
        res.status(401)
        res.json(err)
    }

}

const authenticateHandler = async (req: Request, res: Response) => {
    try {
        const user: User = {
            firstname: req.body.username,
            password: req.body.password,
        }
        const u = await store.authenticate(user.firstname, user.password)
        res.json(u)
    } catch (error) {
        res.status(401)
        res.json({error})
    }
}
const userRoutes = (app: express.Application) => {
    app.post('/users', createHandler)
    app.get('/users', verifyAuthToken, indexHandler)
    app.get('/users/:id', verifyAuthToken, showHandler)
    app.delete('/users/:id', verifyAuthToken, destroyHandler)
    app.post('/users/auth', verifyAuthToken, authenticateHandler)
}

export default userRoutes
