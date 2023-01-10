<template>
  <div class="row d-sm-none d-md-block">
    <div class="col-md-1">
      <router-link :to="{ name: 'Home' }">
        <img class="tower-logo mt-3" src="../assets/img/TowerLogo.svg" alt="" />
      </router-link>
    </div>
  </div>
  <div class="row details-bg m-3">
    <div class="col-md-12 details-card elevation-5">
      <div class="row">
        <div class="col-md-4 p-4">
          <img
            class="active-img elevation-2"
            :src="activeEvent?.coverImg"
            alt=""
          />
        </div>
        <div
          class="col-md-8 text-col d-flex flex-column justify-content-between"
        >
          <div class="dropdown text-end">
            <button
              v-if="
                activeEvent?.creator.id == account.id &&
                !activeEvent?.isCanceled
              "
              class="btn fs-2 text-white mdi mdi-dots-horizontal"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            ></button>
            <div
              class="dropdown-menu p-0"
              aria-labelledby="dropdownMenuButton1"
            >
              <p
                data-bs-toggle="modal"
                data-bs-target="#edit-event-modal"
                class="m-0 py-1 selectable"
              >
                Edit Event
              </p>
              <p @click="cancelEvent()" class="text-danger m-0 py-1 selectable">
                Cancel Event
              </p>
            </div>
          </div>
          <div>
            <div class="d-flex justify-content-between">
              <p class="m-0 fs-1">{{ activeEvent?.name }}</p>
              <p class="m-0 fs-5">
                {{ new Date(activeEvent?.startDate).toDateString() }}
              </p>
            </div>
            <p class="m-0 text-light fs-5">{{ activeEvent?.location }}</p>
            <p class="pt-4">{{ activeEvent?.description }}</p>
          </div>
          <div
            class="bg-danger text-center mb-2 rounded"
            v-if="activeEvent?.isCanceled"
          >
            <p class="m-0 fs-3">EVENT CANCELED</p>
          </div>
          <div
            v-else
            class="d-flex justify-content-between event-capacity pb-2"
          >
            <p class="text-light fs-5">
              <span class="text-primary">{{ activeEvent?.capacity }}</span>
              spots left
            </p>
            <button v-if="isAttending" class="btn disabled btn-info">
              Attending
            </button>
            <button
              class="disabled btn btn-danger"
              v-else-if="activeEvent?.capacity == 0"
            >
              Event Sold Out
            </button>
            <button v-else @click="attendEvent()" class="btn btn-warning">
              Attend
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row m-1">
    <div class="col-12">
      <p class="m-0">See who's attending</p>
      <div class="bg-secondary attending-container p-2">
        <img
          class="attending-img mx-2"
          v-for="t in eventTickets"
          :key="t.id"
          :src="t.account?.picture"
          alt=""
          :title="t.account?.name"
        />
      </div>
    </div>
  </div>
  <div class="row m-5">
    <div class="col-md-12">
      <p class="m-0">What people are saying</p>
      <div class="bg-secondary comments-container p-3">
        <p class="text-end text-success">Join the conversation</p>
        <form @submit.prevent="createComment()">
          <textarea
            class="comment-input"
            name="commentInput"
            id="commentInput"
            placeholder="Tell the people..."
            v-model="editable.body"
          ></textarea>
          <div class="text-end pt-2">
            <button class="btn btn-success elevation-3">Post Comment</button>
          </div>
        </form>
        <div class="pt-4" v-for="c in comments" :key="c.id">
          <Comment :comment="c" />
        </div>
      </div>
    </div>
  </div>
  <Modal id="edit-event-modal">
    <template #title>
      <h3 class="text-secondary text-uppercase">Edit Event</h3>
    </template>
    <template #body>
      <EventForm :towerEvent="activeEvent" />
    </template>
  </Modal>
</template>

<script>
import { computed, ref, watchEffect } from '@vue/runtime-core'
import { towerEventsService } from '../services/TowerEventsService'
import { commentsService } from '../services/CommentsService'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { ticketsService } from '../services/TicketsService'
export default {
  setup() {
    const route = useRoute()
    const editable = ref({ eventId: route.params.id });
    watchEffect(async () => {
      try {

        await towerEventsService.getActiveEvent(route.params.id)
        await commentsService.getEventComments(route.params.id)
        await ticketsService.getEventTickets(route.params.id)
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      route,
      editable,
      activeEvent: computed(() => AppState.activeEvent),
      account: computed(() => AppState.account),
      backgroundImg: computed(() => `url(${AppState.activeEvent?.coverImg})`),
      comments: computed(() => AppState.comments),
      eventTickets: computed(() => AppState.eventTickets),
      isAttending: computed(() => AppState.myTickets.find(t => t.eventId == route.params.id)),
      async createComment() {
        try {
          await commentsService.createComment(editable.value)
          editable.value = {}
        } catch (error) {
          Pop.toast(error.message)
          logger.log(error)
        }
      },
      async attendEvent() {
        try {
          await ticketsService.createTicket({ eventId: route.params.id, accountId: AppState.account.id })
        } catch (error) {
          Pop.toast(error.message)
          logger.log(error)
        }
      },
      async cancelEvent() {
        try {
          debugger
          await towerEventsService.cancelEvent(route.params.id)
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
.tower-logo {
  height: 49px;
  width: 230px;
}

.details-bg {
  min-height: 55vh;
  background-image: v-bind(backgroundImg);
  background-position: center;
  background-size: cover;
}

.details-card {
  min-height: 55vh;
  backdrop-filter: blur(15px);
  background-color: #37a4d687;
  border: 1px solid #96abb5af;
  border-radius: 3px;
}
.active-img {
  height: 55vh;
  width: 30vw;
  object-fit: cover;
  border: 1px solid rgb(0 0 0 / 10%);
  border-radius: 2px;
}
.text-col {
  padding-left: 4rem;
}
.event-capacity {
  position: relative;
  bottom: 0;
}
.attending-container {
  min-height: 10vh;
  border-radius: 2px;
}
.comments-container {
  width: 100%;
  min-height: 25vh;
}
.comment-input {
  width: 100%;
  height: 15vh;
  border-radius: 3px;
}
.attending-img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}
</style>