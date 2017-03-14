<template>
  <div class="regist">
    <h1 class="logo">用户注册</h1>
    <el-form ref="registForm" :model="registForm" :rules="rules" label-width="80px">
      <el-form-item label="账号" prop="username">
        <el-input v-model="registForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="registForm.password" placeholder="请输入密码" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码确认" prop="passconfirm">
        <el-input type="password" v-model="registForm.passconfirm" placeholder="请再次输入密码" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="机构名称">
        <el-input v-model="registForm.organname" placeholder="请输入机构名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即注册</el-button>
        <el-button @click="onBack">返回登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'regist',
  data () {
    var validateName = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }

    var validatePass = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('请输入密码'))
      } if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        if (this.registForm.passconfirm !== '') {
          this.$refs.registForm.validateField('passconfirm')
        }
        callback()
      }
    }

    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      registForm: {
        username: '',
        password: '',
        passconfirm: '',
        organname: ''
      },
      rules: {
        username: [
          { validator: validateName, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        passconfirm: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs.registForm.validate(valid => {
        if (valid) {
          let args = [
            this.registForm.username,
            this.registForm.password
          ]
          this.$store.dispatch('regist', args).then(() => {
            this.$router.push('/main')
          }, err => {
            this.$message.error(err.message)
          })
        }
      })
    },
    onBack () {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.regist {
  position: absolute;
  width: 360px;
  height: 360px;
  background-color: #FFFFFF;
  border-radius: 10px;
  padding: 10px 20px 10px 10px;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.logo {
  text-align: center;
}


</style>
