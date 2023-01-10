import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"
import { towerEventsService } from "./TowerEventsService"

class TicketsService {
    async createTicket(newTicket) {
        const event = await towerEventsService.getById(newTicket.eventId)
        if (event.capacity == 0) {
            throw new BadRequest('Event is sold out')
        }
        const ticket = await dbContext.Tickets.create(newTicket)
        await ticket.populate('account', 'name picture')
        await ticket.populate('event')
        event.capacity--
        await event.save()
        return ticket
    }
    async getAccountTickets(accountId) {
        const tickets = await dbContext.Tickets.find({ accountId }).populate('event').populate('account', 'name picture')
        return tickets
    }
    async getEventTickets(eventId) {
        const tickets = await dbContext.Tickets.find({ eventId }).populate('account', 'name picture').populate('event')
        return tickets
    }
    async deleteTicket(ticketId, userId) {
        const ticket = await dbContext.Tickets.findById(ticketId)
        const event = await towerEventsService.getById(ticket.eventId)
        if (ticket.accountId.toString() !== userId) {
            throw new Forbidden('Not authorized to delete')
        }
        await dbContext.Tickets.findByIdAndDelete(ticketId)
        event.capacity++
        await event.save()
    }

}

export const ticketsService = new TicketsService()