import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class TowerEventsService {
    async getAll(query = {}) {
        let events = await dbContext.TowerEvents.find(query).populate('creator', 'name picture')
        return events
    }

    async getById(eventId) {
        let event = await dbContext.TowerEvents.findById(eventId).populate('creator', 'name picture')
        if (!event) {
            throw new BadRequest('Unable to find id')
        }
        return event
    }
    async createEvent(body) {
        let newEvent = await dbContext.TowerEvents.create(body)
        return newEvent
    }

    async editEvent(updates) {
        const original = await this.getById(updates.id)
        if (original.creatorId.toString() !== updates.creatorId || original.isCanceled == true) {
            throw new BadRequest('Unable to edit this event')
        }
        original.name = updates.name || original.name
        original.description = updates.description || original.description
        await original.save()
        return original
    }

    async cancelEvent(eventId, userId) {
        const cancelledEvent = await this.getById(eventId)
        if (cancelledEvent.creatorId.toString() !== userId) {
            throw new BadRequest('Not authorized to cancel event')
        }
        cancelledEvent.isCanceled = true
        await cancelledEvent.save()
        return cancelledEvent
    }


}

export const towerEventsService = new TowerEventsService()