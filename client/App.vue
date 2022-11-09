<template>
  <div id="app">
    <Alerts />
    <Sidebar />
    <router-view />
  </div>
</template>

<script>
import Alerts from '@/components/common/Alerts.vue';
import Sidebar from '@/components/common/Sidebar.vue';

export default {
  name: 'App',
  components: {
    Alerts,
    Sidebar
  },
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
  },
  mounted() {
    this.$store.commit('refreshFollows');
    this.$store.commit('refreshReadingList');
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
}

/* Prevent overscrolling :) https://stackoverflow.com/questions/12046315/prevent-overscrolling-of-web-page */
html {
  overflow: hidden;
  height: 100%;
}
body {
  height: 100%;
  overflow: auto;
  background: #fcfcfd;
  color: #232323;
  font-size: 1.1rem;
}

#app {
  display: flex;
  width: 95%;
  max-width: 64rem;
  margin: 0 auto;
}

aside {
  width: 100%;
  max-width: 16rem;
  position: sticky;
  top: 0;
  height: 100%;
}

main {
  width: 100%;
  padding: 2rem auto;
  border-right: 1px solid #aaa;
}

.page_header {
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
}

h1, h2, h3 {
  line-height: 1.3;
  margin: 0.5em 0;
}

h1 {
  font-size: 2.25rem;
}
h2 {
  font-size: 1.75rem;
}
h3 {
  font-size: 1.35rem;
}
main a {
  color: #c60;
}
/* For text-style alerts */
p.error {
  color: #c30;
}
p.success {
  color: #0c3;
}

.page_content {
  margin: 0 2rem;
}

.submit_button {
  padding: 0.7rem 1.4rem;
  font-size: 1.1rem;
  border: none;
  outline: none;
  transition: 0.1s;
  background: #f93;
  cursor: pointer;
  border-radius: 2rem;
  color: #fff;
  font-weight: bold;
}

.submit_button:hover {
  background: #ff8d1a;
}

.action_button {
  padding: 0.3rem 0.8rem;
  background: transparent;
  font-size: 0.9rem;
  border: none;
  outline: none;
  transition: 0.2s;
  border: 2px solid #f93;
  cursor: pointer;
  border-radius: 2rem;
  font-weight: bold;
}

.action_button:hover {
  color: #ff8d1a;
}

input[type="text"],
input[type="password"] {
  font-size: 1.1rem;
  color: #343434;
  padding: 0.6rem 1rem;
  outline: none;
  border-radius: 0.25rem;
  border: 1px solid #aaa;
  margin: 0.25rem 0 1rem;
  max-width: 20rem;
}

input[type="text"]:focus,
input[type="password"]:focus {
  box-shadow: 0 0 4px #ccc;
}

form label {
  padding: 0.25rem 0;
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
