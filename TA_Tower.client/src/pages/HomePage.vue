<template>
  <div class="row d-sm-none d-md-block">
    <div class="col-md-1">
      <router-link :to="{ name: 'Home' }">
        <img class="tower-logo mt-3" src="../assets/img/TowerLogo.svg" alt="" />
      </router-link>
    </div>
  </div>
  <div class="row p-3">
    <div class="col-md-12">
      <img
        class="img-fluid banner-img"
        src="https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt=""
      />
    </div>
  </div>
  <div class="row p-4">
    <div
      class="col-md-12 bg-secondary d-flex justify-content-around py-2 rounded"
    >
      <button
        class="filter-btn text-white"
        :class="{ active: filter == '' }"
        @click="filter = ''"
      >
        All
      </button>
      <button
        class="filter-btn text-white"
        :class="{ active: filter == 'concert' }"
        @click="filter = 'concert'"
      >
        Concert
      </button>
      <button
        class="filter-btn text-white"
        :class="{ active: filter == 'convention' }"
        @click="filter = 'convention'"
      >
        Convention
      </button>
      <button
        class="filter-btn text-white"
        :class="{ active: filter == 'sport' }"
        @click="filter = 'sport'"
      >
        Sport
      </button>
      <button
        class="filter-btn text-white"
        :class="{ active: filter == 'digital' }"
        @click="filter = 'digital'"
      >
        Digital
      </button>
    </div>
  </div>
  <div class="row p-3">
    <div class="col-md-3 mb-4" v-for="t in filteredEvents" :key="t.id">
      <TowerEvent :towerEvent="t" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { towerEventsService } from '../services/TowerEventsService'
import { AppState } from '../AppState'
export default {
  setup() {
    const filter = ref('')
    // const filteredEvents = ref([])
    // watchEffect(() => {
    //   let events = AppState.towerEvents
    //   if (filter.value) {
    //     logger.log(filter.value)
    //     events = events.filter(e => e.type == filter.value)
    //     logger.log(events)
    //   }
    //   filteredEvents.value = events
    // })
    watchEffect(async () => {
      try {
        await towerEventsService.getAllEvents()
      } catch (error) {
        logger.log(error)
        Pop.toast(error.message)
      }
    })
    return {
      filter,
      // filteredEvents,
      filteredEvents: computed(() => AppState.towerEvents.filter(e => filter.value ? e.type == filter.value : true)),
      towerEvents: computed(() => AppState.towerEvents)
    }
  }
}

// ref start with all and have function to change the string.. ref will essentially store the 'type'
// computed will filter the appstate by type
/**class bind text style */
</script>

<style>
.tower-logo {
  height: 49px;
  width: 230px;
}

.filter-btn {
  border: none;
  background-color: #474c61;
}

.banner-img {
  height: 35vh;
  width: 100%;
  object-fit: cover;
  border: 1px solid #56c7fb;
  border-radius: 2px;
}

.active {
  color: var(--bs-success) !important;
  border-bottom: 2px solid var(--bs-success);
}
</style>
