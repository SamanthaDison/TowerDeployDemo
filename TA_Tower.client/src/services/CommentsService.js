import { AppState } from "../AppState"
import { api } from "./AxiosService"

class CommentsService {

    async getEventComments(eventId) {
        const res = await api.get(`api/events/${eventId}/comments`)
        console.log('event comments', res.data)
        AppState.comments = res.data
    }

    async createComment(newComment) {
        const res = await api.post('api/comments', newComment)
        console.log(res)
        AppState.comments.unshift(res.data)
    }

    async deleteComment(commentId) {
        const res = await api.delete(`api/comments/${commentId}`)
        console.log('deleting comment')
        AppState.comments = AppState.comments.filter(c => c.id != commentId)
    }
}

export const commentsService = new CommentsService()