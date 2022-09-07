<template>
  <el-header  width="1000px">
    <el-menu class="header-menu" mode="horizontal" background-color="#B3C0D1" :default-active="this.$router.path" :default-openeds="[]" router>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>导航一</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="/about">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>导航二</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>导航三</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="3-1">选项1</el-menu-item>
          <el-menu-item index="3-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="3-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="3-4">
          <template slot="title">选项4</template>
          <el-menu-item index="3-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-dropdown style="text-align: right">
        <i class="el-icon-setting" ></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>
            <el-button type="text" @click="logout">退出登录</el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-link href="https://element.eleme.io" target="_blank" v-text="userName">默认链接</el-link>
    </el-menu>

  </el-header>
</template>

<script>
import Axios from "@/utils/http";

export default {
  name: "top-aside",
  data() {
    return {
      userName: 'name'
    }
  },
  methods: {
    logout() {
      let _this = this
      Axios({
        method: 'get',
        url: '/logout'
      }).then(function (resp){
        if (resp.data) {
          _this.$store.commit("LOGIN_OUT")
          alert("登出成功！")
          _this.$router.push({path:'/login'})
        } else {
          alert("登出失败！")
          _this.$router.push({path:'/login'})
        }
      })
    }
  }

}
</script>

<style scoped>
.header-menu {
  height: 70px !important;
  padding: 10px 0px 0px 0px;
}
</style>
