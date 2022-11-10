<template>
  <form @submit.prevent="submit">
    <button class="text_button" type="submit">sign out</button>
  </form>
</template>

<style scoped>
form {
  width: 10rem;
}
button {
  white-space: nowrap;
  width: 100%;
}
</style>

<script>
export default {
  name: 'LogoutButton',
  methods: {
    async submit() {
      const options = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        credentials: 'same-origin'
      };
      try {
        const r = await fetch('/api/users/session', options);
        
        // Set username
        this.$store.commit('setUsername', null);

        // "Callback"
        this.$router.push({name: 'Home'});
        this.$store.commit('alert', {
          message: 'Signed out successfully', status: 'success'
        });
      } catch (e) {
        this.$store.commit('alert', {
          message: e, status: 'error'
        });
      }
    }
  }
}
</script>
