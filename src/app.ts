import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { not_found, success } from "./utils/responseSend";
import { loggingMiddleware } from "./middlewares/loggingMiddleware";
import UserRoutes from './routes/UserRoutes'
import VideoLearningRoutes from './routes/VideoLearningRoute'
import BlogRoutes from './routes/BlogRoutes'
import CalendarRoutes from './routes/CalendarRoutes'
import cors from 'cors'
import bodyParser = require("body-parser");
import media from './utils/media'
import { BadRequest } from "./common/errors/BadRequest";
import moment from 'moment'
import { return_error } from "./utils/throwError";
import { authMiddleware } from "./middlewares/authMiddleware";
dotenv.config();

const app = express();
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit:'50mb', extended: true}))
app.use(express.json());
app.use(cors())

app.use(loggingMiddleware);

app.use('/api/users', UserRoutes)
app.use('/api/video-learning', VideoLearningRoutes)
app.use('/api/blog', BlogRoutes)
app.use('/api/calendar', CalendarRoutes)
app.post('/api/media', authMiddleware, async(req: Request, res: Response) => {
    try {
        const img64: string = req.body.img64
        const matches = img64.match(/^data:(.+);base64,(.+)$/)
        if(!matches) throw new BadRequest()
        const mimeType = matches[1]
        const base64Data = matches[2]
        const buffer = Buffer.from(base64Data, 'base64'); // Convert to buffer

        // Extract file extension from MIME type
        const extension = mimeType.split('/')[1];
        const fileName = `file-${moment().format('DD-MM-YYYY-HH:mm:SS')}.${extension}`

        const response = await media.uploadStream(buffer, fileName, undefined, mimeType)
        success(res, response.publicUrls[0])
    } catch (error) {
        return_error(error, res)
    }
})
app.use((req, res) => {
    not_found(res)
})

export default app;
