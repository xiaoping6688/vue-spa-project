<template>
  <div>
    <c-breadcrumb :items="breadcrumb"></c-breadcrumb>
    <div>
      <el-row type="flex" :gutter="10">
        <el-col :span="2">
          <span class="textspan">校区</span>
        </el-col>
        <el-col :span="4">
          <el-input placeholder="请输入校区" v-model="searchInput" class="queryinput"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button>查询</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="openAddCampusDialog">添加</el-button>
        </el-col>
      </el-row>
      <div style="margin-top: 20px;">
        <el-table :data="campusData" v-loading.body="campusDataLoading">
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column prop="name" label="校区"></el-table-column>
          <el-table-column inline-template :context="_self" fixed="right" label="操作" width="200">
            <span>
              <el-button @click="openAddSchoolDialog(row)" type="text" size="small">添加服务中心</el-button>
              <el-button @click="openDeleteCampusDialog(row)" type="text" size="small">删除</el-button>
            </span>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-dialog title="添加校区" v-model="addCampusDialogVisible">
          <el-form :model="addCampusForm" ref="addCampusForm" :rules="formRules">
            <el-form-item label="校区名称" error="" prop="name" :label-width="formLabelWidth">
              <el-input v-model="addCampusForm.name" auto-complete="on"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addCampusDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmitAddCampus" :loading="addCampusForm.isLoading">提 交</el-button>
          </div>
        </el-dialog>
      </div>
      <div>
        <el-dialog title="删除" v-model="delCampusDialogVisible" size="tiny">
          <span>确定是要删除该校区吗</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="delCampusDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="delCampusDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <div>
        <el-dialog title="添加服务中心" v-model="addSchoolDialogVisible">
          <el-form :model="addSchoolForm" ref="addSchoolForm" :rules="formRules">
            <el-form-item label="服务中心名称" error="" prop="name" :label-width="formLabelWidth">
              <el-input v-model="addSchoolForm.name" auto-complete="on"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addSchoolDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmitAddSchool" :loading="addSchoolForm.isLoading">提 交</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import CBreadcrumb from '../../components/Breadcrumb'
import * as campusService from '../../services/campus'
import CampusVO from '../../services/model/CampusVO'

export default {
  name: 'campus-manage',
  data () {
    return {
      breadcrumb: [
        { label: '机构' },
        { label: '校区管理' }
      ],
      searchInput: '',
      campusData: [],
      campusDataLoading: true,
      addCampusDialogVisible: false,
      addCampusForm: {
        name: '',
        isLoading: false
      },
      addSchoolDialogVisible: false,
      addSchoolForm: {
        campusId: '',
        name: '',
        isLoading: false
      },
      delCampusDialogVisible: false,
      delCampusId: '',
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
    campusService.getRegions(this.$store.state.account.userId).then(data => {
      this.campusDataLoading = false
      this.campusData = data
    }, err => {
      this.$notify.error({
        title: '错误',
        message: err.message
      })
      this.campusDataLoading = false
    })
  },
  methods: {
    openAddSchoolDialog (currentCampusInfo) {
      this.addSchoolForm.campusId = currentCampusInfo.id
      this.addSchoolForm.name = ''
      this.addSchoolForm.isLoading = false
      this.addSchoolDialogVisible = true
    },
    onSubmitAddSchool () {
      this.$refs.addSchoolForm.validate(valid => {
        if (valid) {
          this.addSchoolForm.isLoading = true
          let args = [
            this.$store.state.account.userId,
            this.addSchoolForm.campusId,
            this.addSchoolForm.name
          ]
          campusService.addSchool(args).then(res => {
            this.addSchoolDialogVisible = false
            this.$message({
              message: '服务中心添加成功',
              type: 'success'
            })
            this.addSchoolForm.isLoading = false
          }, err => {
            this.$message.error(err.message)
            this.addSchoolForm.isLoading = false
          })
        } else {
          return false
        }
      })
    },
    openDeleteCampusDialog (currentCampusInfo) {
      this.delCampusDialogVisible = true
    },
    openAddCampusDialog () {
      this.addCampusForm.name = ''
      this.addCampusForm.isLoading = false
      this.addCampusDialogVisible = true
    },
    onSubmitAddCampus () {
      this.$refs.addCampusForm.validate(valid => {
        if (valid) {
          this.addCampusForm.isLoading = true
          let args = [
            this.$store.state.account.userId,
            this.addCampusForm.name
          ]
          campusService.addRegion(args).then(data => {
            this.addCampusDialogVisible = false
            let campus = new CampusVO()
            campus.id = data
            campus.name = this.addCampusForm.name
            this.campusData.push(campus)
          }, err => {
            this.$message.error(err.message)
            this.addCampusForm.isLoading = false
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
