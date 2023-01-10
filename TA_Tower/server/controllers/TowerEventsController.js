import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import { ticketsService } from "../services/TicketsService";
import { towerEventsService } from "../services/TowerEventsService";
import BaseController from "../utils/BaseController";

export class TowerEventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAll)
            .get('/:eventId', this.getById)
            .get('/:eventId/comments', this.getEventComments)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
            .put('/:eventId', this.editEvent)
            .delete('/:eventId', this.cancelEvent)
            .get('/:eventId/tickets', this.getEventTickets)
    }


    async getAll(req, res, next) {
        try {
            let events = await towerEventsService.getAll(req.params.query)
            res.send(events)
        } catch (error) {
            next(error)
        }
    }
    async getById(req, res, next) {
        try {
            let event = await towerEventsService.getById(req.params.eventId)
            res.send(event)
        } catch (error) {
            next(error)
        }
    }
    async createEvent(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            let newEvent = await towerEventsService.createEvent(req.body)
            res.send(newEvent)
        } catch (error) {
            next(error)
        }
    }
    async editEvent(req, res, next) {
        try {
            req.body.id = req.params.eventId
            req.body.creatorId = req.userInfo.id
            let updatedEvent = await towerEventsService.editEvent(req.body)
            res.send(updatedEvent)
        } catch (error) {
            next(error)
        }
    }
    async cancelEvent(req, res, next) {
        try {
            await towerEventsService.cancelEvent(req.params.eventId, req.userInfo.id)
            res.send('Event cancelled')
        } catch (error) {
            next(error)
        }
    }
    async getEventTickets(req, res, next) {
        try {
            const tickets = await ticketsService.getEventTickets(req.params.eventId)
            res.send(tickets)
        } catch (error) {
            next(error)
        }
    }
    async getEventComments(req, res, next) {
        try {
            const events = await commentsService.getEventComments(req.params.eventId)
            res.send(events)
        } catch (error) {
            next(error)
        }
    }

}