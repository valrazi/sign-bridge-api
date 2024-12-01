import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { VideoLearningController } from "../controllers/VideoLearningController";

const router = Router()
const videoLearningController = new VideoLearningController()

router.get('/', authMiddleware, videoLearningController.findAll.bind(videoLearningController))

export default router