<template>
  <article
    class="freet"
  >
    <header>
      <h3 class="author">
        @{{ freet.author }}

        <button v-if="$store.state.username !== freet.author" @click="followAuthor">
          Follow
        </button>
      </h3>
      <button @click="addToReadingList">
        Read Later
      </button>
      <button @click="addToCm">
        Add to Collaborative Moment
      </button>
      <div
        v-if="$store.state.username === freet.author"
        class="actions"
      >
        <button @click="deleteFreet">
          🗑️ Delete
        </button>
      </div>
    </header>
    <p
      class="content"
    >
      {{ freet.content }}
    </p>
    <p class="info">
      Posted at {{ freet.dateModified }}
      <i v-if="freet.edited">(edited)</i>
    </p>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </article>
</template>

<script>
export default {
  name: 'FreetComponent',
  props: {
    // Data from the stored freet
    freet: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      alerts: {} // Displays success/error messages encountered during freet modification
    };
  },
  methods: {
    deleteFreet() {
      /**
       * Deletes this freet.
       */
      const params = {
        endpoint: `/api/freets/${this.freet._id}`,
        method: 'DELETE',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully deleted freet!', status: 'success'
          });
        }
      };
      this.request(params);
    },
    addToReadingList() {
      /**
       * Adds this freet to the logged in user's reading list.
       */
      const params = {
        endpoint: `api/readinglist/${this.freet._id}`,
        method: 'POST',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Added freet to reading list',
            status: 'success'
          })
        }
      };
      this.request(params);
    },
    addToCm() {
      // TODO
    },
    followAuthor() {
      /**
       * Follow author of freet.
       */
      console.log('this.freet', this.freet);
      const params = {
        endpoint: `api/follows/${this.freet.authorId}`,
        method: 'POST',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Followed author',
            status: 'success'
          })
        }
      };
      this.request(params);
    },
    // submitEdit() {
    //   /**
    //    * Updates freet to have the submitted draft content.
    //    */
    //   if (this.freet.content === this.draft) {
    //     const error = 'Error: Edited freet content should be different than current freet content.';
    //     this.$set(this.alerts, error, 'error'); // Set an alert to be the error text, timeout of 3000 ms
    //     setTimeout(() => this.$delete(this.alerts, error), 3000);
    //     return;
    //   }

    //   const params = {
    //     method: 'PATCH',
    //     message: 'Successfully edited freet!',
    //     body: JSON.stringify({content: this.draft}),
    //     callback: () => {
    //       this.$set(this.alerts, params.message, 'success');
    //       setTimeout(() => this.$delete(this.alerts, params.message), 3000);
    //     }
    //   };
    //   this.request(params);
    // },
    async request(params) {
      /**
       * Submits a request to the freet's endpoint
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

        // this.editing = false;
        this.$store.commit('refreshFreets');

        params.callback();
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>

<style scoped>
.freet {
    border: 1px solid #111;
    padding: 20px;
    position: relative;
}
</style>
