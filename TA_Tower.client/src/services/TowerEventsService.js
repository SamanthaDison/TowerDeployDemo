import { AppState } from "../AppState"
import { api } from "./AxiosService"

class TowerEventsService {

    async getAllEvents() {
        const res = await api.get('api/events')
        console.log(res.data, 'all tower events')
        AppState.towerEvents = res.data
    }

    async getActiveEvent(eventId) {
        const res = await api.get(`api/events/${eventId}`)
        console.log('active event', res.data)
        AppState.activeEvent = res.data
    }

    async createEvent(newEvent) {
        const res = await api.post('api/events', newEvent)
        console.log('new event', res.data)
        AppState.towerEvents.push(res.data)
        return res.data
    }

    async editEvent(editedEvent) {
        const res = await api.put(`api/events/${editedEvent.id}`, editedEvent)
        console.log('edited event', res.data)
        AppState.activeEvent = res.data
    }
    async cancelEvent(eventId) {
        const res = await api.delete(`api/events/${eventId}`)
        AppState.activeEvent.isCanceled = true
    }
}

export const towerEventsService = new TowerEventsService()