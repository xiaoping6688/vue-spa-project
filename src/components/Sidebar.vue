/**
 * 侧栏导航组件
 */

<template>
  <div class="container">
    <el-menu :default-active="defaultActive" :router="true" @select="onSelected">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-menu"></i>机构</template>
        <el-menu-item index="/campus-manage">校区管理</el-menu-item>
        <el-menu-item index="/classroom-manage">教室管理</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-edit"></i>教师</template>
        <el-menu-item index="/role-manage">角色管理</el-menu-item>
        <el-menu-item index="/teacher-manage">教师管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    let active = window.sessionStorage.defaultActive || '/campus-manage'

    return {
      defaultActive: active
    }
  },
  methods: {
    onSelected (index) {
      window.sessionStorage.defaultActive = index
    }
  }
}
</script>

<style scoped>
.container {
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
}
</style>
