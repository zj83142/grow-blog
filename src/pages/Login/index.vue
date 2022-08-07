<template>
  <div class="login">
    <div class="login-box">
      <img class="logo" src="../../../public/favicon.ico" />
      <el-input
        v-model="username"
        placeholder="请输入用户名"
        class="login-input"
      >
        <template #prefix>
          <i class="iconfont icon-growzhanghao"></i>
        </template>
      </el-input>
      <el-input
        v-model="password"
        placeholder="请输入密码"
        class="login-input"
        show-password
      >
        <template #prefix>
          <i class="iconfont icon-growmima"></i>
        </template>
      </el-input>
      <div class="text-left">
        <el-checkbox v-model="isRemerber" label="记住密码" size="large" />
      </div>
      <el-button @click="onLogin" class="login-btn" type="primary" round :loading="isLogin">登录</el-button>
      <div class="desp-btns">
        <span>注册新用户</span>｜
        <span>找回密码</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const data = reactive({
      isLogin: false,
      username: 'admin',
      password: '123456',
      isRemerber: false
    })
    async function onLogin () {
      const { username, password } = data;
      data.isLogin = true
      const userInfo = await store.dispatch('user/onLogin', { username, password })
      if (userInfo) {
        router.push({
          path: '/home'
        })
      }
      data.isLogin = false
    }
    return {
      ...toRefs(data),
      onLogin
    }
  },
}
</script>
<style scoped lang="less">
  .login {
    height: 100vh;
    min-height: 520px;
    // background: #ddd;
    background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    display: flex;
    align-items: center;
  }
  .login-box {
    width: 320px;
    margin: auto;
    background: #ffffff7a;
    padding: 24px;
    border-radius: 4px;
    > * {
      width: 100%;
    }
    .el-checkbox {
      font-weight: 400;
    }
  }
  .logo {
    width: 120px;
    display: block;
    margin: 0 auto;
    box-shadow: 0 4px 8px #86dab6;
    border-radius: 50%;
  }
  .login-input {
    margin-top: 16px;
  }
  .login-input /deep/ .el-input__wrapper {
    border-radius: 24px;
    box-shadow: unset;
  }
  .login-btn {
    display: block;
  }
  .text-left {
    text-align: left;
  }
  .desp-btns {
    margin-top: 8px;
    font-size: 12px;
    color: #666;
    text-align: right;
  }

</style>
