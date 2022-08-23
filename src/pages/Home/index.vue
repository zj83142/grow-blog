<template>
  <div class="home" >
    <div class="header" >
      <MyHeader :type="'home'"></MyHeader>
    </div>
    <div class="warp">
      <div v-for="item in blogLs" :key="item.id" class="blog">
        <div class="title" @click="onSkip('/blogDetail/' + item.id)">
          {{item.title}}
        </div>
        <div class="content">
          {{item.descript}}
        </div>
        <div class="desp">
          <div>
            <span>{{item.username}}</span>
            <span>{{item.keyword}}</span>
            <span>{{item.updateTime}}</span>
          </div>
          <div>
            <span><i class="iconfont icon-growshoucang" @click="onCollection"></i> {{item.collectionNum || 0}}</span>
            <span><i class="iconfont icon-grow31dianzan" @click="onStar"></i> {{item.starNum || 0}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="footer">
    遇见 · 更好的自己
  </div>
</template>
<script lang="ts">

import MyHeader from '../../components/Layout/MyHeader.vue'
import { onMounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import moment from 'moment'

import { getAllBlog } from '../../api/blog'
export default {
  components: { MyHeader },
  setup() {
    const router = useRouter()
    const data = reactive({
      blogLs: []
    })
    async function getAll () {
      const res = await getAllBlog()
       if (res.status) {
        const blogLs = res.data.map((item: any)=> {
          item.updateTime = moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss')
          return item
        })
        data.blogLs = blogLs
      }
    }
    onMounted(() => {
      getAll()
    })
    function onSkip(path: string) {
      router.push({ path })
    }
    return {
      ...toRefs(data),
      onSkip
    }
  },
}
</script>


<style lang="less" scoped>

  .home {
    min-height: 100vh;
    background: #f4f5f5;
    padding-bottom: 16px;
    // background: url('./imgs/bg.jpg');
    font-size: 14px;


    .header {
      background: #1b1272;
    }
    .warp {
      margin: 16px 12% 0px;
      padding: 20px;
      background: #fff;
    }
  }
  .blog {
    margin-top: 6px;
    border-bottom: 1px dashed #ddd;
    &:last-child {
      border-bottom: none;
    }
    .title {
      margin-bottom: 6px;
      font-size: 1.2em;
      cursor: pointer;
      &:hover {
        color: #39bda4;
      }
    }
    .content {
      margin-bottom: 4px;
    }
    .desp {
      color: #807f7f;
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
      font-size: 12px;
      > div span {
        margin-right: 16px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  .footer {
    height: 64px;
    background: #242d75;
    border-top: 6px solid #a9b1f2;
    color: #dfdede;
    line-height: 64px;
    text-align: center;
  }

</style>