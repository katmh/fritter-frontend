<!--Refactored out from BlockForm-->

<template>
  <form @submit.prevent="submit">
    <article v-if="fields.length">
      <div v-for="field in fields" :key="field.id">
        <textarea
          :name="field.id"
          :value="field.value"
          @input="field.value = $event.target.value"
          placeholder="what is happening"
        />
      </div>
    </article>
    <div class="actions">
      <div class="error_messages">
        <p v-for="(status, alert, index) in alerts" :key="index">{{alert}}</p>
      </div>
      <button type="submit" class="submit_button">fyeet</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'CreateFreetForm',
  data() {
    return {
      url: '/api/freets',
      method: 'POST',
      hasBody: true,
      fields: [{id: 'content', value: ''}],
      refreshFreets: true,
      callback: () => {
        this.$store.commit('alert', {
          message: 'fbeet fleeted (freet posted)!',
          status: 'success'
        });
      },
      alerts: {}
    };
  },
  methods: {
    async submit() {
      /**
        * Submits a form with the specified options from data().
        */
      const options = {
        method: this.method,
        headers: {'Content-Type': 'application/json'},
        credentials: 'same-origin' // Sends express-session credentials with request
      };
      if (this.hasBody) {
        options.body = JSON.stringify(Object.fromEntries(
          this.fields.map(field => {
            const {id, value} = field;
            field.value = '';
            return [id, value];
          })
        ));
      }

      try {
        const r = await fetch(this.url, options);
        if (!r.ok) {
          // If response is not okay, we throw an error and enter the catch block
          const res = await r.json();
          throw new Error(res.error);
        }

        if (this.refreshFreets) {
          this.$store.commit('refreshFreets');
        }

        if (this.callback) {
          this.callback();
        }
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>

<style scoped>
textarea {
  width: 100%;
  height: 7rem;
  padding: 1rem;
  border-radius: 0.5rem;
  resize: none;
  font-size: 1.15rem;
  line-height: 1.4;
  outline: none;
  transition: 0.1s;
}

textarea:focus {
  box-shadow: 0 0 4px #ccc;
}

.actions {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0.4rem 0;
}

.error_messages p {
  color: #c30;
}

form {
  margin-bottom: 1rem;
}
</style>