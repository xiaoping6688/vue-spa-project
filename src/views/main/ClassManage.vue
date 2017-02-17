<template>
  <div>
    <c-breadcrumb :items="breadcrumb"></c-breadcrumb>
    <div>
      <div style="margin-top: 20px;">
        <el-row>
          <el-col :span="2"><span class="textspan">校区</span></el-col>
          <el-col :span="4">
            <el-select v-model="campusSelected" placeholder="请选择校区">
              <el-option v-for="item in campusList" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2"><span class="textspan">年份</span></el-col>
          <el-col :span="4">
            <el-select v-model="yearSelected" placeholder="请选择年份">
              <el-option v-for="item in yearList" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2"><span class="textspan">学期</span></el-col>
          <el-col :span="4">
            <el-select v-model="termSelected" placeholder="请选择学期">
              <el-option v-for="item in termList" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2"><span class="textspan">年级</span></el-col>
          <el-col :span="4">
            <el-select v-model="gradeSelected" placeholder="请选择年级">
              <el-option v-for="item in gradeList" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px;">
        <el-row>
          <el-col :span="2"><span class="textspan">科目</span></el-col>
          <el-col :span="4">
            <el-select v-model="subjectSelected" @change="onSubjectSelected" placeholder="请选择科目">
              <el-option v-for="item in subjectList" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2"><span class="textspan">班型</span></el-col>
          <el-col :span="4">
            <el-select v-model="classTypeSelected" @change="onClassTypeSelected" placeholder="请选择班型">
              <el-option v-for="item in classTypeList" :label="item.classTypeName" :value="item.classTypeId">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2"><span class="textspan">主讲</span></el-col>
          <el-col :span="4">
            <el-select v-model="masterSelected" placeholder="请选择主讲">
              <el-option v-for="item in masterList" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px;">
        <el-row>
          <el-col :span="2"><span class="textspan">开课时间</span></el-col>
          <el-col :span="4">
            <el-date-picker v-model="beginDate" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-col>
          <el-col :span="4">
            <el-date-picker v-model="endDate" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-col>
          <el-col :span="2">
            <el-button @click="queryClasses">查询</el-button>
          </el-col>
          <el-col :span="2">
            <el-button @click="openAddClassDialog">添加</el-button>
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px;">
        <el-table :data="classData" style="width: 100%" v-loading="classDataLoading">
          <el-table-column type="index" label="#">
          </el-table-column>
          <el-table-column prop="className" label="班次">
          </el-table-column>
          <el-table-column prop="masterTchName" label="主讲老师">
          </el-table-column>
          <el-table-column prop="stuNum" label="班级人数">
          </el-table-column>
          <el-table-column prop="totalNum" label="课次数">
          </el-table-column>
          <el-table-column prop="chargeStandard" label="费用">
          </el-table-column>
          <el-table-column prop="startDate" label="开课时间">
          </el-table-column>
          <el-table-column inline-template :context="_self" fixed="right" label="操作" width="100">
            <span>
            <el-button @click="addClassDialogVisible = true" type="text" size="small">编辑</el-button>
                    <el-button @click="delClassDialogVisible = true" type="text" size="small">删除</el-button>
                  </span>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-dialog title="添加班级" v-model="addClassDialogVisible" size="large">
          <el-form :model="addClassForm" ref="addClassForm">
            <div>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="校区名称" :label-width="formLabelWidth">
                    <el-select v-model="addClassForm.campusSelected" @change="onCampusSelected" placeholder="请选择校区">
                      <el-option v-for="item in campusList" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="年份" :label-width="formLabelWidth">
                    <el-select v-model="addClassForm.yearSelected" placeholder="请选择年份">
                      <el-option v-for="item in yearList" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="学期" :label-width="formLabelWidth">
                    <el-select v-model="addClassForm.termSelected" placeholder="请选择学期">
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
                    <el-select v-model="addClassForm.gradeSelected" placeholder="请选择年级">
                      <el-option v-for="item in gradeList" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="科目" :label-width="formLabelWidth">
                    <el-select v-model="addClassForm.subjectSelected" @change="onSubjectSelected" placeholder="请选择科目">
                      <el-option v-for="item in subjectList" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="班型" :label-width="formLabelWidth">
                    <el-select v-model="addClassForm.classTypeSelected" @change="onClassTypeSelected" placeholder="请选择班型">
                      <el-option v-for="item in classTypeList" :label="item.classTypeName" :value="item.classTypeId">
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
                    <el-select v-model="addClassForm.courseSelected" placeholder="请选择课程">
                      <el-option v-for="item in addClassForm.courseList" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="主讲" :label-width="formLabelWidth">
                    <el-select v-model="addClassForm.masterSelected" placeholder="请选择主讲">
                      <el-option v-for="item in masterList" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="角色" :label-width="formLabelWidth">
                    <el-select v-model="addClassForm.roleSelected" @change="onRoleSelected" placeholder="请选择角色">
                      <el-option v-for="item in addClassForm.roleList" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="辅导老师" :label-width="formLabelWidth">
                    <el-select v-model="addClassForm.counselorSelected" placeholder="请选择辅导老师">
                      <el-option v-for="item in addClassForm.counselorList" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="规划师" :label-width="formLabelWidth">
                    <el-select v-model="addClassForm.plannerSelected" placeholder="请选择规划师">
                      <el-option v-for="item in addClassForm.plannerList" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="学生人数" :label-width="formLabelWidth">
                    <el-input v-model="addClassForm.studentNum" auto-complete="off" placeholder="请输入学生人数"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="课次数" :label-width="formLabelWidth">
                    <el-input v-model="addClassForm.coursesNum" auto-complete="off" placeholder="请输入课次数"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="价格" :label-width="formLabelWidth">
                    <el-input v-model="addClassForm.price" auto-complete="off" placeholder="请输入价格"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="开课时间" :label-width="formLabelWidth">
                    <el-date-picker v-model="addClassForm.beginDate" type="date" placeholder="选择开课日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="结课时间" :label-width="formLabelWidth">
                    <el-date-picker v-model="addClassForm.endDate" type="date" placeholder="选择结课日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="上课时间" :label-width="formLabelWidth">
                    <el-time-picker v-model="addClassForm.schoolTime" format="HH:mm:ss" placeholder="选择上课时间">
                    </el-time-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="下课时间" :label-width="formLabelWidth">
                    <el-time-picker v-model="addClassForm.quittingTime" format="HH:mm:ss" placeholder="选择下课时间">
                    </el-time-picker>
                  </el-form-item>
                </el-col>

              </el-row>
            </div>
            <div>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="服务中心" :label-width="formLabelWidth">
                    <el-select v-model="addClassForm.schoolSelected" @change="onSchoolSelected" placeholder="请选择服务中心">
                      <el-option v-for="item in addClassForm.schoolList" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="教室" :label-width="formLabelWidth">
                    <el-select v-model="addClassForm.classroomSelected" placeholder="请选择教室">
                      <el-option v-for="item in addClassForm.classroomList" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

              </el-row>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetAddClassForm">重 置</el-button>
            <el-button type="primary" @click="onSubmitAddClass">确 定</el-button>
          </div>
        </el-dialog>

      </div>
      <div>
        <el-dialog title="删除" v-model="delClassDialogVisible" size="tiny">
          <span>确定是要删除该班次吗</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="delClassDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="delClassDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import CBreadcrumb from '../../components/Breadcrumb'
