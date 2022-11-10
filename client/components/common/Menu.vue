<template>
  <div class="menu_container">
    <div class="menu_button" @click="toggleContent">
      <Icon src="/icons/more-horizontal.svg" size=24 />
    </div>
    <div class="menu_content" :class="{show: isShowContent}">
      <slot />
    </div>
  </div>
</template>

<script>
import Icon from '@/components/common/Icon.vue';
export default {
  name: 'Menu',
  components: {Icon},
  data() {
    return {
      isShowContent: false
    }
  },
  methods: {
    toggleContent() {
      console.log('click');
      this.isShowContent = !this.isShowContent;
    }
  }
};
</script>

<style>
.menu_container {
  position: relative;
}

.menu_button {
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  opacity: 0.6;
  transition: .1s;
}
.menu_button:hover {
  opacity: 1;
}

.menu_content {
  display: none;
  border: 1px solid black;
  border-radius: 1rem;
  overflow: hidden;
  position: absolute;
  right: 0;
}

.show {
  display: block;
}
</style>