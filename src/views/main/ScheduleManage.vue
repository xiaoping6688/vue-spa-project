<template>
  <div>
    <c-breadcrumb :items="breadcrumb"></c-breadcrumb>
    <div class="schedule">
      <el-form ref="form" :model="form" label-width="80px" label-position="left">
        <el-form-item label="授课类型">
          <el-radio-group v-model="form.teatype">
            <el-radio :label="1">一对一</el-radio>
            <el-radio :label="2">小班</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排课类型">
          <el-radio-group v-model="form.schtype">
            <el-radio :label="1">课程</el-radio>
            <el-radio :label="2">模考</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="网络课">
          <el-radio-group v-model="form.nettype">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="课程">
          <el-select v-model="form.course" placeholder="请选择课程">
            <el-option label="课程1" value="1"></el-option>
            <el-option label="课程2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="老师">
          <el-select v-model="form.teacher" placeholder="请选择老师">
            <el-option label="肖老师" value="1"></el-option>
            <el-option label="刘老师" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="校区">
          <el-select v-model="form.area" placeholder="请选择校区">
            <el-option label="北京" value="1"></el-option>
            <el-option label="上海" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排课周期">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import CBreadcrumb from '../../components/Breadcrumb'

  export default {
    name: 'schedule-manage',
    data () {
      return {
        breadcrumb: [
          { label: '班级' },
          { label: '排课管理' }
        ],
        form: {
          teatype: 1,
          schtype: 1,
          nettype: 1,
          course: '',
          teacher: '',
          area: '',
          date1: '',
          date2: ''
        }
      }
    },
    methods: {
      onSubmit () {
      }
    },
    components: {
      CBreadcrumb
    }
  }
</script>
<style scoped>
.schedule {
  position: absolute;
  width: 400px;
  height: 340px;
  background-color: #FFFFFF;
  margin-left: 10px;
}
</style>