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
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-date"></i>班级</template>
        <el-menu-item index="/schedule-manage">排课管理</el-menu-item>
        <el-menu-item index="/classtype-manage">班型管理</el-menu-item>
        <el-menu-item index="/class-manage">班级管理</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-document"></i>科目</template>
        <el-menu-item index="/subject-manage">科目管理</el-menu-item>
        <el-menu-item index="/course-manage">课程管理</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title"><i class="el-icon-more"></i>学生</template>
        <el-menu-item index="/student-manage">学生管理</el-menu-item>
        <el-menu-item index="/purchase-manage">购课记录</el-menu-item>
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
