<template>
  <form @submit.prevent="handleSubmit()" class="row g-3">
    <div class="col-12">
      <label for="inputEventName" class="form-label text-dark"
        >Event Name</label
      >
      <input
        type="text"
        class="form-control"
        id="inputEventName"
        v-model="editable.name"
        required="true"
      />
    </div>
    <div class="col-12">
      <label for="inputEventDescription" class="form-label text-dark"
        >Description</label
      >
      <textarea
        name="eventDescription"
        rows="5"
        type="text"
        class="form-control"
        id="inputEventDescription"
        v-model="editable.description"
        required="true"
      ></textarea>
    </div>
    <div class="col-12">
      <label for="inputEventImage" class="form-label text-dark"
        >Event Image</label
      >
      <input
        type="url"
        class="form-control"
        id="inputEventImage"
        placeholder="Image Url..."
        v-model="editable.coverImg"
        required="true"
      />
    </div>
    <div class="col-12">
      <label for="inputEventLocation" class="form-label text-dark"
        >Event Location</label
      >
      <input
        type="text"
        class="form-control"
        id="inputEventLocation"
        placeholder="Location"
        v-model="editable.location"
        required="true"
      />
    </div>
    <div class="col-md-6">
      <label for="inputEventDate" class="form-label text-dark"
        >Start Date</label
      >
      <!-- TODO Need to handle converting date to string to remedy this populate -->
      <!-- <input
        type="date"
        class="form-control"
        id="inputEventDate"
        v-if="editable.value.id"
        required="true"
      /> -->
      <input
        type="date"
        class="form-control"
        id="inputEventDate"
        v-model="editable.startDate"
        required="true"
      />
    </div>
    <div class="col-md-4">
      <label for="inputEventType" class="form-label text-dark"
        >Event Type</label
      >
      <select
        id="inputEventType"
        class="form-select"
        v-model="editable.type"
        required="true"
      >
        <option selected>Type...</option>
        <option class="uppercase">concert</option>
        <option class="uppercase">sport</option>
        <option class="uppercase">convention</option>
        <option class="uppercase">digital</option>
        <option class="uppercase">expos</option>
      </select>
    </div>
    <div class="col-md-2">
      <label for="inputEventCapacity" class="form-label text-dark"
        >Capacity</label
      >
      <input
        type="number"
        class="form-control"
        id="inputEventCapacity"
        v-model="editable.capacity"
        required="true"
      />
    </div>

    <div class="d-flex justify-content-between my-3 px-3 pt-4">
      <button
        type="button"
        data-bs-dismiss="modal"
        aria-label="Close"
        class="btn text-dark lighten-20 text-uppercase selectable"
      >
        <b> cancel </b>
      </button>
      <button type="submit" class="btn text-primary text-uppercase selectable">
        <b> submit </b>
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { watchEffect } from '@vue/runtime-core'
import { towerEventsService } from '../services/TowerEventsService'
import { useRouter } from 'vue-router'
import { Modal } from 'bootstrap'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
  props: {
    towerEvent: {
      type: Object
    }
  },
  setup(props) {
    const editable = ref({})
    const router = useRouter()
    watchEffect(() => {
      editable.value = { ...props.towerEvent }
    })
    return {
      editable,
      async handleSubmit() {
        try {
          if (editable.value.id) {
            await towerEventsService.editEvent(editable.value)
            Modal.getOrCreateInstance(document.getElementById("edit-event-modal")
            ).toggle();
          } else {
            const newEvent = await towerEventsService.createEvent(editable.value)
            router.push({ name: 'Event', params: { id: newEvent.id } })
            Modal.getOrCreateInstance(document.getElementById("create-event-modal")
            ).toggle();
          }
        } catch (error) {
          logger.log(error)
          Pop.toast(error.message)
        }
      }
    }
  }
}
</script>

<style>
.uppercase {
  text-transform: uppercase;
}
</style>