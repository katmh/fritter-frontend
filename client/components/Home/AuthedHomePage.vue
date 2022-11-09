<template>
  <div><!--This div only exists so we have a root component-->
    <section class="page_content">
      <header class="page_header">
        <h2>home.</h2>
      </header>
      <CreateFreetForm />
    </section>
    <Feed :entries="$store.state.freets" />
  </div>
</template>

<script>
import CreateFreetForm from '@/components/Freet/CreateFreetForm.vue';
import Feed from '@/components/Freet/Feed.vue';

export default {
  name: 'AuthedHomePage',
  components: {
    CreateFreetForm,
    Feed
  },
  mounted() {
    this.$store.commit('refreshFreets');
    this.$store.commit('refreshFollows');
    this.$store.commit('refreshReadingList');
  }
};
</script>