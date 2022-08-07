<template>
  <Layout>
    <template v-slot:header>
      <MyHeader></MyHeader>
    </template>
    <template v-slot:siderbar>
      <Siderbar :menuLs="menuLs" :defaultActive="defaultActive"></Siderbar>
    </template>
    <template v-slot:container>
      <router-view></router-view>
    </template>
  </Layout>
</template>
<script lang="ts">
import { useRoute } from 'vue-router'
import { toRefs, watch, reactive } from 'vue'

import Layout from '@/components/Layout/index.vue'
import MyHeader from '@/components/Layout/MyHeader.vue'
import Siderbar from '@/components/Layout/Siderbar.vue'

export default {
  name: 'Tools',
  components: { Layout, MyHeader, Siderbar},
  setup() {
    const menuLs = [
      {
        index: '1',
        name: 'css案例',
        children: [
          { 
            index: '/tools/demo/bgcolor',
            name: 'css背景渐变'
          },
          { 
            index: '/tools/demo/randomcolor',
            name: '随机颜色'
          },
          { 
            index: '/tools/demo/hexagonbg',
            name: '六边形背景'
          },
        ]
      }
    ]
    const route = useRoute()
    const data: any = reactive({
      defaultActive: route.path,
      menuLs
    })
    watch(
      () => route.path,
      (newVal) => {
        data.defaultActive = newVal
      }, { immediate: true}
    )
    return {
      ...toRefs(data)
    }
  },
}
</script>
