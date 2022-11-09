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
    <section class="self" v-if="$store.state.username">
      <p>@{{ $store.state.username }}</p>
      <LogoutForm />
    </section>
  
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

/* https://cssgradient.io/blog/css-gradient-text/ */
/* https://stackoverflow.com/questions/23441060/animating-linear-gradient-using-css */
@-webkit-keyframes Animation {
    0%{background-position:10% 0%}
    50%{background-position:91% 100%}
    100%{background-position:10% 0%}
}
@-moz-keyframes Animation {
    0%{background-position:10% 0%}
    50%{background-position:91% 100%}
    100%{background-position:10% 0%}
}
@keyframes Animation { 
    0%{background-position:10% 0%}
    50%{background-position:91% 100%}
    100%{background-position:10% 0%}
}

nav a {
  display: block;
  padding: 0.75rem 0;
  font-size: 1.25rem;
  text-decoration: none;
  font-weight: bold;
  transition: 0.2s;

  background: linear-gradient(90deg, #bab3ad, #cd6700);
  background-size: 200%;
  background-clip: text;
  background-position: 10% 0%;
  -webkit-text-fill-color: transparent;
}

nav a:hover {
  background: linear-gradient(90deg, #bab3ad, #cd6700);
  background-position: 80% 0%;

  /* Same as before */
  background-size: 200%;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.title {
    font-size: 32px;
    margin: 0 5px;
}

img {
    height: 32px;
}
</style>
