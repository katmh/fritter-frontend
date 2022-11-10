<template>
  <main>
    <section class="page_content">
    <header class="page_header">
      <h2>reading list.</h2>
      <button class="action_button danger" @click="clearReadingList">
        clear all
      </button>
    </header>
  </section>
    <section v-if="!this.$store.state.readingList.length">
      <p class="null" v-if="!this.$store.state.readingList.length">
        you have no freets in your reading list. try adding some!
      </p>
    </section>
    <section v-else>
      <Freet
        v-for="freet in this.$store.state.readingList"
        :key="freet.id"
        :freet="freet"
      />
      <p class="null">that’s the end!</p>
    </section>
  </main>
</template>

<script>
import Freet from '@/components/Freet/Freet.vue';

export default {
  name: 'ReadingListPage',
  components: {
    Freet
  },
  methods: {
    clearReadingList() {
      /**
       * Clear user's reading list.
       */
      const params = {
        endpoint: `/api/readinglist`,
        method: 'DELETE',
        callback: () => {
          this.$store.commit('alert', {
            message: 'reading list cleared',
            status: 'success'
          })
        }
      }
      this.request(params);
    },
    async request(params) {
      /**
       * Submits a request to the given endpoint
       * @param params - Options for the request
       * @param params.endpoint - API endpoint for the request
       * @param params.body - Body for the request, if it exists
       * @param params.callback - Function to run if the the request succeeds
       */
       try {
        const r = await fetch(params.endpoint, {
          method: params.method,
          headers: {'Content-Type': 'application/json'},
          ...(params.body ? {body: params.body} : null)
        });
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }
        this.$store.commit('refreshReadingList');
        params.callback();
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>