<template>
  <section class="alerts">
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
</style>