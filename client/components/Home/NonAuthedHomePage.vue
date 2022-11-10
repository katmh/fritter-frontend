<template>
  <section class="page_content">
    <header class="page_header">
      <h2>connect with friends and the world around you on fritter.</h2>
    </header>

    <h1>sign up</h1>
    <h3>
      {{tagline}}
      <span @click="cycleTagline" id="refresh">
        <Icon src="/icons/refresh-cw.svg"  />
      </span>
    </h3>
    <RegisterForm />

    <footer>
      <p>already have an account? <router-link to="/login">sign in</router-link></p>
    </footer>
  </section>
</template>

<script>
import Icon from '@/components/common/Icon.vue';
import RegisterForm from '@/components/Login/RegisterForm.vue';

const taglines = [
  'it’s free and always will be.',
  'it’s quick and easy.',
  'the f stands for facebook.',
  'try signing in as alyssa, ben, carly, or dorothy!'
];

export default {
  name: 'NonAuthedHomePage',
  components: {
    Icon,
    RegisterForm
  },
  mounted() {
    // Select random tagline
    this.taglineIndex = Math.floor(Math.random() * 3);
  },
  data() {
    return {
      taglineIndex: 0
    }
  },
  computed: {
    tagline() {
      return taglines[this.taglineIndex];
    }
  },
  methods: {
    cycleTagline() {
      this.taglineIndex = (this.taglineIndex + 1) % taglines.length;
    }
  }
};
</script>

<style scoped>
.page_header {
  max-width: 30rem; /* So the one-liner wraps */
}

#refresh {
  cursor: pointer;
}

footer {
  margin-top: 2rem;
}
</style>