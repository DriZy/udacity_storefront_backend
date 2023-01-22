import {Request, Response} from "express";
// @ts-ignore
import jwt from 'jsonwebtoken'


const verifyAuthToken = async (req: Request, res: Response, next: () => void)  => {
    try {
        const authorizationHeader = req.headers.authorization
        // @ts-ignore
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_PAS)
        res.locals.userData = decoded;
        next()
    } catch (error) {
        res.status(401)
    }
}

export {
    verifyAuthToken
}