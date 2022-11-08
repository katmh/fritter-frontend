<template>
  <div id="app">
    <Sidebar />
    <router-view />
  </div>
</template>

<script>
import Sidebar from '@/components/common/Sidebar.vue';

export default {
  name: 'App',
  components: {Sidebar},
  beforeCreate() {
    // Sync stored username to current session
    fetch('/api/users/session', {
      credentials: 'same-origin' // Sends express-session credentials with request
    }).then(res => res.json()).then(res => {
      const user = res.user;
      this.$store.commit('setUsername', user ? user.username : null);
    });

    // Clear alerts on page refresh
    this.$store.state.alerts = {};
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  /* Resets */
  margin: 0;
  padding: 0;
  font-family: Helvetica, sans-serif;
  color: #232323;
}

#app {
  display: flex;
  gap: 2rem;
  width: 95%;
  max-width: 60rem;
  margin: 2rem auto;
}

aside {
  width: 100%;
  max-width: 16rem;
  position: sticky;
  top: 2rem;
  height: 100%;
}

main {
  width: 100%;
}

.alerts {
    position: absolute;
    z-index: 99;
    bottom: 0;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 10%);
    width: 100%;
    text-align: center;
}

.alerts article {
    border-radius: 5px;
    padding: 10px 20px;
    color: #fff;
}

.alerts p {
    margin: 0;
}

.alerts .error {
    background-color: rgb(166, 23, 33);
}

.alerts .success {
    background-color: rgb(45, 135, 87);
}
</style>
