<template>
  <div>
    <el-button type="primary" @click="dialogVisible_add1 = true">
      <i class="el-icon-plus"></i>  添加根权限
    </el-button>
    <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        :expand-row-keys="expandRowKeys"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
          prop="permission"
          label="权限"
          sortable
          width="180">
      </el-table-column>
      <el-table-column
          prop="type"
          label="类型"
          sortable
          width="180">
      </el-table-column>
      <el-table-column
          prop="url"
          label="路径"
          width="180">
      </el-table-column>
      <el-table-column
          prop="description"
          label="描述"
          width="180">
      </el-table-column>
      <el-table-column
          label="操作[添加子权限/编辑权限/删除权限]"
          align="center"
          width="300">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="dialogVisible_add2 = true;currentRow=scope.row">
            <i class="el-icon-plus"></i>
          </el-button>
          <el-button size="mini" type="primary" @click="dialogVisible_update = true;currentRow=scope.row">
            <i class="el-icon-edit"></i>
          </el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">
            <i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
        title="添加子权限"
        :visible.sync="dialogVisible_add2"
        width="500px"
        @open="openDialog()"
        :before-close="handleClose">
        <span>
          <el-radio-group v-model="addType" size="small">
            <el-radio-button label="custom">自定义</el-radio-button>
            <el-radio-button label="quick">快速</el-radio-button>
          </el-radio-group>
          <div style="margin: 20px"></div>
          <el-form v-if="addType=='custom'" label-width="100px">
            <el-form-item label="权限名称">
              <el-input style="width: 70%"></el-input>
            </el-form-item>
            <el-form-item label="权限类型">
              <el-select placeholder="请选择权限类型">
                <el-option label="菜单" value=""></el-option>
                <el-option label="操作" value=""></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="路径">
              <el-input style="width: 70%"></el-input>
            </el-form-item>
            <el-form-item label="描述">
              <el-input type="textarea" style="width: 70%"></el-input>
            </el-form-item>
          </el-form>
          <el-cascader-panel v-if="addType=='quick'" v-model="value" :options="defaultOptions" :props="props"></el-cascader-panel>
        </span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible_add2 = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('addForm','dialogMethod')">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog
        title="编辑权限"
        :visible.sync="dialogVisible_update"
        width="500px"
        @open="openDialog()"
        :before-close="handleClose">
        <span>
          <el-form label-width="100px">
            <el-form-item label="权限名称">
              <el-input style="width: 70%"></el-input>
            </el-form-item>
            <el-form-item label="路径">
              <el-input style="width: 70%"></el-input>
            </el-form-item>
            <el-form-item label="描述">
              <el-input type="textarea" style="width: 70%"></el-input>
            </el-form-item>
          </el-form>
        </span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible_update = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('addForm','dialogMethod')">确 定</el-button>
        </span>
    </el-dialog>
  </div>


</template>

<script>
import Axios from "@/utils/http";

export default {
  name: "index",
  data() {
    return {
      tableData: [],
      dialogVisible_add1:false,
      dialogVisible_add2:false,
      dialogVisible_update:false,
      expandRowKeys:[],
      addType:'custom',
      props:{
        multiple: true
      },
      value: [],
      defaultOptions: [{
        value: '1',
        label: '操作',
        children: [{
          value: '2',
          label: '增加',
        },
          {
            value: '3',
            label: '删除',
          },
          {
            value: '3',
            label: '修改',
          },
          {
            value: '3',
            label: '查找',
          }],
      }]
    }
  },
  created() {
    let _this = this
    Axios({
      url: "/permission/tree",
      method: 'get'
    }).then(res=>{
      console.log(res.data.data)
      if (res.data){
        _this.tableData = res.data.data
        for (let i = 0; i < res.data.data.length; i++){
          console.log(res.data.data[i].id)
          _this.expandRowKeys.push(res.data.data[i].id.toString())
        }
      } else {
        alert("访问此页面数据需要登录！")
        this.$store.commit("LOGIN_OUT");
        _this.$router.push({path:'/login'})
      }
    }).catch(err=>{
          alert("获取数据错误！")
    }
    )
  },
  methods: {
    handleDelete(row){
      console.log(typeof(row.children))
      let _this = this
      this.$confirm('此操作将永久删除该权限及子权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Axios({
          method:'post',
          url:'/permission/delete',
          data:row
        }).then(function (resp){
          if(resp.data){
            _this.$alert('删除成功！', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                location.reload()
              }
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    }
  }
}
</script>

<style scoped>

</style>
