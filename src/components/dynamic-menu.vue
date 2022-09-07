<template>
  <el-menu>
    <template v-for="v in menuList">
      <el-submenu :index="v.name" v-if="v.children&&v.children.length>0" :key="v.name">
        <template slot="title">
          <i class="iconfont" :class="v.meta.icon"></i>
          <span>{{v.meta.name}}</span>
        </template>
        <el-menu-item-group>
          <my-nav :menuList="v.children"></my-nav>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item :key="v.name" :index="v.name" @click="gotoRoute(v.name)" v-else>
        <i class="iconfont" :class="v.meta.icon"></i>
        <span slot="title">{{v.meta.name}}</span>
      </el-menu-item>
    </template>
  </el-menu>


<!--  -->
<!--  <el-menu :default-active="this.$router.path" :default-openeds="['1']" router>-->
<!--    <el-submenu index="1">-->
<!--      <template slot="title"><i class="el-icon-message"></i>导航一</template>-->
<!--      <el-menu-item-group>-->
<!--        <template slot="title">分组一</template>-->
<!--        <el-menu-item index="/about">选项1</el-menu-item>-->
<!--        <el-menu-item index="1-2">选项2</el-menu-item>-->
<!--      </el-menu-item-group>-->
<!--      <el-menu-item-group title="分组2">-->
<!--        <el-menu-item index="1-3">选项3</el-menu-item>-->
<!--      </el-menu-item-group>-->
<!--      <el-submenu index="1-4">-->
<!--        <template slot="title">选项4</template>-->
<!--        <el-menu-item index="1-4-1">选项4-1</el-menu-item>-->
<!--      </el-submenu>-->
<!--    </el-submenu>-->
<!--    <el-submenu index="2">-->
<!--      <template slot="title"><i class="el-icon-menu"></i>导航二</template>-->
<!--      <el-menu-item-group>-->
<!--        <template slot="title">分组一</template>-->
<!--        <el-menu-item index="2-1">选项1</el-menu-item>-->
<!--        <el-menu-item index="2-2">选项2</el-menu-item>-->
<!--      </el-menu-item-group>-->
<!--      <el-menu-item-group title="分组2">-->
<!--        <el-menu-item index="2-3">选项3</el-menu-item>-->
<!--      </el-menu-item-group>-->
<!--      <el-submenu index="2-4">-->
<!--        <template slot="title">选项4</template>-->
<!--        <el-menu-item index="2-4-1">选项4-1</el-menu-item>-->
<!--      </el-submenu>-->
<!--    </el-submenu>-->
<!--    <el-submenu index="3">-->
<!--      <template slot="title"><i class="el-icon-setting"></i>导航三</template>-->
<!--      <el-menu-item-group>-->
<!--        <template slot="title">分组一</template>-->
<!--        <el-menu-item index="3-1">选项1</el-menu-item>-->
<!--        <el-menu-item index="3-2">选项2</el-menu-item>-->
<!--      </el-menu-item-group>-->
<!--      <el-menu-item-group title="分组2">-->
<!--        <el-menu-item index="3-3">选项3</el-menu-item>-->
<!--      </el-menu-item-group>-->
<!--      <el-submenu index="3-4">-->
<!--        <template slot="title">选项4</template>-->
<!--        <el-menu-item index="3-4-1">选项4-1</el-menu-item>-->
<!--      </el-submenu>-->
<!--    </el-submenu>-->
<!--  </el-menu>-->
</template>

<script>
export default {
  name: "my-nav",
  props:{
    menuList: {
      type: Array,
      default: function() {
        return []
      }
    }
    },
  methods: {
    gotoRoute(name) {
      this.$router.push({name})
    }
  }
}
</script>

<style scoped>
.el-menu {
  color: #333;
  width: 100%;
}
</style>
