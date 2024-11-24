// express.d.ts
import * as express from 'express';
import {User} from '../src/models/User'
declare global {
  namespace Express {
    interface Request {
      user?: User; // You can replace 'any' with a more specific type if you have a User type defined
    }
  }
}