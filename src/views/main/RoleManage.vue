<template>
  <div>
    <c-breadcrumb :items="breadcrumb"></c-breadcrumb>
    <div>
      <el-row type="flex" :gutter="10">
        <el-col :span="2"><span class="textspan">角色</span></el-col>
        <el-col :span="4">
          <el-input placeholder="请输入角色" v-model="roleinput" class="queryinput"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button>查询</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="openAddRoleDialog">添加</el-button>
        </el-col>
      </el-row>
      <div style="margin-top: 20px;">
        <el-table :data="roleData">
          <el-table-column type="index" label="#">
          </el-table-column>
          <el-table-column prop="name" label="角色">
          </el-table-column>
          <el-table-column inline-template :context="_self" fixed="right" label="操作" width="100">
          <span>
            <el-button @click="openDeleteRoleDialog(row)" type="text" size="small">删除</el-button>
          </span>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-dialog title="添加角色" v-model="addRoleFormVisible">
          <el-form :model="addRoleForm" ref="addRoleForm" :rules="formRules">
            <el-form-item label="角色名称" error="" prop="name" :label-width="formLabelWidth">
              <el-input v-model="addRoleForm.name" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addRoleFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmitAddRole" :loading="addRoleForm.isLoading">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div>
        <el-dialog title="删除" v-model="delRoleDialogVisible" size="tiny">
          <span>确定是要删除该角色吗</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="delRoleDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="delRoleDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import CBreadcrumb from '../../components/Breadcrumb'
import * as roleService from '../../services/role'
import RoleVO from '../../services/model/RoleVO'

export default {
  name: 'role-manage',
  data () {
    return {
      breadcrumb: [
        { label: '教师' },
        { label: '角色管理' }
      ],
      roleinput: '',
      roleData: [],
      roleDataLoading: true,
      addRoleFormVisible: false,
      addRoleForm: {
        name: '',
        isLoading: false
      },
      delRoleDialogVisible: false,
      delRoleId: '',
      formLabelWidth: '120px',
      formRules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { max: 60, message: '长度不能超过 60 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    roleService.getRoles(this.$store.state.account.userId).then(data => {
      this.roleDataLoading = false
      this.roleData = data
    }, err => {
      this.roleDataLoading = false
      this.$notify.error({
        title: '错误',
        message: err.message
      })
    })
  },
  methods: {
    openDeleteRoleDialog (currentRoleInfo) {
      this.delRoleDialogVisible = true
    },
    openAddRoleDialog () {
      this.addRoleForm.name = ''
      this.addRoleFormVisible = true
    },
    onSubmitAddRole () {
      this.$refs.addRoleForm.validate(valid => {
        if (valid) {
          this.addRoleForm.isLoading = true
          let args = [
            this.$store.state.account.userId,
            this.addRoleForm.name
          ]
          roleService.addRole(args).then(data => {
            this.addRoleFormVisible = false
            let role = new RoleVO()
            role.id = data
            role.name = this.addRoleForm.name
            this.roleData.push(role)
            this.addRoleForm.isLoading = false
          }, err => {
            this.$message.error(err.message)
            this.addRoleForm.isLoading = false
          })
        } else {
          return false
        }
      })
    }
  },
  components: {
    CBreadcrumb
  }
}
</script>

<style scoped>

</style>
