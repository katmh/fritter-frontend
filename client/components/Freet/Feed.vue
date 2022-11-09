<template>
  <section>
    <section v-if="this.entries">
      <FreetComponent
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
import FreetComponent from '@/components/Freet/FreetComponent.vue';

export default {
  name: 'Feed',
  components: {
    FreetComponent
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
