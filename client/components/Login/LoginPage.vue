<template>
  <main>
    <section class="page_content">
      <header class="page_header">
        <h2>sign in</h2>
      </header>
      <LoginForm />
      <footer>
        <p>don’t have an account? <router-link to="/">sign up</router-link></p>
      </footer>
    </section>
  </main>
</template>

<script>
import LoginForm from '@/components/Login/LoginForm.vue';

export default {
  name: 'LoginPage',
  components: {
    LoginForm
  }
};
</script>

<style scoped>
footer {
  margin-top: 2rem;
}
</style>
