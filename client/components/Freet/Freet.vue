<template>
  <article class="freet">
    <section class="source" v-if="metadata?.isFromReadingList">
      <p v-if="metadata?.isFromReadingList">
        from your reading list
      </p>
      <p v-else-if="this.$store.state.readingList.map((freet) => freet._id).includes(freet._id)">
        on your reading list
      </p>
    </section>
    <section class="info">
      <div class="author_and_follow">
        <p class="author">@{{ freet.author.username }}</p>
        <!--<span v-if="$store.state.username !== freet.author.username">
          <button class="action_button" v-if="$store.state.follows.includes(freet.authorId)" @click="unfollowAuthor">
            unfollow
          </button>
          <button class="action_button" v-else @click="followAuthor">follow</button>
        </span>-->
      </div>
      <p class="timestamp">{{ freet.dateCreated }}</p>
    </section>
    <section class="content">
      <p>{{ freet.content }}</p>
    </section>
    <section class="actions">
      <button class="action_button" @click="addToReadingList" v-if="!this.$store.state.readingList.map((freet) => freet._id).includes(freet._id)">
        read later
      </button>
      <button class="action_button" @click="removeFromReadingList" v-else>
        x remove from reading list
      </button>
      <button class="action_button" @click="addToCm">
        + add to moment
      </button>
      <div
        v-if="$store.state.username === freet.author"
        class="actions"
      >
        <button class="action_button" @click="deleteFreet">
          🗑️ Delete
        </button>
      </div>
    </section>
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

<style scoped>
.freet {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.4rem 1.8rem;
  border-top: 1px solid #aaa;
}
.freet:last-of-type {
  border-bottom: 1px solid #aaa;
}
.info {
  display: flex;
  gap: 0.8rem;
  font-size: 1.1rem;
  align-items: center;
}

.author_and_follow {
  display: flex;
  gap: 0.4rem;
  align-items: center;
}

.content {
  font-size: 1.1rem;
}

.author {
  font-weight: bold;
}

.timestamp {
  margin-left: 0.2rem;
  color: #777;
}

.actions {
  display: flex;
  gap: 0.4rem;
}

.source {
  font-weight: bold;
  font-style: italic;
  color: #f93;
}
</style>

<script>
export default {
  name: 'Freet',
  props: {
    freet: {
      type: Object,
      required: true
    },
    metadata: {
      type: Object
    }
  },
  data() {
    return {
      alerts: {}
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
          this.$store.commit('refreshReadingList');
          this.$store.commit('alert', {
            message: 'Added freet to reading list',
            status: 'success'
          });
        }
      };
      this.request(params);
    },
    removeFromReadingList() {
      /**
       * Removes this freet from the logged in user's reading list.
       */
      const params = {
        endpoint: `api/readinglist/${this.freet._id}`,
        method: 'DELETE',
        callback: () => {
          this.$store.commit('refreshReadingList');
          this.$store.commit('alert', {
            message: 'Removed freet from reading list',
            status: 'success'
          });
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
      const params = {
        endpoint: `api/follows/${this.freet.authorId}`,
        method: 'POST',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Followed user, refreshing your feed...',
            status: 'success'
          });
          this.$store.commit('refreshFollows');
        }
      };
      this.request(params);
    },
    unfollowAuthor() {
      /**
       * Unfollow author of freet.
       */
      const params = {
        endpoint: `api/follows/${this.freet.authorId}`,
        method: 'DELETE',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Unfollowed user, refreshing your feed...',
            status: 'success'
          });
          this.$store.commit('refreshFollows');
        }
      };
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
        // this.$store.commit('refreshFreets');
        if (params.callback) {
          params.callback();
        }
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>
