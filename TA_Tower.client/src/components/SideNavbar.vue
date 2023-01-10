<template>
  <div>
    <span class="navbar-text pt-5">
      <button
        class="btn btn-success selectable text-uppercase my-2 my-lg-0"
        @click="login"
        v-if="!user.isAuthenticated"
      >
        Login
      </button>

      <div class="dropdown my-2 my-lg-0 pt-5" v-else>
        <div>
          <div v-if="account.picture" class="text-center img-div">
            <img
              :src="account.picture"
              alt="account photo"
              class="rounded sidebar-img"
            />
          </div>
        </div>
      </div>
      <div class="pt-4 text-center">
        <router-link :to="{ name: 'Account' }">
          <p>Account</p>
        </router-link>
        <router-link :to="{ name: 'Home' }">
          <p>Home</p>
        </router-link>

        <button
          data-bs-toggle="modal"
          data-bs-target="#create-event-modal"
          class="btn btn-success"
        >
          Add Event
        </button>
        <button @click="logout" class="btn text-success pt-5">Logout</button>
      </div>
    </span>
  </div>
  <Modal id="create-event-modal">
    <template #title>
      <h3 class="text-secondary text-uppercase">Create Event</h3>
    </template>
    <template #body>
      <EventForm />
    </template>
  </Modal>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService.js'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup();
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin });
      },
    }
  }
}
</script>

<style>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}

.sidebar-img {
  height: 70px;
  width: 70px;
  border: 1px solid rgb(18, 199, 209);
  margin-top: 11em;
}
</style>