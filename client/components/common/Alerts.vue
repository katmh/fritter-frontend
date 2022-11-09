<template>
  <section class="global_alerts">
    <article
      class="alert"
      v-for="(status, alert, index) in $store.state.alerts"
      :key="index"
      :class="`${status}`"
      @click="hideAlert(alert)"
    >
      <p>{{ alert }}</p>
    </article>
  </section>
</template>

<script>
export default {
  name: 'Alerts',
  methods: {
    hideAlert(alert) {
      this.$store.commit('removeAlert', alert);
    }
  }
}
</script>

<style scoped>
.global_alerts {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* For banner-style alert backgrounds */
.alert {
  padding: 0.7rem 1.4rem;
  border-radius: 0.3rem;
  font-size: 1rem;
  text-align: center;
}
article.error {
  background: #c30;
  color: #fff;
}
article.success {
  background: #0c3;
  color: #fff;
}
</style>