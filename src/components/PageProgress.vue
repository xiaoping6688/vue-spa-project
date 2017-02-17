/**
 * 页面进度组件
 */

<template>
  <div :class="['progress', classes]" :style="{width: '' + progress + '%'}" v-show="isShow"></div>
</template>

<script>
export default {
  props: {
    classes: {
      type: String,
      default: ''
    },
    progress: {
      type: Number,
      default: 0
    }
  },
  computed: {
    isShow () {
      return this.progress > 0
    }
  }
}
</script>

<style scoped>
.progress {
  position: fixed;
  z-index: 100001;
  top: 0;
  left: 0;
  background-color: #58B7FF;
  width: 100%;
  height: 0.1rem;
  transition: width .5s ease;
}
</style>
