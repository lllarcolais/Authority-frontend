<template>
  <div>
    <el-row>
      <el-input v-model="search" placeholder="请输入姓名" style="width: 200px;margin-right: 10px" @keyup.enter.native="searchByName(search)"></el-input>
      <el-button type="primary" icon="el-icon-search"  @click="searchByName(search)">搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="dialogVisible_add = true" style="margin-left: 20px">新增</el-button>
    </el-row>

    <el-divider></el-divider>
    <el-table
        :data="tableData"

        style="width: 1000px">
      <el-table-column
          fixed
          prop="userId"
          label="编号"
          width="150"
          sortable>
      </el-table-column>
      <el-table-column
          prop="userName"
          label="姓名"
          width="120"
          sortable>
      </el-table-column>
      <el-table-column
          prop="roleName"
          label="角色"
          width="120">
      </el-table-column>
      <el-table-column
          prop="state"
          label="状态"
          width="120">
      </el-table-column>
      <el-table-column
          prop="lastLoginTime"
          label="上次登录时间"
          width="120">
      </el-table-column>

      <el-table-column
          fixed="right"
          label="操作[编辑用户/禁用/其它操作]"
          align="center"
          width="300">
        <template slot-scope="scope">
          <el-button size="mini" @click="dialogVisible_update = true;currentRow=scope.row">
            <i class="el-icon-edit"></i>
          </el-button>
          <el-button size="mini" @click="currentRow=scope.row">
            <i class="el-icon-lock"></i>
          </el-button>
          <el-dropdown style="margin-left: 20px">
              <span class="el-dropdown-link">
                <i class="el-icon-more"></i>
              </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item >
                <el-button type="text" @click="dialogVisible_role = true;currentRow=scope.row">角色定义</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button type="text" @click="dialogVisible_pwd = true;currentRow=scope.row">重置密码</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="margin-top: 30px">
      <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="query.pageNum"
          :page-size="query.pagesize"
          layout="prev, pager, next, jumper"
          :total=pageTotal>
      </el-pagination>
    </div>

    <el-dialog
        title="新增用户"
        :visible.sync="dialogVisible_add"
        width="500px"
        :before-close="handleClose">
        <span>
          <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="编号" prop="id">
              <el-input v-model="addForm.id" style="width: 70%"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="addForm.name" style="width: 70%"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <el-input v-model="addForm.pwd" style="width: 70%"></el-input>
            </el-form-item>
            <!--            <el-form-item>-->
            <!--              <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>-->
            <!--              <el-button @click="resetForm('ruleForm')">重置</el-button>-->
            <!--            </el-form-item>-->
          </el-form>
        </span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible_add = false">取 消</el-button>
          <el-button type="primary" @click="submitAddForm('addForm')">确 定</el-button>
        </span>
    </el-dialog>

    <el-dialog
        title="编辑用户"
        :visible.sync="dialogVisible_update"
        width="500px"
        @open="openDialog()"
        :before-close="handleClose">
        <span>
          <el-form :model="updateForm" :rules="rules" ref="updateForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="编号" prop="userId">
              <el-input v-model="updateForm.userId" style="width: 70%" disabled></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="userName">
              <el-input v-model="updateForm.userName" style="width: 70%"></el-input>
            </el-form-item>
            <!--            <el-form-item>-->
            <!--              <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>-->
            <!--              <el-button @click="resetForm('ruleForm')">重置</el-button>-->
            <!--            </el-form-item>-->
          </el-form>
        </span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible_update = false">取 消</el-button>
          <el-button type="primary" @click="submitUpdateForm('updateForm')">确 定</el-button>
        </span>
    </el-dialog>

    <el-dialog
        title="角色定义"
        :visible.sync="dialogVisible_role"
        width="500px"
        @open="openRole()"
        :before-close="handleClose">
        <span>
          <el-checkbox-group v-model="checkbox.currentRoles" >
            <el-checkbox :label="item"  v-for="item in checkbox.allRoles">{{item}}</el-checkbox>
          </el-checkbox-group>
        </span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible_role = false">取 消</el-button>
          <el-button type="primary" @click="submitRoleForm()">确 定</el-button>
        </span>
    </el-dialog>

    <el-dialog
        title="重置密码"
        :visible.sync="dialogVisible_pwd"
        width="500px"
        :before-close="handleClose">
        <span>

        </span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible_pwd = false">取 消</el-button>
          <el-button type="primary" @click="submitUpdateForm('updateForm')">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import Axios from "@/utils/http";

