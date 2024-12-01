import { Router } from "express";
import { CalendarController } from "../controllers/CalendarController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router()
const calendarController = new CalendarController()

router.get('/', calendarController.findAll.bind(calendarController))
router.get('/:id', calendarController.findOne.bind(calendarController))
router.post('/', authMiddleware, calendarController.create.bind(calendarController))
router.put('/:id', authMiddleware, calendarController.update.bind(calendarController))
router.delete('/:id', authMiddleware, calendarController.delete.bind(calendarController))

export default router