import { DataNotFound } from "../common/errors/NotFound";
import { BlogCreate } from "../dto/blog/create";
import { QueryDTO } from "../dto/common/query";
import { Blogs } from "../models/Blogs";
import { User } from "../models/User";
import { throw_error } from "../utils/throwError";

export class BlogService {
    async all(query: QueryDTO) {
        try {
            const blogs = await Blogs.findAll({
                limit: query.limit!,
                offset: (query.page! - 1) * query.limit!,
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: User,
                        attributes: {
                            exclude: ['password', 'deletedAt']
                        }
                    }
                ]
            })
            const totalData = await Blogs.count()

            const meta = {
                limit: query.limit!,
                page: query.page,
                totalPage: Math.ceil(totalData / query.limit!),
                total: totalData,
            }
            return {
                rows: blogs,
                meta
            }
        } catch (error) {
            throw_error(error)
        }
    }

    async detail(id: string) {
        try {
            const blog = await Blogs.findOne({
                where: {
                    id
                },
                include: [
                    {
                        model: User,
                        attributes: {
                            exclude: ['password', 'deletedAt']
                        }
                    }
                ]
            })
            if (!blog) throw new DataNotFound()
            return blog
        } catch (error) {
            throw error
        }
    }

    async create(payload: BlogCreate, user: User) {
        try {
            const blog = await Blogs.create({
                title: payload.title,
                backgroundImage: payload.backgroundImage,
                content: payload.content,
                userId: user.id
            })
            return blog
        } catch (error) {
            throw error
        }
    }

    async update(id: string, payload: BlogCreate) {
        try {
            const blog = await this.detail(id)
            blog.title = payload.title
            blog.content = payload.content
            blog.backgroundImage = payload.backgroundImage
            await blog.save()
            return blog
        } catch (error) {
            throw error
        }
    }

    async delete(id: string) {
        try {
            const blog = await this.detail(id)
            await blog.destroy()
            return {}
        } catch (error) {
            throw error
        }
    }

}