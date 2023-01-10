<template>
  <div class="d-flex bg-secondary ticket-container elevation-3">
    <img class="ticket-img" :src="towerEvent.event.coverImg" alt="" />
    <div class="p-3 ticket-body">
      <div>
        <p class="m-0 fs-2">{{ towerEvent.event.name }}</p>
        <p class="m-0 pt-2 text-light">{{ towerEvent.event.location }}</p>
        <p class="m-0 text-light">
          {{ new Date(towerEvent.event.startDate).toDateString() }}
        </p>
      </div>
      <div class="text-end pe-5">
        <button @click="cancelTicket()" class="btn btn-info">
          Cancel Ticket
        </button>
      </div>
    </div>
    <div class="ticket-circle"></div>
  </div>
</template>

<script>
import { ticketsService } from '../services/TicketsService'
import Pop from '../utils/Pop'
export default {
  props: {
    towerEvent: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      async cancelTicket() {
        try {
          await ticketsService.cancelTicket(props.towerEvent.id)
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
.ticket-container {
  width: 75%;
  position: relative;
}
.ticket-img {
  height: 35vh;
  max-width: 100%;
}
.ticket-circle {
  border-radius: 50%;
  position: absolute;
  width: 20vh;
  height: 20vh;
  right: -5em;
  top: 3.7em;
  background-color: #2b2d3a;
}
.ticket-body {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>