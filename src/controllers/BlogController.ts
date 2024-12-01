import { Request, Response } from "express";
import { QueryDTO } from "../dto/common/query";
import { BlogService } from "../services/BlogService";
import { success } from "../utils/responseSend";
import { return_error } from "../utils/throwError";
import { BlogCreate } from "../dto/blog/create";

const blogService = new BlogService()
export class BlogController {
    async findAll(req: Request, res: Response) {
        try {
            const query: QueryDTO = req.query
            const sanitizedQuery: QueryDTO = {
                limit: query.limit ? Number(query.limit) : 3,
                page: query.page ? Number(query.page) : 1
            }
            const data = await blogService.all(sanitizedQuery)
            success(res, data)
        } catch (error) {
            return_error(error, res)
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const {id} = req.params
            const data = await blogService.detail(id)
            success(res, data)
        } catch (error) {
            return_error(error, res)
        }
    }

    async create(req: Request, res: Response) {
        try {
            const user = req.user!
            const payload: BlogCreate = req.body
            const data = await blogService.create(payload, user)
            success(res, data)
        } catch (error) {
            return_error(error, res)
        }
    }

    async update(req: Request, res: Response) {
        try {
            const {id} = req.params
            const payload: BlogCreate = req.body
            const data = await blogService.update(id, payload)
            success(res, data)
        } catch (error) {
            return_error(error, res)
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const {id} = req.params
            const data = await blogService.delete(id)
            success(res, data)
        } catch (error) {
            return_error(error, res)
        }
    }
}