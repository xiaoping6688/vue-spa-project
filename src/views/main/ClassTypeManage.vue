<template>
  <div>
    <c-breadcrumb :items="breadcrumb"></c-breadcrumb>
    <div>
      <el-row>
        <el-col :span="2"><span class="textspan">学科</span></el-col>
        <el-col :span="4">
          <el-select v-model="subjectSelected" placeholder="请选择科目">
            <el-option v-for="item in subjectList" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2"><span class="textspan">班型</span></el-col>
        <el-col :span="4">
          <el-input placeholder="请输入班型" v-model="searchInput" class="queryinput"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button @click="queryClassTypes">查询</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="addClassTypeDialogVisible = true">添加</el-button>
        </el-col>
      </el-row>
      <div style="margin-top: 20px;">
        <el-table :data="classTypeData" style="width: 100%">
          <el-table-column type="index" label="#">
          </el-table-column>
          <el-table-column prop="classTypeName" label="班型">
          </el-table-column>
          <el-table-column prop="subjectName" label="科目">
          </el-table-column>
          <el-table-column prop="courseName" label="课程">
          </el-table-column>
          <el-table-column inline-template :context="_self" fixed="right" label="操作" width="100">
          <span>
            <el-button @click="addClassTypeDialogVisible = true" type="text" size="small">编辑</el-button>
              <el-button @click="delClassTypeDialogVisible = true" type="text" size="small">删除</el-button>
            </span>
          </el-table-column>
        </el-table>
      </div>
        <div>
        <el-dialog title="添加班型" v-model="addClassTypeDialogVisible">
          <el-form :model="addClassTypeForm">
          <el-form-item label="班型名称" :label-width="formLabelWidth">
              <el-input v-model="addClassTypeForm.name" auto-complete="off" placeholder="请输入班型名称"></el-input>
            </el-form-item>
            <el-form-item label="科目" :label-width="formLabelWidth">
              <!-- <el-checkbox-group v-model="subjectCheckedList">
                <el-checkbox v-for="item in subjectList" :label="item.name" :value="item.id"></el-checkbox>
              </el-checkbox-group> -->
              <el-radio-group v-model="subjectChecked">
                <el-radio v-for="item in subjectList" :label="item.id">{{ item.name }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="课程" :label-width="formLabelWidth">
              <!-- <el-checkbox-group v-model="courseCheckedList">
                <el-checkbox v-for="item in courseList" :label="item.name" :value="item.id"></el-checkbox>
              </el-checkbox-group> -->
              <el-radio-group v-model="courseChecked">
                <el-radio v-for="item in courseList" :label="item.id">{{ item.name }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addClassTypeDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmitAddClassType">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div>
        <el-dialog title="删除" v-model="delClassTypeDialogVisible" size="tiny">
          <span>确定是要删除该班型吗</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="delClassTypeDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="delClassTypeDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import CBreadcrumb from '../../components/Breadcrumb'
import * as classTypeService from '../../services/classtype'
import * as subjectService from '../../services/subject'
import * as courseService from '../../services/course'
import ClassTypeVO from '../../services/model/ClassTypeVO'
import { findNameById } from '../../utils/util'

export default {
  name: 'classtype-manage',
  data () {
    return {
      breadcrumb: [
        { label: '班级' },
        { label: '班型管理' }
      ],
      subjectList: [],
      subjectSelected: '',
      searchInput: '',
      classTypeData: [],
      courseList: [],
      courseChecked: '',
      subjectChecked: '',
      addClassTypeDialogVisible: false,
      addClassTypeForm: {
        name: '',
        isLoading: false
      },
      delClassTypeDialogVisible: false,
      formLabelWidth: '120px'
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
    queryClassTypes () {
      if (this.subjectSelected === '') {
        this.$message({
          message: '请先选择科目！',
          type: 'warning'
        })
        return
      }

      classTypeService.getClassTypes(this.subjectSelected).then(data => {
        this.classTypeData = data
      }, msg => {
        this.$notify.error({
          title: '错误',
          message: msg
        })
      })
    },
    onSubjectSelected (value) {
      if (value === '') return
      courseService.getSchools(value).then(data => {
        this.courseList = data
      }, msg => {
        this.$notify.error({
          title: '错误',
          message: msg
        })
      })
    },
    onSubmitAddClassType () {
      this.addClassTypeForm.isLoading = true
      let args = [
        this.subjectChecked,
        this.courseChecked,
        this.addClassTypeForm.name
      ]
      classTypeService.addClassType(args).then(data => {
        this.addClassTypeDialogVisible = false
        let classType = new ClassTypeVO()
        classType.classTypeId = data
        classType.classTypeName = this.addClassTypeForm.name
        classType.courseName = findNameById(this.courseList, this.courseChecked)
        classType.subjectName = findNameById(this.subjectList, this.subjectChecked)
        this.classTypeData.push(classType)
        this.addClassTypeForm.isLoading = false
      }, msg => {
        this.$message.error(msg)
        this.addClassTypeForm.isLoading = false
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