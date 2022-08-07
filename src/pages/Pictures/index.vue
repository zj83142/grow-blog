<template>
  <Layout>
    <template v-slot:header>
      <MyHeader></MyHeader>
    </template>
    <!-- <template v-slot:siderbar>
      <Siderbar :menuLs="menuLs"></Siderbar>
    </template> -->
    <template v-slot:container>
      <div class="sub-header">
        <el-button type="danger" round style="margin-right: 16px;" @click="isUpload = true">上传图片</el-button>
        <div :class="{ active: type === item.value }" v-for="item in menus" :key="item.value" @click="onSkip(item.value)">{{item.name}}</div>
      </div>
      <div class="grid">
        <div class="block" v-for="(item, index) in imgs" :key="index">
          <img :src="item" />
        </div>
      </div>
    </template>
  </Layout>
   <el-dialog v-model="isUpload" :title="'上传图片'">
    <el-form>
      <el-upload
        class="upload-demo"
        drag
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        multiple
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500kb
          </div>
        </template>
      </el-upload>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isSave=false">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { toRefs, watch, reactive } from 'vue'

import Layout from '@/components/Layout/index.vue'
import MyHeader from '@/components/Layout/MyHeader.vue'
import Siderbar from '@/components/Layout/Siderbar.vue'

export default {
  name: 'Pictures',
  components: { Layout, MyHeader, Siderbar },
  setup() {
    const imgs = Array.from({length: 14}, (_v, k) => `http://127.0.0.1:8085/imgs/${k + 1}.jpg`)
    const menus = [
      {
        name: '全部',
        value: ''
      },
      {
        name: '网页模版',
        value: 'web'
      },
      {
        name: '背景素材',
        value: 'bg'
      },
      {
        name: '图标',
        value: 'icon'
      },
      {
        name: '插画',
        value: 'art'
      },
      {
        name: '生活',
        value: 'photo'
      },
      {
        name: '其它',
        value: 'other'
      },
    ]
    const route = useRoute()
    const router = useRouter()
    const data = reactive({
      type: route.params.type,
      isUpload: false
    })
    watch(() => route.params.type, newVal => {
      data.type = newVal
    })
    function onSkip(type: string) {
      router.push(`/pictures${type ? '/' + type : ''}`)
    } 
    return {
      imgs,
      menus,
      ...toRefs(data),
      onSkip
    }
  },
}
</script>
<style lang="less" scoped>
  .sub-header {
    height: 48px;
    line-height: 48px;
    padding: 0 10%;
    box-shadow: 0 2px 4px #ddd;
    > div {
      display: inline-block;
      font-size: 0.8em;
      min-width: 80px;
      text-align: center;
      cursor: pointer;

      &:hover {
        background: #ddd;
      }
      &.active {
        color: #45bbf1;
        background: #efefef;
      }
    }
  }
  .grid {
    -webkit-column-count: 3;
    -webkit-column-gap: 10px;
    -webkit-column-fill: auto;
    -moz-column-count: 3;
    -moz-column-gap: 10px;
    -moz-column-fill: auto;
    column-count: 4;
    column-gap: 15px;
    column-fill: auto;
    width: 90%;
    margin: 24px auto;
  }
  .block {
    display: block;
    // padding: 20px;
    word-wrap: break-word;
    margin-bottom: 16px;
    -webkit-column-break-inside: avoid;
    -moz-column-break-inside: avoid;
    column-break-inside: avoid;

    img {
      width: 100%;
    }
  }
</style>
