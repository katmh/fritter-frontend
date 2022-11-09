<template>
  <aside>
    <header>
      <router-link to="/" id="logo">
        <img src="../../public/logo.svg">
        <h1 class="title">fritter.</h1>
      </router-link>
    </header>

    <nav v-if="$store.state.username">
      <router-link to="/">home</router-link>
      <router-link to="/account">account</router-link>
      <router-link to="/readinglist">reading list</router-link>
      <router-link to="/moments">moments</router-link>
    </nav>

    <footer class="self" v-if="$store.state.username">
      <p>@{{ $store.state.username }}</p>
      <LogoutForm />
    </footer>
  </aside>
</template>

<script>
import Icon from '@/components/common/Icon.vue';
import LogoutForm from '@/components/Account/LogoutForm.vue';

export default {
  name: 'Sidebar',
  components: {
    Icon,
    LogoutForm
  }
};
</script>

<style scoped>
aside {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100vh;
  border-right: 1px solid #aaa;
  padding-top: 2rem;
  padding-right: 2rem;
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
  text-decoration: none;
  font-weight: bold;
  color: #bab3ad;
  transition: 0.2s;
}

nav a:hover {
  color: #cd6700;
}

.title {
  font-size: 32px;
  margin: 0 5px;
  color: #222;
}

img {
  height: 32px;
}
</style>
