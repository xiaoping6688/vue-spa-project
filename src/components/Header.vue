/**
 * 顶栏导航组件
 */

<template>
  <header class="header">
    <el-menu theme="dark" mode="horizontal" class="menu" @select="handleSelect">
      <el-row type="flex" justify="space-between">
        <el-col :span="1">
          <el-menu-item index="logo">
            <img class="logo" src="../assets/logo.png" alt="logo">
          </el-menu-item>
        </el-col>
        <el-col :span="1">
          <el-menu-item index="quit">退出</el-menu-item>
        </el-col>
      </el-row>
    </el-menu>
  </header>
</template>

<script>
export default {
  methods: {
    handleSelect (key) {
      if (key === 'logo') {
        // this.$router.push('/')
      } else if (key === 'quit') {
        this.$store.dispatch('logout')
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped>
.header {
  height: 4rem;
}

.menu {
  position: fixed;
  z-index: 2;
  width: 100%;
  height: 4rem;
  top: 0;
  left: 0;
}

.logo {
  width: 100px;
  height: 40px;
  vertical-align: middle;
}
</style>
