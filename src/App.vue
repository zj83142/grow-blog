<template>
  <div v-loading.fullscreen.lock="isLoading">
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
  import { onMounted, ref } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  export default {
    setup() {
      const store = useStore()
      const router = useRouter()
      const isLoading = ref(true)
      onMounted(async () => {
        const userInfo = await store.dispatch('user/getUser' )
        isLoading.value = false
        if (!userInfo) {
          router.push('/login')
        }
      
      })
      return {
        isLoading
      }
    }
  }
</script>