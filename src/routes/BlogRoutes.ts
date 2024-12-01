import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { BlogController } from "../controllers/BlogController";

const router = Router()
const blogController = new BlogController()

router.get('/', blogController.findAll.bind(blogController))
router.get('/:id', blogController.findOne.bind(blogController))
router.post('/', authMiddleware, blogController.create.bind(blogController))
router.put('/:id', authMiddleware, blogController.update.bind(blogController))
router.delete('/:id', authMiddleware, blogController.delete.bind(blogController))
export default router