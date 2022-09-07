<template>
  <div>
    <el-row>
      <el-input v-model="search" placeholder="请输入姓名" style="width: 200px;margin-right: 20px" @keyup.enter.native="searchByName(search)"></el-input>
      <el-button type="primary" icon="el-icon-search" style="padding-left:10px" @click="searchByName(search)">搜索</el-button>
      <el-button type="primary" @click="dialogVisible_add = true">新增</el-button>
    </el-row>

    <el-divider></el-divider>
    <el-table
        :data="tableData"

        style="width: 600px">
      <el-table-column
          fixed
          prop="id"
          label="编号"
          width="150"
          sortable>
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名"
          width="120"
          sortable>
      </el-table-column>
      <el-table-column
          prop="pwd"
          label="密码"
          width="120">
      </el-table-column>

      <el-table-column
          fixed="right"
          label="操作"
          width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="dialogVisible_update = true;currentRow=scope.row">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
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
            <el-form-item label="编号" prop="id">
              <el-input v-model="updateForm.id" style="width: 70%"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="updateForm.name" style="width: 70%"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <el-input v-model="updateForm.pwd" style="width: 70%"></el-input>
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
      // Axios({
      //   method:'get',
      //   url:'/user/'+this.currentRow.id
      // }).then(function(resp){
      //   if (resp.data){
      //     _this.updateForm = resp.data
      //   } else {
      //     alert("访问此页面数据需要登录！")
      //     _this.$router.push({path:'/login'})
      //   }
      // }).catch(err=>{
      //   alert("获取数据错误！")
      // })
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
                  _this.dialogVisible = false;
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
            data:this.updateForm
          }).then(function (resp){
            if (resp.data){
              _this.$alert('修改成功！', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.dialogVisible = false;
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
        pagesize:3
      },
      pageTotal:0,
      tableData: [],
      userName: 'name',
      search: '',
      dialogVisible_add: false,
      dialogVisible_update: false,
      currentRow:1,
      addForm: {
        id: '',
        name: '',
        pwd: ''
      },
      updateForm: {
        id: '',
        name: '',
        pwd: ''
      },
      rules: {
        id: [
          { required: true, message: '请输入编号', trigger: 'blur' }
        ],
        name: [
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
