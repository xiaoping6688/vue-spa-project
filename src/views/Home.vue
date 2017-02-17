<template>
  <div class="home">
    <c-header></c-header>
    <div class="content">
      <el-row>
        <el-col :span="4">
          <c-sidebar></c-sidebar>
        </el-col>
        <el-col :span="20">
          <transition name="fade" mode="out-in">
            <router-view class="main-view"></router-view>
          </transition>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import CHeader from '../components/Header'
import CSidebar from '../components/Sidebar'

export default {
  name: 'home',
  components: {
    CHeader,
    CSidebar
  }
}
</script>

<style scoped>
.content {
  z-index: 1;
  overflow-x: hidden;
}

.main-view {
  padding: 5px;
}
</style>
