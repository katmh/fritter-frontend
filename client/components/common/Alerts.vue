<template>
  <section class="global_alerts">
    <article
      v-for="(status, alert, index) in $store.state.alerts"
      :key="index"
      :class="status"
    >
      <p>{{ alert }}</p>
    </article>
  </section>
</template>

<script>

</script>

<style scoped>
.global_alerts {
  position: fixed;
  top: 0;
  left: 0;
}
</style>