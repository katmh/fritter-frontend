<template>
  <img :src="src" :style="cssVariables" />
</template>

<script>
export default {
  name: 'Icon',
  props: {
    src: String,
    size: {
      type: Number,
      default: 18
    },
    marginLeft: {
      type: Number,
      default: 4
    },
    marginRight: {
      type: Number,
      default: 0
    }
  },
  computed: {
    cssVariables() {
      return {
        '--size': `${this.size}px`,
        '--marginLeft': `${this.marginLeft}px`,
        '--marginRight': `${this.marginRight}px`,
      }
    }
  }
}
</script>

<style scoped>
img {
  display: inline-block;
  vertical-align: middle;
  width: var(--size);
  margin-left: var(--marginLeft);
  margin-right: var(--marginRight);
}
</style>