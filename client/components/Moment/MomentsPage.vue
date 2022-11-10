<template>
  <main>
    <section class="page_content">
      <header class="page_header">
        <h2>moments.</h2>
      </header>
      <h3>create a new moment</h3>
      <CreateCMForm />
    </section>
    <section>
      <header class="page_content page_header">
        <h3>my moments</h3>
      </header>
      <Moment v-for="(moment) in $store.state.myMoments" :moment=moment />
    </section>
  </main>
</template>

<script>
import CreateCMForm from '@/components/Moment/CreateCMForm.vue';
import Moment from '@/components/Moment/Moment.vue';

export default {
  name: 'MomentsPage',
  components: {
    CreateCMForm,
    Moment
  },
  mounted() {
    this.$store.commit('refreshUsers'); // Need list of users to search for admins/editors
    this.$store.commit('refreshMyMoments');
  }
}
</script>