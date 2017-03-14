<template>
  <div id="app">
    <c-pageprogress :progress="pageProgress"></c-pageprogress>
    <router-view class="page"></router-view>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import CPageprogress from '@/components/PageProgress'

  // 引入重置样式
  import 'normalize.css'

  // 引入全局通用样式
  import './assets/common.scss'

  // 引入组件库
  import '@/components/UIComponents'

  export default {
    name: 'app',
    computed: mapState([
      'pageProgress'
    ]),
    components: {
      CPageprogress
    }
  }
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
