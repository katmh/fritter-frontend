<!-- Default page that also displays freets -->

<template>
  <main>
    <section class="page_content" v-if="$store.state.username">
      <header class="page_header">
        <h2>home.</h2>
      </header>
      <CreateFreetForm />
    </section>
    <section class="page_content" v-else>
      <header class="page_header">
        <h2>connect with friends and the<br />world around you on fritter.</h2>
      </header>
      <h3>{{tagline}}</h3>
      <RegisterForm />
      <LoginForm />
    </section>
    <section>

      <section
        v-if="$store.state.freets.length"
      >
        <FreetComponent
          v-for="freet in $store.state.freets"
          :key="freet.id"
          :freet="freet.freet"
          :metadata="freet.metadata"
        />
      </section>
      <article
        v-else
      >
        <h3>No freets found.</h3>
      </article>
    </section>
  </main>
</template>

<script>
import RegisterForm from '@/components/Login/RegisterForm.vue';
import LoginForm from '@/components/Login/LoginForm.vue';

import FreetComponent from '@/components/Freet/FreetComponent.vue';
import CreateFreetForm from '@/components/Freet/CreateFreetForm.vue';
import GetFreetsForm from '@/components/Freet/GetFreetsForm.vue';

const taglines = [
  "it's free and always will be.",
  "it's quick and easy."
];

export default {
  name: 'FreetsPage',
  components: {
    RegisterForm,
    LoginForm,
    FreetComponent,
    GetFreetsForm,
    CreateFreetForm
  },
  mounted() {
    this.tagline = taglines[Math.floor(Math.random() * 2)];
    this.$refs.getFreetsForm.submit();
  },
  data() {
    return {
      tagline: ''
    }
  }
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
}

header, header > * {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    margin-right: 10px;
}

section .scrollbox {
  flex: 1 0 50vh;
  padding: 3%;
  overflow-y: scroll;
}
</style>
