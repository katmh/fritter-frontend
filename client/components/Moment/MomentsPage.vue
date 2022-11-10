<template>
  <main>
    <section class="page_content">
      <header class="page_header">
        <h2>my moments.</h2>
      </header>
      <CreateCMForm />
    </section>
    <section>
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