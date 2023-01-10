<template>
  <div class="event-container elevation-5" @click="goToEvent()">
    <img class="img-fluid" :src="towerEvent.coverImg" alt="" />
    <div class="event-details p-2">
      <!-- TODO figure out how to make event name bold...probably need to import that font -->
      <p class="m-0 fs-5 fw-bold">{{ towerEvent.name }}</p>
      <p class="m-0 text-light">{{ towerEvent.location }}</p>
      <p class="m-0 text-light">
        {{ new Date(towerEvent.startDate).toDateString() }}
      </p>
      <p v-if="towerEvent.isCanceled" class="text-center bg-danger m-0">
        CANCELED
      </p>
      <p v-else-if="towerEvent.capacity == 0" class="bg-info text-center m-0">
        SOLD OUT
      </p>
      <p v-else class="capacity my-0">
        <span class="text-primary">{{ towerEvent.capacity }}</span> spots left
      </p>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { logger } from '../utils/Logger'
export default {
  props: {
    towerEvent: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    return {
      router,
      goToEvent() {
        try {
          router.push({ name: 'Event', params: { id: props.towerEvent.id } })
        } catch (error) {
          logger.log(error)
        }
      }
    }
  }
}
</script>

<style>
.event-container {
  position: relative;
  border: 4px solid #474c61;
  border-radius: 3px;
  cursor: pointer;
  transition: 2ms ease;
}

.event-container:hover {
  transform: scale(1.05);
}

.capacity {
  text-align: end;
}
.event-details {
  position: absolute;
  bottom: 0;
  width: 100%;
  backdrop-filter: blur(10px);
  background-color: rgba(57, 68, 71, 0.2);
  border: 1px solid rgba(86, 199, 251, 0.2);
  border-radius: 3px;
}
</style>