<template>
  <main>
    <AuthedHomePage v-if="$store.state.username" />
    <NonAuthedHomePage v-else />
  </main>
</template>

<script>
import NonAuthedHomePage from '@/components/Home/NonAuthedHomePage.vue';
import AuthedHomePage from '@/components/Home/AuthedHomePage.vue';

export default {
  name: 'HomePage',
  components: {
    NonAuthedHomePage,
    AuthedHomePage
  }
};
</script>