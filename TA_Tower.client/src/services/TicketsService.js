import { AppState } from "../AppState"
import { api } from "./AxiosService"
import { logger } from "../utils/Logger.js"

class TicketsService {

    async getAccountTickets() {
        const res = await api.get('account/tickets')
        logger.log(res.data, 'attending tickets')
        AppState.myTickets = res.data
    }

    async getEventTickets(eventId) {
        const res = await api.get(`api/events/${eventId}/tickets`)
        logger.log('all tickets', res.data)
        AppState.eventTickets = res.data
    }

    async createTicket(newTicket) {
        const res = await api.post('api/tickets', newTicket)
        logger.log('new ticket', res.data)
        AppState.eventTickets.unshift(res.data)
        AppState.myTickets.unshift(res.data)
        AppState.activeEvent.capacity--
    }

    async cancelTicket(ticketId) {
        const res = await api.delete(`api/tickets/${ticketId}`)
        AppState.myTickets = AppState.myTickets.filter(t => t.id != ticketId)
    }

}

export const ticketsService = new TicketsService()