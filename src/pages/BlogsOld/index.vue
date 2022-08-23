<template>
  <Layout>
    <template v-slot:header>
      <MyHeader></MyHeader>
    </template>
    <template v-slot:siderbar>
      <Siderbar :menuLs="menuLs" :defaultActive="defaultActive"></Siderbar>
    </template>
    <template v-slot:container>
      <div class="blog-container">
        <div class="b-siderbar">
          <div class="add-btn" @click="changeMode('add')">
            <el-icon><Plus /></el-icon>
            新建文章
          </div>
          <div style="padding-top: 64px;">
            <div v-for="item in blogLs" :key="item.id" :class="getItemClass(item.id)" @click="changeCurrBlog(item)">
              <div class="title">{{item.title}} </div>
              <div class="desp">{{item.descript}}</div>
            </div>
          </div>
        </div>
        <div class="b-content">
          <Detail 
            :mode="mode"
            @changeMode="changeMode" 
            @onRefresh="getBlogList"
          />
        </div>
      </div>
    </template>
  </Layout>
</template>
<script lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { toRefs, watch, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import _ from 'lodash'

import Layout from '@/components/Layout/index.vue'
import MyHeader from '@/components/Layout/MyHeader.vue'
import Siderbar from '@/components/Layout/Siderbar.vue'
import Detail from './Detail/index.vue'

import { getBlogByCategroy } from '../../api/blog'

export default {
  name: 'Blogs',
  components: { Layout, MyHeader, Siderbar, Detail },
  setup() {
    const menuLs = [
      {
        index: '1',
        name: '前端',
        children: [
          { 
            index: '/blog/css',
            name: 'css样式'
          },
          { 
            index: '/blog/js',
            name: 'js基础'
          },
          { 
            index: '/blog/react',
            name: 'react'
          },
          { 
            index: '/blog/vue',
            name: 'vue'
          }
        ]
      }, {
        index: '2',
        name: '后端',
          children: [
          { 
            index: '/blog/node',
            name: 'nodejs'
          },
          { 
            index: '/blog/db',
            name: '数据库'
          },
          { 
            index: '/blog/deploy',
            name: '部署'
          }
        ]
      },
      {
        index: '/blog/chart',
        name: '可视化',
      }
    ]
    const route = useRoute()
    const router = useRouter()
    const data: any = reactive({
      menuLs,
      mode: 'detail',
      blogLs: [],
    })
    async function getBlogList(_id?: string|number|undefined) {
      data.mode = 'detail'
      const { category, id } = route.params
      const res = await getBlogByCategroy({ category })
      if (res.status) {
        const blogLs = res.data
        data.blogLs = blogLs
        if (_id) {
          router.push(`/blog/${category}/${_id}`)
        } else {
          if (!id && blogLs.length > 0) {
          const [ frist ] = blogLs
          router.push(`/blog/${category}${frist ? '/' + frist.id: ''}`)
        }
        }
        
      }
    }
    function changeCurrBlog(item: any) {
      if (['add', 'edit'].includes(data.mode)) {
        return ElMessage({
          message: '请先保存编辑中的文章',
          type: 'warning',
        })
      }
      const { category } = route.params
      router.push(`/blog/${category}/${item.id}`)
    }
    function changeMode(mode: string) {
      if (['add', 'edit'].includes(data.mode) && mode !== 'detail') {
        return ElMessage({
          message: '请先保存编辑中的文章',
          type: 'warning',
        })
      }
      data.mode = mode
    }
    function getItemClass(id: any) {
      return Number(route.params.id) === id ? 'blog-item active': 'blog-item';
    }
    watch(
      () => route.params.category, (newVal) => {
        if (newVal) {
          const id = route.params.id
          router.push(`/blog/${newVal}${id? '/' + id: ''}`)
          getBlogList()
        }
      }, { immediate: true}
    )
    onMounted(() => {
      if (!route.params.category) {
        router.push(`/blog/css`)
      }
    })
    const defaultActive = `/blog/${route.params.category || 'css'}`
    return {
      ...toRefs(data),
      defaultActive,
      getItemClass,
      changeMode,
      getBlogList,
      changeCurrBlog,
    }
  },
}
</script>
<style lang="less" scoped>
  .blog-container {
    position: relative;
    display: flex;
    .b-siderbar {
      width: 185px;
      flex-shrink: 0;
      font-size: 12px;
      border-right: 1px solid #ddd;
      height: calc(100vh - 108px);
      overflow: hidden;
      
      &:hover {
        overflow-y: auto;
      }
      > div {
        width: 185px;
      }

      .add-btn {
        height: 64px;
        line-height: 64px;
        text-align: center;
        background: #7dcff1;
        font-size: 14px;
        cursor: pointer;
        position: absolute;
        &:hover {
          background: #48c6fa;
        }
      }
      .blog-item {
        padding: 8px 12px;
        cursor: pointer;
        border-top: 1px solid #ddd;
        &:hover {
          background: #eefaff;
        }
        &.active {
          background: #d6f2ff;
        }
        .title {
          font-size: 14px;
        }
        .desp {
          color: #666;
        }
      }
    }
    .b-content {
      padding: 12px;
      flex-grow: 1;
      height: calc(100vh - 108px);
      overflow-y: auto;
    }
  }
</style>