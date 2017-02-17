<template>
  <div>
    <c-breadcrumb :items="breadcrumb"></c-breadcrumb>
    <div>
      <el-row>
        <el-col :span="2"><span class="textspan">学员编号</span></el-col>
        <el-col :span="4">
          <el-input placeholder="请输入学员编号" v-model="searchNumber" class="queryinput"></el-input>
        </el-col>
        <el-col :span="2"><span class="textspan">学生姓名</span></el-col>
        <el-col :span="4">
          <el-input placeholder="请输入学生姓名" v-model="searchName" class="queryinput"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button @click="queryStudents">查询</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="openAddStudentDialog">添加</el-button>
        </el-col>
      </el-row>
      <div style="margin-top: 20px;">
        <el-table :data="studentData" style="width: 100%" v-loading="studentDataLoading">
          <el-table-column type="index" label="#">
          </el-table-column>
          <el-table-column prop="stuName" label="学员姓名">
          </el-table-column>
          <el-table-column prop="stuNum" label="学员编号">
          </el-table-column>
          <el-table-column prop="parentMobile" label="家长手机">
          </el-table-column>
          <el-table-column prop="gradeName" label="年级">
          </el-table-column>
          <el-table-column prop="school" label="就读院校">
          </el-table-column>
          <el-table-column prop="campusName" label="所在校区">
          </el-table-column>
          <el-table-column inline-template :context="_self" fixed="right" label="操作" width="160">
            <span>
              <el-button @click="addStudentDialogVisible = true" type="text" size="small">编辑</el-button>
              <el-button @click="purchaseDialogVisible = true" type="text" size="small">购买</el-button>
              <el-button @click="delStudentDialogVisible = true" type="text" size="small">删除</el-button>
            </span>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-dialog title="添加学生" v-model="addStudentDialogVisible" size="small">
          <el-form :model="addStudentForm">
            <el-row>
            <el-col :span="8">
            <el-form-item label="学生姓名" :label-width="formLabelWidth">
              <el-input v-model="addStudentForm.name" auto-complete="on"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="校区" :label-width="formLabelWidth">
            <el-select v-model="addStudentForm.campusSelected" placeholder="请选择校区">
            <el-option v-for="item in campusList" :label="item.name" :value="item.id">
            </el-option>
              </el-select>
          </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所在年级" :label-width="formLabelWidth">
            <el-select v-model="addStudentForm.gradeSelected" placeholder="请选择年级">
            <el-option v-for="item in gradeList" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
          </el-form-item>
          </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
            <el-form-item label="家长电话" :label-width="formLabelWidth">
              <el-radio class="radio" v-model="addStudentForm.parentRole" label="1">父亲</el-radio>
              <el-radio class="radio" v-model="addStudentForm.parentRole" label="2">母亲</el-radio>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-input v-model="addStudentForm.parentPhone" auto-complete="off"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-radio class="radio" v-model="addStudentForm.gender" label="1">男</el-radio>
              <el-radio class="radio" v-model="addStudentForm.gender" label="2">女</el-radio>
            </el-form-item>
            </el-col>
            <el-col :span="8">
            <el-form-item label="就读院校" :label-width="formLabelWidth">
              <el-input v-model="addStudentForm.school" auto-complete="on"></el-input>
            </el-form-item>
            </el-col>
          </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addStudentDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmitAddStudent">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div>
        <el-dialog title="删除" v-model="delStudentDialogVisible" size="tiny">
          <span>确定是要删除该学生吗</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="delStudentDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="delStudentDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <div>
        <el-dialog title="购买课程" v-model="purchaseConfirmDialogVisible" size="tiny">
          <span>确定是要购买该课程吗</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="purchaseConfirmDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="purchaseConfirmDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <div>
        <el-dialog title="购买课程" v-model="purchaseDialogVisible" size="large">
          <el-form :model="purchaseForm">
            <div>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="校区名称" :label-width="formLabelWidth">
                    <el-select v-model="purchaseForm.campusSelected" placeholder="请选择校区">
                      <el-option v-for="item in campusList" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="年份" :label-width="formLabelWidth">
                    <el-select v-model="purchaseForm.yearSelected" placeholder="请选择年份">
                      <el-option v-for="item in yearList" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="学期" :label-width="formLabelWidth">
                    <el-select v-model="purchaseForm.termSelected" placeholder="请选择学期">
                      <el-option v-for="item in termList" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="年级" :label-width="formLabelWidth">
                    <el-select v-model="purchaseForm.gradeSelected" placeholder="请选择年级">
                      <el-option v-for="item in gradeList" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="科目" :label-width="formLabelWidth">
                    <el-select v-model="purchaseForm.subjectSelected" placeholder="请选择科目">
                      <el-option v-for="item in subjectList" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="班型" :label-width="formLabelWidth">
                    <el-select v-model="purchaseForm.classTypeSelected" placeholder="请选择班型">
                      <el-option v-for="item in classTypeList" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="课程" :label-width="formLabelWidth">
                    <el-select v-model="purchaseForm.courseSelected" placeholder="请选择课程">
                      <el-option v-for="item in courseList" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="主讲" :label-width="formLabelWidth">
                    <el-select v-model="purchaseForm.teacherSelected" placeholder="请选择主讲">
                      <el-option v-for="item in teacherList" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="开课时间" :label-width="formLabelWidth">
                    <el-date-picker v-model="purchaseForm.beginDate" type="date" placeholder="选择开课日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="------" :label-width="formLabelWidth">
                    <el-date-picker v-model="purchaseForm.endDate" type="date" placeholder="选择开课日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <el-button @click="queryTableVisible = true">查询</el-button>
                </el-col>
              </el-row>
            </div>
          </el-form>
          <el-table :data="purchaseData" style="width: 100%" v-model="queryTableVisible">
          <el-table-column type="index" label="#">
          </el-table-column>
          <el-table-column prop="classorder" label="班次">
          </el-table-column>
          <el-table-column prop="teacher" label="主讲老师">
          </el-table-column>
          <el-table-column prop="classpeoplenum" label="班级人数">
          </el-table-column>
          <el-table-column prop="lessonnum" label="课次数">
          </el-table-column>
          <el-table-column prop="cost" label="费用">
          </el-table-column>
          <el-table-column prop="classopentime" label="开课时间">
          </el-table-column>
          <el-table-column inline-template :context="_self" fixed="right" label="操作" width="100">
            <span>
              <el-button @click="purDialogVisible = true" type="text" size="small">购买</el-button>
            </span>
          </el-table-column>
        </el-table>
          <div slot="footer" class="dialog-footer">
            <el-button @click="purFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="purFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import CBreadcrumb from '../../components/Breadcrumb'
