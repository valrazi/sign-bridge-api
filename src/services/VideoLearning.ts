import { Sequelize } from "sequelize";
import { QueryDTO } from "../dto/common/query";
import { VideoLearningQueryDTO } from "../dto/VideoLearning/queryAll";
import { VideoLearning } from "../models/VideoLearning";
import { throw_error } from "../utils/throwError";

export class VideoLearningService {
    async all(query: VideoLearningQueryDTO) {
        try {
            const where: { categoriesId?: number; subcategoriesId?: number } = {}
            if (query.categoriesId) {
                where.categoriesId = query.categoriesId
            }
            if (query.subcategoriesId) {
                where.subcategoriesId = query.subcategoriesId
            }
            const videos = await VideoLearning.findAll({
                limit: query.limit!,
                offset: (query.page! - 1) * query.limit!,
                order: [
                    [Sequelize.fn('NULLIF', Sequelize.cast(Sequelize.col('name'), 'integer'), null), 'DESC'],
                    ['name', 'ASC'] // Fallback to alphabetical order for non-numeric names
                ],
                where
            })
            if (query.categoriesId && query.categoriesId == 2) {

            }
            const totalData = await VideoLearning.count({
                where
            })
            const meta = {
                limit: query.limit!,
                page: query.page,
                totalPage: Math.ceil(totalData / query.limit!),
                total: totalData,
            }
            return {
                rows: videos,
                meta
            }
        } catch (error) {
            throw_error(error)
        }
    }
}