export default {
  name: "index",
  methods: {
    openDialog(){
      let _this = this
      _this.updateForm = this.currentRow
    },
    openRole() {
      // let _this = this
      // _this.checkList = []
      // _this.checkList.push(this.currentRow.roleId)
      this.checkbox.userId = this.currentRow.userId
      this.checkbox.currentRoles = []
      if (!!this.currentRow.roleName) {
        this.checkbox.currentRoles = this.currentRow.roleName.split(',')
      }
    },
    submitRoleForm(){
      let _this = this
      Axios({
        method: 'post',
        url: '/user/assignRole',
        data: this.checkbox
      }).then(function (resp){
        if (resp.data.code == "1"){
          _this.$alert('授权成功！', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              _this.dialogVisible_role = false;
              location.reload();
            }
          });
        } else {
          _this.$alert('授权失败！', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              _this.dialogVisible_role = false;
              location.reload();
            }
          });
        }
      })
    },
    submitAddForm(formName) {
      this.$refs[formName].validate((valid) => {
        let _this = this
        if (valid) {
          Axios({
            method:'post',
            url:'/user/add',
            data:this.addForm
          }).then(function (resp){
            if (resp.data){
              _this.$alert('添加成功！', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.dialogVisible_add = false;
                  location.reload();
                }
              });
            }
          })
        } else {
          _this.$alert('填写不符合规定！', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              // this.$router.replace('/');
            }
          });
          return false;
        }
      });
    },
    submitUpdateForm(formName){
      this.$refs[formName].validate((valid) => {
        let _this = this
        if (valid) {
          Axios({
            method:'put',
            url:'/user/update',
            data: {
              id: this.updateForm.userId,
              name: this.updateForm.userName
            },
            headers: {
              'Content-Type': "application/json;charset=UTF-8",
            }
          }).then(function (resp){
            if (resp.data){
              _this.$alert('修改成功！', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.dialogVisible_update = false;
                  location.reload();
                }
              });
            } else {
              _this.$alert('修改失败！', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.dialogVisible_update = false;
                }
              });
            }
          })
        } else {
          _this.$alert('填写不符合规定！', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              // this.$router.replace('/');
            }
          });
          return false;
        }
      });
    },
    handleUpdate(row) {
      this.$router.push('/update?id='+row.id)
    },
    handleAdd() {
      this.$router.push('/add')
    },
    handleDelete(row){
      let _this = this
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Axios({
          method:'delete',
          url:'http://localhost:8020/user/delete/'+row.id
        }).then(function (resp){
          console.log(resp.data)
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
    logout() {
      let _this = this
      axios.get("http://localhost:8020/logout").then(function (resp){
        if (resp.data) {
          alert("登出成功！")
          localStorage.clear()
          _this.$router.push({path:'/login'})
        } else {
          alert("登出失败！")
          _this.$router.push({path:'/login'})
        }
      })
    },
    getData(pageNum,pageSize){
      let _this = this
      this.token = localStorage.getItem("token")
      this.userName = localStorage.getItem("name")
      Axios({
        method: 'post',
        url: 'http://localhost:8020/user/index',
        headers: {
          'Content-Type': "application/json;charset=UTF-8",
        },
        data: {
          pageNum:pageNum,
          pagesize:pageSize
        }
      }).then(function(resp){
        if (resp.data){
          _this.tableData = resp.data.list
          _this.pageTotal = resp.data.total
          console.log(resp.data.list)
        } else {
          alert("访问此页面数据需要登录！")
          _this.$router.push({path:'/login'})
        }
      }).catch(err=>{
        alert("获取数据错误！")
      })

      Axios({
        method: 'get',
        url: '/role/roleName'
      }).then(function(resp){
        _this.checkbox.allRoles = resp.data
        console.log(_this.checkbox.allRoles)
      })
    },
    handleCurrentChange(value){
      this.query.pageNum = value;
      this.getData(this.query.pageNum,this.query.pagesize);
    },
    searchByName(name) {
      let _this = this
      this.token = localStorage.getItem("token")
      this.userName = localStorage.getItem("name")
      Axios({
        method: 'post',
        url: '/user/index/search',
        data: {
          name:name
        }
      }).then(function(resp){
        if (resp.data){
          _this.tableData = resp.data.list
          _this.pageTotal = resp.data.total
          console.log(resp.data.list)
        } else {
          alert("访问此页面数据需要登录！")
          _this.$router.push({path:'/login'})
        }
      }).catch(err=>{
        alert("获取数据错误！")
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    }
  },
  created() {
    this.getData(this.query.pageNum,this.query.pagesize)
  },
  data() {
    return {
      query:{
        pageNum:1,
        pagesize:5
      },
      pageTotal:0,
      tableData: [],
      userName: 'name',
      search: '',
      dialogVisible_add: false,
      dialogVisible_update: false,
      dialogVisible_pwd : false,
      currentRow:1,
      addForm: {
        id: '',
        name: '',
        pwd: ''
      },
      updateForm: {
        userId: '',
        userName: ''
      },
      dialogVisible_role : false,
      checkbox: {
        currentRoles: [],
        allRoles: [],
        userId: ''
      },
      rules: {
        userId: [
          { required: true, message: '请输入编号', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
