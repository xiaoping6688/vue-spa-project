<template>
  <div>
    <c-breadcrumb :items="breadcrumb"></c-breadcrumb>
    <div>
      <el-row type="flex" :gutter="10">
        <el-col :span="2"><span class="textspan">校区</span></el-col>
        <el-col :span="4">
          <el-select v-model="campusSelected" @change="onCampusSelected" placeholder="请选择校区">
            <el-option v-for="item in campusList" :label="item.name" :value="item.id" :key="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2"><span class="textspan">服务中心</span></el-col>
        <el-col :span="4">
          <el-select v-model="schoolSelected" placeholder="请选择服务中心">
            <el-option v-for="item in schoolList" :label="item.name" :value="item.id" :key="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2"><span class="textspan">教室</span></el-col>
        <el-col :span="4">
          <el-input placeholder="请输入教室" v-model="searchInput" class="queryinput"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button @click="queryClassrooms">查询</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="openAddClassroomDialog">添加</el-button>
        </el-col>
      </el-row>
      <div style="margin-top: 20px;">
        <el-table :data="classroomData" v-loading.body="classroomDataLoading" style="width: 100%">
          <el-table-column type="index" label="#">
          </el-table-column>
          <el-table-column prop="name" label="教室名称">
          </el-table-column>
          <el-table-column inline-template :context="_self" fixed="right" label="操作" width="100">
            <span>
              <el-button @click="openDeleteClassroomDialog(row)" type="text" size="small">删除</el-button>
            </span>
          </el-table-column>
        </el-table>
      </div>
        <div>
        <el-dialog title="添加教室" ref="addClassroomDialog">
          <el-form :model="addClassroomForm" ref="addClassroomForm" :rules="formRules">
            <el-form-item label="校区名称" prop="campusSelected" :label-width="formLabelWidth">
              <el-select v-model="addClassroomForm.campusSelected" @change="onFormCampusSelected" placeholder="请选择校区">
                <el-option v-for="item in campusList" :label="item.name" :value="item.id" :key="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="服务中心" prop="schoolSelected" :label-width="formLabelWidth">
              <el-select v-model="addClassroomForm.schoolSelected" placeholder="请选择服务中心">
                <el-option v-for="item in addClassroomForm.schoolList" :label="item.name" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="教室名称" prop="classroomName" :label-width="formLabelWidth">
              <el-input v-model="addClassroomForm.classroomName" auto-complete="on" placeholder="请输入教室名称"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetAddClassroomForm">重 置</el-button>
            <el-button type="primary" @click="onSubmitAddClassroom">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div>
        <el-dialog title="删除" v-model="delClassroomDialogVisible" size="tiny">
          <span>确定是要删除该教室吗</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="delClassroomDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="delClassroomDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import CBreadcrumb from '../../components/Breadcrumb'
import * as campusService from '../../services/campus'
import * as classroomService from '../../services/classroom'
import ClassroomVO from '../../services/model/ClassroomVO'

export default {
  name: 'classroom-manage',
  data () {
    return {
      breadcrumb: [
        { label: '机构' },
        { label: '教室管理' }
      ],
      searchInput: '',
      classroomData: [],
      classroomDataLoading: false,
      campusList: [],
      campusSelected: '',
      schoolList: [],
      schoolSelected: '',
      addClassroomForm: {
        campusSelected: '',
        schoolList: [],
        schoolSelected: '',
        classroomName: '',
        isLoading: false
      },
      delClassroomDialogVisible: false,
      formLabelWidth: '120px',
      formRules: {
        campusSelected: [
          { required: true, message: '请选择校区', trigger: 'change' }
        ],
        schoolSelected: [
          { required: true, message: '请选择服务中心', trigger: 'change' }
        ],
        classroomName: [
          { required: true, message: '请填写教室名称', trigger: 'blur' },
          { max: 60, message: '长度不能超过 60 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    campusService.getRegions(this.$store.state.account.userId).then(data => {
      this.campusList = data
    }, err => {
      this.$notify.error({
        title: '错误',
        message: err.message
      })
    })
  },
  methods: {
    openAddClassroomDialog () {
      this.addClassroomForm.isLoading = false
      this.$refs.addClassroomDialog.open()
    },
    resetAddClassroomForm () {
      this.$refs.addClassroomForm.resetFields()
    },
    openDeleteClassroomDialog (currentClassroomInfo) {
      this.delClassroomDialogVisible = true
    },
    onSubmitAddClassroom () {
      this.$refs.addClassroomForm.validate(valid => {
        if (valid) {
          this.addClassroomForm.isLoading = true
          let args = [
            this.$store.state.account.userId,
            this.addClassroomForm.campusSelected,
            this.addClassroomForm.schoolSelected,
            this.addClassroomForm.classroomName
          ]
          classroomService.addClassroom(args).then(data => {
            this.$refs.addClassroomDialog.close()
            let classroom = new ClassroomVO()
            classroom.id = data
            classroom.name = this.addClassroomForm.classroomName
            this.classroomData.push(classroom)
            this.addClassroomForm.isLoading = false
          }, err => {
            this.$message.error(err.message)
            this.addClassroomForm.isLoading = false
          })
        } else {
          return false
        }
      })
    },
    onCampusSelected (value) {
      if (value === '') return
      campusService.getSchools(value).then(data => {
        this.schoolList = data
      }, err => {
        this.$notify.error({
          title: '错误',
          message: err.message
        })
      })
    },
    onFormCampusSelected (value) {
      if (value === '') return
      campusService.getSchools(value).then(data => {
        this.addClassroomForm.schoolList = data
      }, err => {
        this.$notify.error({
          title: '错误',
          message: err.message
        })
      })
    },
    queryClassrooms () {
      if (!this.schoolSelected) {
        this.$message({
          message: '未选择服务中心',
          type: 'warning'
        })
        return false
      }

      this.classroomDataLoading = true
      classroomService.getClassrooms(this.schoolSelected).then(data => {
        this.classroomData = data
        this.classroomDataLoading = false
      }, err => {
        this.classroomDataLoading = false
        this.$message.error(err.message)
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
