/**
 * 面包屑组件
 */

<template>
  <el-breadcrumb separator="/" class="breadcrumb">
    <el-breadcrumb-item v-for="item in items" :to="item.path" :key="item.label">{{ item.label }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.breadcrumb {
  padding: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #e0e6ed;
}
</style>
