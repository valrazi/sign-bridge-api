import express from "express";
import dotenv from "dotenv";
import { not_found } from "./utils/responseSend";
import { loggingMiddleware } from "./middlewares/loggingMiddleware";
import UserRoutes from './routes/UserRoutes'
dotenv.config();

const app = express();
app.use(express.json());
app.use(loggingMiddleware);

app.use('/api/users', UserRoutes)

app.use((req, res) => {
    not_found(res)
})

export default app;
