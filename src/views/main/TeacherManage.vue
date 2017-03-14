<template>
  <div>
    <c-breadcrumb :items="breadcrumb"></c-breadcrumb>
    <div>
      <el-row type="flex" :gutter="10">
        <el-col :span="2"><span class="textspan">教师姓名</span></el-col>
        <el-col :span="4">
          <el-input placeholder="请输入教师姓名" v-model="searchInput" class="queryinput"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button>查询</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="openAddTeacherDialog">添加</el-button>
        </el-col>
      </el-row>
      <div style="margin-top: 20px;">
        <el-table :data="teacherData" style="width: 100%">
          <el-table-column type="index" label="#">
          </el-table-column>
          <el-table-column prop="teacherName" label="姓名">
          </el-table-column>
          <el-table-column prop="campusName" label="校区">
          </el-table-column>
          <el-table-column prop="roleName" label="角色">
          </el-table-column>
          <el-table-column prop="mobile" label="电话">
          </el-table-column>
          <el-table-column prop="subjectName" label="科目">
          </el-table-column>
          <el-table-column inline-template :context="_self" fixed="right" label="操作" width="100">
            <span>
              <el-button @click="openEditTeacherDialog(row)" type="text" size="small">编辑</el-button>
              <el-button @click="openDeleteTeacherDialog(row)" type="text" size="small">删除</el-button>
            </span>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-dialog title="添加教师" v-model="addTeacherDialogVisible">
          <el-form :model="addTeacherForm">
            <el-row>
            <el-col :span="8">
            <el-form-item label="校区" :label-width="formLabelWidth">
            <el-select v-model="addTeacherForm.campusSelected" placeholder="请选择校区">
              <el-option v-for="item in addTeacherForm.campusList" :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="年级" :label-width="formLabelWidth">
            <el-select v-model="addTeacherForm.gradeSelected" placeholder="请选择年级">
              <el-option v-for="item in addTeacherForm.gradeList" :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          </el-col>
          </el-row>
          <el-row>
          <el-col :span="8">
            <el-form-item label="科目" :label-width="formLabelWidth">
            <el-select v-model="addTeacherForm.subjectSelected" placeholder="请选择科目">
            <el-option v-for="item in addTeacherForm.subjectList" :label="item.name" :value="item.id" :key="item.id">
            </el-option>
          </el-select>
          </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="角色" :label-width="formLabelWidth">
            <el-select v-model="addTeacherForm.roleSelected" placeholder="请选择角色">
            <el-option v-for="item in addTeacherForm.roleList" :label="item.name" :value="item.id" :key="item.id">
            </el-option>
          </el-select>
          </el-form-item>
          </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
            <el-form-item label="教师姓名" :label-width="formLabelWidth">
              <el-input v-model="addTeacherForm.name" auto-complete="on"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="教师电话" :label-width="formLabelWidth">
              <el-input v-model="addTeacherForm.phone" auto-complete="on"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="邮箱" :label-width="formLabelWidth">
              <el-input v-model="addTeacherForm.email" auto-complete="on"></el-input>
            </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-radio class="radio" v-model="addTeacherForm.gender" label="1">男</el-radio>
              <el-radio class="radio" v-model="addTeacherForm.gender" label="2">女</el-radio>
            </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="全职兼职" :label-width="formLabelWidth">
                <el-radio class="radio" v-model="addTeacherForm.worktype" label="1">全职</el-radio>
                <el-radio class="radio" v-model="addTeacherForm.worktype" label="2">兼职</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="简介" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="addTeacherForm.introduction"></el-input>
          </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addTeacherDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmitAddTeacher">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div>
        <el-dialog title="删除" v-model="delTeacherDialogVisible" size="tiny">
          <span>确定是要删除该教师吗</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="delTeacherDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="delTeacherDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import CBreadcrumb from '../../components/Breadcrumb'
