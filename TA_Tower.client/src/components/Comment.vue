<template>
  <div class="d-flex">
    <img
      :title="comment.creator.name"
      class="comment-img"
      :src="comment.creator.picture"
      alt=""
    />
    <div class="comment-body ms-3 p-2 elevation-4">
      <div class="d-flex justify-content-between">
        <p class="text-primary m-0">
          {{ comment.creator.name }} <span class="text-secondary">said:</span>
        </p>
        <i
          @click="deleteComment()"
          class="mdi mdi-close text-dark"
          title="Delete Comment"
        ></i>
      </div>
      <p class="text-secondary pt-2">{{ comment.body }}</p>
    </div>
  </div>
</template>

<script>
import { commentsService } from '../services/CommentsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      async deleteComment() {
        try {

          await commentsService.deleteComment(props.comment.id)
        } catch (error) {
          Pop.toast(error.message)
          logger.log(error)
        }
      }
    }
  }
}
</script>

<style>
.comment-img {
  height: 10vh;
  border-radius: 50%;
  object-fit: cover;
}
.comment-body {
  width: 100%;
  border-radius: 3px;
  background-color: #d0e5ea;
}
i {
  cursor: pointer;
}
</style>