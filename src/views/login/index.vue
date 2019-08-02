<template>
  <div class="container">
    <el-card class="my-card">
      <!-- 图片 -->
      <img src="../../assets/images/logo_index.png" alt />
      <!-- 表单 -->
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" status-icon>
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:236px;margin-right:10px;"></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
            <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-form-item>
            <el-button type="primary" style="width:100%" @click="login()">登 录</el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    // 自定义校验
    const checkMobile = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机格式不正确'))
      }
      callback()
    }
    return {
    // 表单对象数据
      loginForm: {
        mobile: '15027924165',
        code: '246810'
      },
      // 表单校验规则数据
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位数字的验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 成功会给valid进行校验，校验失败时element-ui会给默认的提示
    login () {
      // 对整个表单进行校验
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
        // 请求的登陆接口
          this.$https.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm).then(res => {
            this.$router.push('/')
          })
            .catch(() => {
              this.$message.error('手机号或者是验证码错误')
            })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
}
.my-card {
  position: absolute;
  width: 400px;
  height: 350px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -60%);
  img {
    display: block;
    width: 200px;
    margin: 0 auto 30px;
  }
}
</style>
