import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TicketSchema = new Schema(
    {
        eventId: { type: Schema.Types.ObjectId, ref: 'TowerEvent', required: true },
        accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
    },
    { timestamps: true, toJSON: { virtuals: true } }
)
TicketSchema.index({ accountId: 1, eventId: 1 }, { unique: true })

TicketSchema.virtual('account', {
    foreignField: '_id',
    localField: 'accountId',
    justOne: true,
    ref: 'Account'
})

TicketSchema.virtual('event', {
    foreignField: '_id',
    localField: 'eventId',
    justOne: true,
    ref: 'TowerEvent'
})
