<template>
  <el-container>
    <el-header>
      <TopAside/>
    </el-header>
    <el-container>
      <el-aside>
        <sidebarNav/>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import mainContent from './component/main-content/index'
import sidebarNav from './component/sidebar-nav'
import TopAside from './component/top-aside'

export default {
  name: "index",
  data() {
    return{

    }
  },
  computed: {

  },
  components: {
    mainContent,
    sidebarNav,
    TopAside
  }
}
</script>

<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 65px;
  text-align: right;
  height: 80px !important;
  width: 100%;
}
.el-aside {
  color: #333;
}
</style>
