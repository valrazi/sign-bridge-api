import dotenv from "dotenv";
dotenv.config()
import jwt from 'jwt-simple'
const secret = process.env.JWT_SECRET

interface PayloadJWT {
    id:string;
    email:string;
    encAt: Date;
}

export function encyrptToken(payload: PayloadJWT) {
    return jwt.encode(payload, secret!)
}

export function decryptToken(token: string) : PayloadJWT {
    return jwt.decode(token, secret!)
}