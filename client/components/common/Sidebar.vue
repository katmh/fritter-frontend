<template>
  <aside>
    <header>
      <router-link to="/" id="logo">
        <img src="../../public/logo.svg">
        <h1 class="title">Fritter</h1>
      </router-link>
    </header>
    <nav>
      <router-link to="/">
        Home
      </router-link>
      <router-link
        v-if="$store.state.username"
        to="/account"
      >
        Account
      </router-link>
      <router-link
        v-if="$store.state.username"
        to="/readinglist"
      >
        Reading List
      </router-link>
      <router-link
        v-if="$store.state.username"
        to="/moments"
      >
        Moments
      </router-link>
      <router-link
        v-else
        to="/login"
      >
        Login
      </router-link>
    </nav>
    <p>@{{ $store.state.username }}</p>
    <LogoutForm />
    <section class="alerts">
      <article
        v-for="(status, alert, index) in $store.state.alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </aside>
</template>

<script>
import LogoutForm from '@/components/Account/LogoutForm.vue';

export default {
  name: 'Sidebar',
  components: {
    LogoutForm
  }
};
</script>

<style scoped>
aside {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

#logo {
  display: flex;
  gap: 0.25rem;
  text-decoration: none;
}

#logo img {
  display: block;
}

nav {
  display: flex;
  flex-direction: column;
}

nav a {
  display: block;
  padding: 0.75rem 0;
  font-size: 1.25rem;
}

.title {
    font-size: 32px;
    margin: 0 5px;
}

img {
    height: 32px;
}

.alerts {
    width: 25%;
}
</style>
