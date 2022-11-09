<template>
  <section class="page_content">
    <header class="page_header">
      <h2>connect with friends and the world around you on fritter.</h2>
    </header>

    <h1>sign up</h1>
    <h3>{{tagline}}</h3>
    <RegisterForm />

    <footer>
      already have an account? <router-link to="/login">sign in</router-link>
    </footer>
  </section>
</template>

<script>
import RegisterForm from '@/components/Login/RegisterForm.vue';

const taglines = ['it’s free and always will be.', 'it’s quick and easy.'];
export default {
  name: 'NonAuthedHomePage',
  components: {
    RegisterForm
  },
  mounted() {
    // Select random tagline
    this.tagline = taglines[Math.floor(Math.random() * 2)];
  },
  data() {
    return {
      tagline: ''
    }
  }
};
</script>

<style scoped>
.page_header {
  max-width: 30rem; /* So the one-liner wraps */
}

footer {
  margin-top: 2rem;
}
</style>