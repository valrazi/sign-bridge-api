import moment from "moment";
import { CreateCalendar } from "../dto/calendars/CreateCalendar";
import { Calendars } from "../models/Calendars";
import { User } from "../models/User";
import { DataNotFound } from "../common/errors/NotFound";

export class CalendarService {
    async all() {
        try {
            const calendars = await Calendars.findAll({
                order: [['eventDate', 'ASC']],
                include: [
                    {
                        model: User,
                        attributes: {
                            exclude: ['password', 'deletedAt']
                        }
                    }
                ]
            })
            return calendars
        } catch (error) {
            throw error
        }
    }

    async detail(id:string) {
        try {
            const calendar = await Calendars.findOne({
                where: {
                    id
                }
            })
            if(!calendar) throw new DataNotFound()
            return calendar
        } catch (error) {
            throw error
        }
    } 
    async create(payload: CreateCalendar, user: User) {
        try {
            const calendar = await Calendars.create({
                title: payload.title,
                color: payload.color,
                eventDate: moment(payload.eventDate).toDate(),
                userId: user.id,
                description: payload.description
            })
            return calendar
        } catch (error) {
            throw error
        }
    }

    async update(payload: CreateCalendar, id: string) {
        try {
            const calendar = await Calendars.findOne({
                where: {
                    id
                }
            })
            if (!calendar) throw new DataNotFound()
            calendar.title = payload.title
            calendar.color = payload.color
            calendar.eventDate = moment(payload.eventDate).toDate()
            calendar.description = payload.description
            await calendar.save()
            return calendar
        } catch (error) {
            throw error
        }
    }

    async delete(id: string) {
        try {
            const calendar = await Calendars.findOne({
                where: {
                    id
                }
            })
            if (!calendar) throw new DataNotFound()
            await calendar.destroy()
            return {}
        } catch (error) {
            throw error
        }
    }
}