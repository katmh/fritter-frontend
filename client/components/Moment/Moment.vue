<template>
  <article>
    <h3>{{moment.title}}</h3>
    <p>{{moment.description}}</p>
    <p>{{moment.admins}}</p>
    <p>{{moment.editors}}</p>
    <p>{{moment.entries}}</p>
  </article>
</template>

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