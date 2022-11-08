<template>
  <main>
    <h2>Reading List</h2>
    <section>
      <p
        v-if="!this.isInitialFetchDone"
      >
        Loading...
      </p>
      <FreetComponent
        v-for="freet in this.entries"
        :key="freet.id"
        :freet="freet"
      />
    </section>
  </main>
</template>

<script>
import FreetComponent from '@/components/Freet/FreetComponent.vue';

export default {
  name: 'ReadingListPage',
  components: {
    FreetComponent
  },
  data() {
    return {
      entries: [],
      isInitialFetchDone: false
    }
  },
  mounted() {
    fetch('/api/readinglist', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    }).then(res => res.json()).then(res => {
      this.entries = res.readingList;
      this.isInitialFetchDone = true;
    });
  }
};
</script>