import * as teacherService from '../../services/teacher'
import * as campusService from '../../services/campus'
import * as commonService from '../../services/common'
import * as subjectService from '../../services/subject'
import * as roleService from '../../services/role'
import TeacherVO from '../../services/model/TeacherVO'
import { findNameById } from '../../utils/util'

export default {
  name: 'teacher-manage',
  data () {
    return {
      breadcrumb: [
        { label: '教师' },
        { label: '教师管理' }
      ],
      searchInput: '',
      teacherData: [],
      addTeacherForm: {
        campusList: [],
        campusSelected: '',
        gradeList: [],
        gradeSelected: '',
        subjectList: [],
        subjectSelected: '',
        roleList: [],
        roleSelected: '',
        name: '',
        phone: '',
        email: '',
        gender: '1',
        worktype: '1',
        introduction: '',
        isLoading: false
      },
      addTeacherDialogVisible: false,
      delTeacherDialogVisible: false,
      formLabelWidth: '80px'
    }
  },
  created () {
    teacherService.getTeachers(this.$store.state.account.userId).then(data => {
      this.teacherData = data
    }, err => {
      this.$notify.error({
        title: '错误',
        message: err.message
      })
    })

    campusService.getRegions(this.$store.state.account.userId).then(data => {
      this.addTeacherForm.campusList = data
    }, err => {
      this.$notify.error({
        title: '错误',
        message: err.message
      })
    })

    commonService.getGrades(this.$store.state.account.userId).then(data => {
      this.addTeacherForm.gradeList = data
    }, err => {
      this.$notify.error({
        title: '错误',
        message: err.message
      })
    })

    subjectService.getSubjects(this.$store.state.account.userId).then(data => {
      this.addTeacherForm.subjectList = data
    }, err => {
      this.$notify.error({
        title: '错误',
        message: err.message
      })
    })

    roleService.getRoles(this.$store.state.account.userId).then(data => {
      this.addTeacherForm.roleList = data
    }, err => {
      this.$notify.error({
        title: '错误',
        message: err.message
      })
    })
  },
  methods: {
    openDeleteTeacherDialog (currentClassroomInfo) {
      this.delTeacherDialogVisible = true
    },
    openAddTeacherDialog () {
      this.addTeacherForm.campusSelected = ''
      this.addTeacherForm.gradeSelected = ''
      this.addTeacherForm.subjectSelected = ''
      this.addTeacherForm.roleSelected = ''
      this.addTeacherForm.name = ''
      this.addTeacherForm.phone = ''
      this.addTeacherForm.email = ''
      this.addTeacherForm.gender = '1'
      this.addTeacherForm.worktype = '1'
      this.addTeacherForm.introduction = ''
      this.addTeacherForm.isLoading = false
      this.addTeacherDialogVisible = true
    },
    onSubmitAddTeacher () {
      this.addTeacherForm.isLoading = true

      let args = [
        this.addTeacherForm.campusSelected,
        this.addTeacherForm.introduction,
        this.addTeacherForm.gradeSelected,
        this.addTeacherForm.worktype,
        this.$store.state.account.userId,
        this.addTeacherForm.roleSelected,
        this.addTeacherForm.subjectSelected,
        this.addTeacherForm.email,
        this.addTeacherForm.phone,
        this.addTeacherForm.name,
        this.addTeacherForm.gender
      ]

      teacherService.addTeacher(args).then(data => {
        let teacher = new TeacherVO()
        teacher.teacherId = data
        teacher.teacherName = this.addTeacherForm.name
        teacher.mobile = this.addTeacherForm.phone
        teacher.roleName = findNameById(this.addTeacherForm.roleList, this.addTeacherForm.roleSelected)
        teacher.subjectName = findNameById(this.addTeacherForm.subjectList, this.addTeacherForm.subjectSelected)
        teacher.campusName = findNameById(this.addTeacherForm.campusList, this.addTeacherForm.campusSelected)

        this.teacherData.push(teacher)

        this.addTeacherDialogVisible = false
        this.addTeacherForm.isLoading = false
      }, err => {
        this.$message.error(err.message)
        this.addTeacherForm.isLoading = false
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
