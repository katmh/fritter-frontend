<template>
  <section>
    <section v-if="this.entries">
      <Freet
        v-for="entry in entries"
        :key="entry.id"
        :freet="entry.freet"
        :metadata="entry.metadata"
      />
    </section>
    <article v-else>
      <h3>{{ nullMessage }}</h3>
    </article>
  </section>
</template>

<script>
import Freet from '@/components/Freet/Freet.vue';

export default {
  name: 'Feed',
  components: {
    Freet
  },
  props: {
    entries: {
      type: Array
    },
    nullMessage: {
      type: String,
      default: "No freets found."
    }
  }
};
</script>

<style scoped>

</style>
