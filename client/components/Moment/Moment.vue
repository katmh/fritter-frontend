<template>
  <article class="moment">
    <p><b>{{moment.title}}</b></p>
    <p>{{moment.description}}</p>
    <p>{{moment.admins.length}} admin(s)</p>
    <p>{{moment.editors.length}} editor(s)</p>
    <p>{{moment.entries.length}} freets</p>
  </article>
</template>

<style scoped>
.moment {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.4rem 1.8rem;
  border-top: 1px solid #aaa;
}
.moment:last-of-type {
  border-bottom: 1px solid #aaa;
}
</style>

<script>
export default {
  name: 'Moment',
  props: {
    moment: {
      type: Object,
      required: true
    }
  }
}
</script>