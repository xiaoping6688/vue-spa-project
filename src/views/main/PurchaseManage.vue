<template>
  <div>
    <c-breadcrumb :items="breadcrumb"></c-breadcrumb>
    <div>
      <el-row>
        <el-col :span="2"><span class="textspan">学员编号</span></el-col>
        <el-col :span="4">
          <el-input placeholder="请输入学员编号" v-model="numberinput" class="teacherinput"></el-input>
        </el-col>
        <el-col :span="2"><span class="textspan">学生姓名</span></el-col>
        <el-col :span="4">
          <el-input placeholder="请输入学生姓名" v-model="nameinput" class="queryinput"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button>查询</el-button>
        </el-col>
      </el-row>
      <div style="margin-top: 20px;">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" label="#">
          </el-table-column>
          <el-table-column prop="studentname" label="学员姓名">
          </el-table-column>
          <el-table-column prop="studentnumber" label="学员编号">
          </el-table-column>
          <el-table-column prop="purtime" label="购课日期">
          </el-table-column>
          <el-table-column prop="coursetype" label="课程类型">
          </el-table-column>
          <el-table-column prop="classorder" label="班次">
          </el-table-column>
          <el-table-column prop="cost" label="费用">
          </el-table-column>
          <el-table-column prop="lessonnum" label="课时">
          </el-table-column>
          <el-table-column inline-template :context="_self" fixed="right" label="操作" width="160">
            <span>
              <el-button @click="delDialogVisible = true" type="text" size="small">退费</el-button>
            </span>
          </el-table-column>
        </el-table>
      </div>

      <div>
        <el-dialog title="退费" v-model="purDialogVisible" size="tiny">
          <span>确定是要退出班级吗</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="purDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="purDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import CBreadcrumb from '../../components/Breadcrumb'

export default {
  name: 'purchase-manage',
  data () {
    return {
      breadcrumb: [
        { label: '学生' },
        { label: '购课记录' }
      ],
      input: '',
      tableData: [{
        number: '1',
        studentname: '刘海娇',
        studentnumber: '11001000100',
        studentphone: '136XXXXXXX',
        studentgrade: '初中一年级',
        studentschool: '人大附中',
        studentarea: '北京'
      }, {
        number: '2',
        studentname: '刘海娇',
        studentnumber: '11001000100',
        studentphone: '136XXXXXXX',
        studentgrade: '初中一年级',
        studentschool: '人大附中',
        studentarea: '北京'
      }, {
        number: '3',
        studentname: '刘海娇',
        studentnumber: '11001000100',
        studentphone: '136XXXXXXX',
        studentgrade: '初中一年级',
        studentschool: '人大附中',
        studentarea: '北京'
      }, {
        number: '4',
        studentname: '刘海娇',
        studentnumber: '11001000100',
        studentphone: '136XXXXXXX',
        studentgrade: '初中一年级',
        studentschool: '人大附中',
        studentarea: '北京'
      }],
      delDialogVisible: false,
      formLabelWidth: '80px'
    }
  },
  methods: {

  },
  components: {
    CBreadcrumb
  }
}
</script>

<style scoped>

</style>