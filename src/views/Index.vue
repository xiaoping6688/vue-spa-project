<template>
  <div id="content">
    <h1>首页</h1>
    <div class="steps">
      <h3>使用手册</h3>
      <el-steps :space="150" direction="vertical" :active="1">
        <el-step title="步骤 1" description="注册成为我们的机构会员"></el-step>
        <el-step title="步骤 2" description="我们会为您提供使用培训"></el-step>
        <el-step title="步骤 3" description="机构使用我们的管理系统"></el-step>
      </el-steps>
    </div>
    <div class="rate">
      用户满意度评价：<el-rate v-model="userRate" show-text></el-rate>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      userRate: null
    }
  }
}
</script>

<style scoped>
#content {
  padding: 10px;
}

.steps {
  margin: 30px;
}

.rate {
  margin: 30px;
}
</style>
