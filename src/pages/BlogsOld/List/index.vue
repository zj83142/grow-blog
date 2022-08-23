<template>
  日志 ~~ {{category}}
</template>
<script lang="ts">
import { useRoute } from 'vue-router'
import { toRefs, watch, reactive } from 'vue'
export default {
  setup() {
    const route = useRoute()
    const { category } = route.params
    const data: any = reactive({
      category
    })
    function getBlogList() {
      console.log('获取日志列表')
    }
    watch(
      () => route.params.category,
      (newVal) => {
        data.category = newVal
        getBlogList()
      }, { immediate: true}
    )
    return {
      ...toRefs(data)
    }
  },
  
 
}
</script>
