<template>
  <form @submit.prevent="submit">
    <article v-if="fields.length">
      <div v-for="field in fields" :key="field.id">
        <label :for="`${field.id}-${title}`">{{ field.label }}:</label>
        <textarea
          v-if="field.id === 'content'"
          :id="`${field.id}-${title}`"
          :name="field.id"
          :value="field.value"
          @input="field.value = $event.target.value"
        />
        <input
          v-else
          type="text"
          :id="`${field.id}-${title}`"
          :name="field.id"
          :value="field.value"
          @input="field.value = $event.target.value"
        >
      </div>
    </article>
    <footer>
      <button :class="`submit_button ${buttonClasses}`" type="submit">
        {{ buttonLabel }}
      </button>
      <p v-for="(status, alert, index) in alerts" :key="index" :class="status">{{alert}}</p>
    </footer>
  </form>
</template>

<script>
export default {
  name: 'CreateCMForm',
  data() {
    return {
      url: '/api/cm',
      method: 'POST',
      hasBody: true,
      fields: [
        {id: 'title', label: 'title', value: ''},
        {id: 'description', label: 'description', value: ''},
        {id: 'admins', label: 'admins', value: ''},
        {id: 'editors', label: 'editors', value: ''}
      ],
      buttonLabel: 'create',
      callback: () => {
        console.log('created a CM');
        // TODO
      }
    }
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

        if (this.setUsername) {
          const text = await r.text();
          const res = text ? JSON.parse(text) : {user: null};
          this.$store.commit('setUsername', res.user ? res.user.username : null);
        }

        if (this.refreshFreets) {
          this.$store.commit('refreshFreets');
        }

        if (this.callback) {
          this.callback();
        }
      } catch (e) {
        if (this.useGlobalAlerts) {
          this.$store.commit('alert', {
            message: e,
            status: 'error'
          });
        } else {
          this.$set(this.alerts, e, 'error');
          setTimeout(() => this.$delete(this.alerts, e), 3000);
        }
      }
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 1rem 0;
  position: relative;
}

article > div {
  display: flex;
  flex-direction: column;
}

form > article p {
  margin: 0;
}

form h3,
form > * {
  margin: 0.3em 0;
}

form h3 {
  margin-top: 0;
}

textarea {
   font-family: inherit;
   font-size: inherit;
}

footer {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.content p {
  margin-bottom: 1rem;
  line-height: 1.3;
}
</style>