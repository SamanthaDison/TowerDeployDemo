<template>
  <header class="d-md-none d-sm-block">
    <Navbar />
  </header>
  <main class="container-fluid bg-dark">
    <div class="row">
      <div class="col-md-11">
        <router-view />
      </div>
      <div class="col-md-1 sidebar-bg d-sm-none d-md-block side-nav">
        <SideNavbar />
      </div>
    </div>
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.side-nav {
  min-height: 100vh;
}

.sidebar-bg {
  background-image: linear-gradient(#43485f, #2a2d3a);
}

// TODO: add this class to header for mobile display class="d-md-none d-sm-block"
</style>