import * as campusService from '../../services/campus'
import * as commonService from '../../services/common'
import * as subjectService from '../../services/subject'
import * as classtypeService from '../../services/classtype'
import * as roleService from '../../services/role'
import * as classService from '../../services/class'
import * as courseService from '../../services/course'
import * as classroomService from '../../services/classroom'
import ClassVO from '../../services/model/ClassVO'
import { findNameById } from '../../utils/util'

export default {
  name: 'class-manage',
  data () {
    return {
      breadcrumb: [
        { label: '班级' },
        { label: '班级管理' }
      ],
      classData: [],
      classDataLoading: false,
      campusList: [],
      campusSelected: '',
      yearList: [],
      yearSelected: '',
      termList: [],
      termSelected: '',
      gradeList: [],
      gradeSelected: '',
      subjectList: [],
      subjectSelected: '',
      classTypeList: [],
      classTypeSelected: '',
      masterList: [],
      masterSelected: '',
      beginDate: '',
      endDate: '',
      addClassDialogVisible: false,
      addClassForm: {
        campusSelected: '',
        yearSelected: '',
        termSelected: '',
        gradeSelected: '',
        subjectSelected: '',
        classTypeSelected: '',
        roleList: [],
        roleSelected: '',
        courseList: [],
        courseSelected: '',
        masterSelected: '',
        counselorList: [],
        counselorSelected: '',
        plannerList: [],
        plannerSelected: '',
        studentNum: 0,
        coursesNum: 0,
        beginDate: '',
        endDate: '',
        price: 0,
        schoolTime: '',
        quittingTime: '',
        schoolList: [],
        schoolSelected: '',
        classroomList: [],
        classroomSelected: '',
        isLoading: false
      },
      delClassDialogVisible: false,
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

    commonService.getYears(this.$store.state.account.userId).then(data => {
      this.yearList = data
    }, msg => {
      this.$notify.error({
        title: '错误',
        message: msg
      })
    })

    commonService.getTerms(this.$store.state.account.userId).then(data => {
      this.termList = data
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

    subjectService.getSubjects(this.$store.state.account.userId).then(data => {
      this.subjectList = data
    }, msg => {
      this.$notify.error({
        title: '错误',
        message: msg
      })
    })
  },
  methods: {
    resetAddClassForm () {
      this.$refs.addClassForm.resetFields()
    },
    openAddClassDialog () {
      this.addClassForm.isLoading = false
      this.addClassDialogVisible = true

      if (this.addClassForm.roleList.length <= 0) {
        roleService.getRoles(this.$store.state.account.userId).then(data => {
          this.addClassForm.roleList = data
        }, msg => {
          this.$notify.error({
            title: '错误',
            message: msg
          })
        })
      }
    },
    onSubmitAddClass () {
      this.addClassForm.isLoading = true
      let args = [
        this.addClassForm.campusSelected,
        this.addClassForm.price,
        this.addClassForm.classTypeSelected,
        this.addClassForm.courseSelected,
        this.addClassForm.endDate,
        this.addClassForm.gradeSelected,
        this.addClassForm.schoolTime,
        this.$store.state.account.userId,
        this.addClassForm.quittingTime,
        this.addClassForm.plannerSelected,
        this.addClassForm.schoolSelected,
        this.addClassForm.classroomSelected,
        this.addClassForm.beginDate,
        this.addClassForm.studentNum,
        this.addClassForm.subjectSelected,
        this.addClassForm.masterSelected,
        this.addClassForm.termSelected,
        this.addClassForm.coursesNum,
        this.addClassForm.counselorSelected,
        this.addClassForm.yearSelected
      ]
      classService.addClass(args).then(data => {
        this.addClassDialogVisible = false
        let classObj = new ClassVO()
        classObj.classId = data
        classObj.className = findNameById(this.classTypeList, this.addClassForm.classTypeSelected)
        classObj.chargeStandard = this.addClassForm.price
        classObj.masterTchName = findNameById(this.masterList, this.addClassForm.masterSelected)
        classObj.startDate = this.addClassForm.beginDate
        classObj.stuNum = this.addClassForm.studentNum
        classObj.totalNum = this.addClassForm.coursesNum
        this.classData.push(classObj)
        this.addClassForm.isLoading = false
      }, msg => {
        this.$message.error(msg)
        this.addClassForm.isLoading = false
      })
    },
    onCampusSelected (value) {
      if (value === '') return

      campusService.getSchools(value).then(data => {
        this.addClassForm.schoolList = data
      }, msg => {
        this.$notify.error({
          title: '错误',
          message: msg
        })
      })
    },
    onSchoolSelected (value) {
      if (value === '') return

      classroomService.getClassrooms(value).then(data => {
        this.addClassForm.classroomList = data
      }, msg => {
        this.$notify.error({
          title: '错误',
          message: msg
        })
      })
    },
    onRoleSelected (value) {
      if (value === '') return
      let args = [
        this.addClassForm.campusSelected,
        this.addClassForm.gradeSelected,
        value,
        this.addClassForm.subjectSelected
      ]
      classService.getCounselors(args).then(data => {
        this.addClassForm.counselorList = data
      }, msg => {
        this.$notify.error({
          title: '错误',
          message: msg
        })
      })
    },
    onSubjectSelected (value) {
      if (value === '') return

      classtypeService.getClassTypes(value).then(data => {
        this.classTypeList = data
      }, msg => {
        this.$notify.error({
          title: '错误',
          message: msg
        })
      })

      courseService.getCourses(value).then(data => {
        this.addClassForm.courseList = data
      }, msg => {
        this.$notify.error({
          title: '错误',
          message: msg
        })
      })
    },
    onClassTypeSelected (value) {
      if (value === '') return
      let args = [
        this.addClassForm.campusSelected,
        value,
        this.addClassForm.gradeSelected,
        this.addClassForm.subjectSelected,
        this.addClassForm.termSelected,
        this.addClassForm.yearSelected
      ]
      classService.getMasterTeachers(args).then(data => {
        this.masterList = data
      }, msg => {
        this.$notify.error({
          title: '错误',
          message: msg
        })
      })
    },
    queryClasses () {
      this.classDataLoading = true
      let args = [
        this.campusSelected,
        this.classTypeSelected,
        this.endDate,
        this.gradeSelected,
        this.$store.state.account.userId,
        this.beginDate,
        this.subjectSelected,
        this.masterSelected,
        this.termSelected,
        this.yearSelected
      ]
      classService.getClasses(args).then(data => {
        this.classData = data
        this.classDataLoading = false
      }, msg => {
        this.classDataLoading = false
        this.$message.error(msg)
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