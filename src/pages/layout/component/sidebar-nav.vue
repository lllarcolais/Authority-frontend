<template>
  <el-menu :default-active="currentMenu">
    <DynamicMenu :menuList="sidebarMenu"></DynamicMenu>
  </el-menu>
</template>

<script>
import DynamicMenu from '@/components/dynamic-menu'
import { mapState } from 'vuex'

export default {
  name: "sidebar-nav",
  data() {
    return {

    }
  },
  computed: {
    ...mapState('permission',['sidebarMenu','currentMenu'])
  },
  methods: {},
  components: {
    DynamicMenu
  }
}
</script>

<style scoped>

</style>
