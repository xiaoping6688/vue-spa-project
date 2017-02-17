<template>
  <div>
    <c-breadcrumb :items="breadcrumb"></c-breadcrumb>
    <div>
      <el-row>
        <el-col :span="2"><span class="textspan">科目</span></el-col>
        <el-col :span="4">
          <el-select v-model="subjectSelected" placeholder="请选择科目">
            <el-option v-for="item in subjectList" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2"><span class="textspan">课程</span></el-col>
        <el-col :span="4">
          <el-input placeholder="请输入课程" v-model="searchInput" class="queryinput"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button @click="queryCourses">查询</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="openAddCourseForm">添加</el-button>
        </el-col>
      </el-row>
      <div style="margin-top: 20px;">
        <el-table :data="courseData" v-loading.body="courseDataLoading">
          <el-table-column type="index" label="#">
          </el-table-column>
          <el-table-column prop="name" label="课程">
          </el-table-column>
          <el-table-column prop="desc" label="描述">
          </el-table-column>
          <el-table-column inline-template :context="_self" fixed="right" label="操作" width="100">
            <span>
            <el-button @click="openAddCourseForm" type="text" size="small">编辑</el-button>
            <el-button @click="openDeleteCourseDialog(row)" type="text" size="small">删除</el-button>
          </span>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-dialog title="添加课程" v-model="addCourseDialogVisible">
          <el-form :model="addCourseForm" ref="addCourseForm">
            <el-form-item label="科目" prop="subjectSelected" :label-width="formLabelWidth">
              <el-select v-model="addCourseForm.subjectSelected">
                <el-option v-for="item in subjectList" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="课程名称" prop="courseName" :label-width="formLabelWidth">
              <el-input v-model="addCourseForm.courseName" auto-complete="off" placeholder="请输入课程名称"></el-input>
            </el-form-item>
            <el-form-item label="课程描述" prop="courseDesc" :label-width="formLabelWidth">
              <el-input v-model="addCourseForm.courseDesc" auto-complete="off" placeholder="请输入课程描述"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addCourseDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmitAddCourse" :loading="addCourseForm.isLoading">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div>
        <el-dialog title="删除" v-model="delCourseDialogVisible" size="tiny">
          <span>确定是要删除该课程吗</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="delCourseDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="delCourseDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  import CBreadcrumb from '../../components/Breadcrumb'
  import * as subjectService from '../../services/subject'
  import * as courseService from '../../services/course'
  import CourseVO from '../../services/model/CourseVO'

  export default {
    name: 'course-manage',
    data () {
      return {
        breadcrumb: [
          { label: '科目' },
          { label: '课程管理' }
        ],
        searchInput: '',
        courseData: [],
        courseDataLoading: false,
        subjectList: [],
        subjectSelected: '',
        addCourseDialogVisible: false,
        addCourseForm: {
          subjectSelected: '',
          subjectList: [],
          courseName: '',
          courseDesc: '',
          isLoading: false
        },
        delCourseDialogVisible: false,
        formLabelWidth: '120px',
        formRules: {
          subjectSelected: [{
            required: true,
            message: '请选择科目',
            trigger: 'change'
          }],
          courseName: [{
            required: true,
            message: '请填写课程名称',
            trigger: 'blur'
          }, {
            max: 60,
            message: '长度不能超过 60 个字符',
            trigger: 'blur'
          }]
        }
      }
    },
    created () {
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
      openAddCourseForm () {
        this.addCourseForm.subjectSelected = ''
        this.addCourseForm.subjectList = []
        this.addCourseForm.courseName = ''
        this.addCourseForm.courseDesc = ''
        this.addCourseForm.isLoading = false
        this.addCourseDialogVisible = true
      },
      openDeleteCourseDialog (currentCourseInfo) {
        this.delCourseDialogVisible = true
      },
      onSubmitAddCourse () {
        this.$refs.addCourseForm.validate(valid => {
          if (valid) {
            this.addCourseForm.isLoading = true
            let args = [
              this.addCourseForm.subjectSelected,
              this.addCourseForm.courseName,
              this.addCourseForm.courseDesc
            ]
            courseService.addCourse(args).then(data => {
              this.$message({
                message: '添加课程成功！',
                type: 'success'
              })

              let course = new CourseVO()
              course.id = data
              course.name = this.addCourseForm.courseName
              course.desc = this.addCourseForm.courseDesc
              this.courseData.push(course)

              this.addCourseDialogVisible = false
              this.addCourseForm.isLoading = false
            }, msg => {
              this.$message.error(msg)
              this.addCourseForm.isLoading = false
            })
          } else {
            return false
          }
        })
      },
      queryCourses () {
        if (!this.subjectSelected) {
          this.$message({
            message: '未选择科目',
            type: 'warning'
          })
          return false
        }

        this.courseDataLoading = true
        courseService.getCourses(this.subjectSelected).then(data => {
          this.courseData = data
          this.courseDataLoading = false
        }, msg => {
          this.$message.error(msg)
          this.courseDataLoading = false
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