import * as campusService from '../../services/campus'
import * as commonService from '../../services/common'
import * as studentService from '../../services/student'
import StudentVO from '../../services/model/StudentVO'
import { findNameById } from '../../utils/util'

export default {
  name: 'student-manage',
  data () {
    return {
      breadcrumb: [
        { label: '学生' },
        { label: '学生管理' }
      ],
      searchNumber: '',
      searchName: '',
      studentData: [],
      studentDataLoading: false,
      purchaseData: [],
      campusList: [],
      gradeList: [],
      subjectList: [],
      yearList: [],
      termList: [],
      classTypeList: [],
      courseList: [],
      teacherList: [],
      addStudentDialogVisible: false,
      addStudentForm: {
        name: '',
        gender: '1',
        school: '',
        campusSelected: '',
        gradeSelected: '',
        parentRole: '',
        parentPhone: '',
        isLoading: false
      },
      purchaseForm: {
        yearSelected: '',
        termSelected: '',
        campusSelected: '',
        gradeSelected: '',
        subjectSelected: '',
        classTypeSelected: '',
        courseSelected: '',
        teacherSelected: '',
        beginDate: '',
        endDate: ''
      },
      purchaseDialogVisible: false,
      purchaseConfirmDialogVisible: false,
      delStudentDialogVisible: false,
      queryTableVisible: false,
      formLabelWidth: '80px'
    }
  },
  created () {
    campusService.getRegions(this.$store.state.account.userId).then(data => {
      this.campusList = data
    }, msg => {
      this.$notify.error({
        title: '错误',
        message: msg
      })
    })

    commonService.getGrades(this.$store.state.account.userId).then(data => {
      this.gradeList = data
    }, msg => {
      this.$notify.error({
        title: '错误',
        message: msg
      })
    })
  },
  methods: {
    openAddStudentDialog () {
      this.addStudentForm.campusSelected = ''
      this.addStudentForm.gradeSelected = ''
      this.addStudentForm.name = ''
      this.addStudentForm.gender = '1'
      this.addStudentForm.school = ''
      this.addStudentForm.parentRole = '1'
      this.addStudentForm.parentPhone = ''
      this.addStudentForm.isLoading = false
      this.addStudentDialogVisible = true
    },
    onSubmitAddStudent () {
      this.addStudentForm.isLoading = true

      let args = [
        this.$store.state.account.userId,
        this.addStudentForm.campusSelected,
        this.addStudentForm.gradeSelected,
        this.addStudentForm.parentPhone,
        this.addStudentForm.parentRole,
        this.addStudentForm.school,
        this.addStudentForm.name,
        this.addStudentForm.gender
      ]

      studentService.addStudent(args).then(data => {
        let student = new StudentVO()
        student.stuId = data
        student.stuName = this.addStudentForm.name
        student.stuNum = ''
        student.school = this.addStudentForm.school
        student.gradeName = findNameById(this.gradeList, this.addStudentForm.gradeSelected)
        student.parentMobile = this.addStudentForm.parentPhone
        student.campusName = findNameById(this.campusList, this.addStudentForm.campusSelected)

        this.studentData.push(student)

        this.addStudentDialogVisible = false
        this.addStudentForm.isLoading = false
      }, msg => {
        this.$message.error(msg)
        this.addStudentForm.isLoading = false
      })
    },
    queryStudents () {
      // this.studentDataLoading = true
      // let args = [
      //   this.campusSelected,
      //   this.gradeSelected
      // ]
      // studentService.getStudents(args).then(data => {
      //   this.studentData = data
      //   this.studentDataLoading = false
      // }, msg => {
      //   this.studentDataLoading = false
      //   this.$message.error(msg)
      // })
    }
  },
  components: {
    CBreadcrumb
  }
}
</script>

<style scoped>

</style>