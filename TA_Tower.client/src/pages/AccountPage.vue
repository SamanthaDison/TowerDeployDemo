<template>
  <div class="row d-sm-none d-md-block">
    <div class="col-md-1">
      <router-link :to="{ name: 'Home' }">
        <img class="tower-logo mt-3" src="../assets/img/TowerLogo.svg" alt="" />
      </router-link>
    </div>
  </div>
  <div class="row pt-3 px-3">
    <div class="col-md-12">
      <p class="text-success fs-2">My Events</p>
    </div>
  </div>
  <div class="row px-3">
    <div class="col-md-3 mb-4" v-for="e in myEvents" :key="e.id">
      <TowerEvent :towerEvent="e" />
    </div>
  </div>
  <div class="row pt-3 px-3">
    <div class="col-md-12">
      <p class="text-success fs-2">Upcoming Events</p>
    </div>
  </div>
  <div class="row m-5">
    <div
      class="col-md-12 d-flex align-items-center flex-column my-3"
      v-for="a in attendingEvents"
      :key="a.id"
    >
      <Attending :towerEvent="a" />
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { towerEventsService } from '../services/TowerEventsService'
export default {
  name: 'Account',
  setup() {
    watchEffect(async () => {
      await towerEventsService.getAllEvents()
    })
    return {
      account: computed(() => AppState.account),
      myEvents: computed(() => AppState.towerEvents.filter(e => e.creatorId == AppState.account.id)),
      attendingEvents: computed(() => AppState.myTickets)
    }
  }
}
</script>

<style scoped>
.tower-logo {
  height: 49px;
  width: 230px;
}
</style>
