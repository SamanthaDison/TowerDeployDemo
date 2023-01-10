import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class CommentsService {
    async createComment(newComment) {
        const comment = await dbContext.Comments.create(newComment)
        await comment.populate('creator', 'name picture')
        return comment
    }
    async getEventComments(eventId) {
        const comments = await dbContext.Comments.find({ eventId }).populate('creator', 'name picture')
        return comments
    }
    async deleteComment(commentId, userId) {
        const comment = await dbContext.Comments.findById(commentId)
        if (comment.creatorId.toString() !== userId) {
            throw new BadRequest('Unauthorized to delete comment')
        }
        await dbContext.Comments.findByIdAndDelete(commentId)
    }
}

export const commentsService = new CommentsService()