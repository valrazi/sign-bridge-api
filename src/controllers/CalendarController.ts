import { Request, Response } from "express";
import { CalendarService } from "../services/CalendarService";
import { success } from "../utils/responseSend";
import { return_error } from "../utils/throwError";
import { CreateCalendar } from "../dto/calendars/CreateCalendar";

const calendarService = new CalendarService()
export class CalendarController {
    async findAll(req: Request, res: Response) {
        try {
            const data = await calendarService.all()
            success(res, data)
        } catch (error) {
            return_error(error, res)
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const {id} = req.params
            const data = await calendarService.detail(id)
            success(res, data)
        } catch (error) {
            return_error(error, res)
        }
    }

    async create(req: Request, res: Response) {
        try {
            const user = req.user!
            const payload: CreateCalendar = req.body
            const data = await calendarService.create(payload, user)
            success(res, data)
        } catch (error) {
            return_error(error, res)
        }
    }

    async update(req: Request, res: Response) {
        try {
            const {id} = req.params
            const payload: CreateCalendar = req.body
            const data = await calendarService.update(payload, id)
            success(res, data)
        } catch (error) {
            return_error(error, res)
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const {id} = req.params
            const data = await calendarService.delete(id)
            success(res, data)
        } catch (error) {
            return_error(error, res)
        }
    }
}
