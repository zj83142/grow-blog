<template>
  <div class="flex-between">
    <div class="menus-warp">
      <div class="logo" :class="type" @click="onSkip('/home')">
        <img src="../../../public/favicon.ico" />
        <span>成长快乐</span>
      </div>
      <ul class="header-menus">
        <li v-for="item in menus" :class="getMenuClass(item.to)" @click="onSkip(item.to)" :key="item.index">
          {{item.name}}
        </li>
      </ul>
    </div>
    <el-dropdown class="user-info">
      <span class="el-dropdown-link">
        {{userInfo?.username}}
        <el-icon>
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="onSkip('/editBlog')">写博客</el-dropdown-item>
          <el-dropdown-item @click="onSkip('/myblog')">我的博客</el-dropdown-item>
          <el-dropdown-item @click="onSkip('/collection')">我的收藏</el-dropdown-item>
          <el-dropdown-item @click="onSkip('/modifyPwd')">修改密码</el-dropdown-item>
          <el-dropdown-item divided @click="onSkip('/login')">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script lang="ts">
  import { toRefs, watch, reactive } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter, useRoute } from 'vue-router'
  export default {
    props: [ 'type' ],
    setup(props: any) {
      console.log(props)
      const store = useStore()
      const router = useRouter()
      const route = useRoute()
      const { user } = store.state
      // const { userInfo } = store.state.user || {}
      function onSkip(path: string) {
        console.log('====onSkip==', path)
        router.push({ path })
      }
      function getMenuClass(menu: string) {
        const path = route.path
        return path.indexOf(menu) !== -1 ? 'active' : ''
      }
      const menus: any = [
        // {
        //   index: 0,
        //   name: '首页',
        //   to: '/home',
        // },
        // {
        //   index: 1,
        //   name: '日志',
        //   to: '/blog/css',
        // },
        // {
        //   index: 2,
        //   name: '工具',
        //   to: '/tools/demo/bgcolor',
        // },
        // {
        //   index: 3,
        //   name: '图库',
        //   to: '/pictures',
        // }
      ]
      const data = reactive({
        userInfo: user.userInfo,
        menus
      })
    
      watch(
        () => user.userInfo,
        (newVal) => {
          data.userInfo = newVal
        }
      )
      return {
        ...toRefs(data),
        onSkip,
        getMenuClass
      }
    }
  }
</script>

<style scoped lang="less">
  .flex-between {
    color: #fff;
    .menus-warp{
      display: flex;
    
      .logo {
        display: flex;
        align-items: center;
        background: #ffffff29;
        height: 60px;
        width: 200px;
        padding-left: 24px;
        cursor: pointer;
        
        img {
          width: 36px;
          margin-right: 8px;
        }
        &.home {
          background: none;
        }
      }
      .header-menus {
        display: flex;
        margin-left: 24px;
        > li {
          padding: 0 24px;
          line-height: 60px;
          cursor: pointer;
          &.active {
            color: #9be9f4;
            border-bottom: 3px solid #9be9f4;
            height: 59px;
          }
        }
      }
    }
  }
  .user-info {
    color: #fff;
    margin-right: 16px;
  }
  
</style>
