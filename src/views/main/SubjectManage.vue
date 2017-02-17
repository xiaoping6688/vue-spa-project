<template>
  <div>
    <c-breadcrumb :items="breadcrumb"></c-breadcrumb>
    <div>
      <el-row>
        <el-col :span="2"><span class="textspan">科目</span></el-col>
        <el-col :span="4">
          <el-input placeholder="请输入科目" v-model="subjectinput" class="queryinput"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button>查询</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="openAddSubjectDialog">添加</el-button>
        </el-col>
      </el-row>
      <div style="margin-top: 20px;">
        <el-table :data="subjectData" v-loading.body="subjectDataLoading">
          <el-table-column type="index" label="#">
          </el-table-column>
          <el-table-column prop="name" label="科目">
          </el-table-column>
          <el-table-column inline-template :context="_self" fixed="right" label="操作" width="100">
            <span>
              <el-button @click="openDeleteSubjectDialog(row)" type="text" size="small">删除</el-button>
            </span>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-dialog title="添加科目" v-model="addSubjectFormVisible">
          <el-form :model="addSubjectForm" ref="addSubjectForm" :rules="formRules">
            <el-form-item label="科目名称" error="" prop="name" :label-width="formLabelWidth">
              <el-input v-model="addSubjectForm.name" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addSubjectFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmitAddSubject" :loading="addSubjectForm.isLoading">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div>
        <el-dialog title="删除" v-model="delSubjectDialogVisible" size="tiny">
          <span>确定是要删除该科目吗</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="delSubjectDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="delSubjectDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import CBreadcrumb from '../../components/Breadcrumb'
import * as subjectService from '../../services/subject'
import SubjectVO from '../../services/model/SubjectVO'

export default {
  name: 'subject-manage',
  data () {
    return {
      breadcrumb: [
        { label: '科目' },
        { label: '科目管理' }
      ],
      subjectinput: '',
      subjectData: [],
      subjectDataLoading: true,
      addSubjectFormVisible: false,
      addSubjectForm: {
        name: '',
        isLoading: false
      },
      delSubjectDialogVisible: false,
      delSubjectId: '',
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
    subjectService.getSubjects(this.$store.state.account.userId).then(data => {
      this.subjectDataLoading = false
      this.subjectData = data
    }, msg => {
      this.subjectDataLoading = false
      this.$notify.error({
        title: '错误',
        message: msg
      })
    })
  },
  methods: {
    openDeleteSubjectDialog (currentSubjectInfo) {
      this.delSubjectDialogVisible = true
    },
    openAddSubjectDialog () {
      this.addSubjectForm.name = ''
      this.addSubjectFormVisible = true
    },
    onSubmitAddSubject () {
      this.$refs.addSubjectForm.validate(valid => {
        if (valid) {
          this.addSubjectForm.isLoading = true
          let args = [
            this.$store.state.account.userId,
            this.addSubjectForm.name
          ]
          subjectService.addSubject(args).then(data => {
            this.addSubjectFormVisible = false
            let subject = new SubjectVO()
            subject.id = data
            subject.name = this.addSubjectForm.name
            this.subjectData.push(subject)
            this.addSubjectForm.isLoading = false
          }, msg => {
            this.$message.error(msg)
            this.addSubjectForm.isLoading = false
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