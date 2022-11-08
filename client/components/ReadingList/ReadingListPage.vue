<template>
  <main>
    <header class="page_header">
      <h2>Reading List</h2>
      <button @click="clearReadingList">
        Clear
      </button>
    </header>
    <section>
      <p v-if="!this.isInitialFetchDone">Loading...</p>
      <p v-else-if="!this.entries.length">
        You have no freets in your reading list. Try adding some!
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
            message: 'Reading list cleared',
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

        // Refresh
        fetch('/api/readinglist', {
          method: 'GET',
          headers: {'Content-Type': 'application/json'}
        }).then(res => res.json()).then(res => {
          this.entries = res.readingList;
        });

        params.callback();
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>