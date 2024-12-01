import { Request, Response } from "express";
import { VideoLearningService } from "../services/VideoLearning";
import { return_error } from "../utils/throwError";
import { VideoLearningQueryDTO } from "../dto/VideoLearning/queryAll";
import { success } from "../utils/responseSend";

const videoLearningService = new VideoLearningService()
export class VideoLearningController {
    async findAll(req: Request, res: Response){
        try {
            const query: VideoLearningQueryDTO = req.query
            const sanitizedQuery: VideoLearningQueryDTO = {
                limit: query.limit ? Number(query.limit): 9,
                page: query.page ? Number(query.page) : 1,
                categoriesId: query.categoriesId ? Number(query.categoriesId) : undefined,
                subcategoriesId: query.subcategoriesId ? Number(query.subcategoriesId) : undefined
            }
            console.log({sanitizedQuery})
            const data = await videoLearningService.all(sanitizedQuery)
            success(res, data)
        } catch (error) {
            return_error(error, res)
        }
    }
}