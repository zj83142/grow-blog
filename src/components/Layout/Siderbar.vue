<template>
  <el-aside width="200px">
    <el-menu
      class="my-siderbar"
      :default-active="defaultActive"
      router
      @open="handleOpen"
      @close="handleClose"
    >
      <template v-for="item in menuLs">
        <el-sub-menu v-if="item.children" :key="item.index" :index="item.index">
          <template #title>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item  v-for="temp in item.children" :key="temp.index" :index="temp.index">
            <span>{{temp.name}}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :key="item.index" :index="item.index">
          <span>{{item.name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </el-aside>
</template>
<script lang="ts">
  export default {
    name: 'Siderbar',
    props: [ 'menuLs', 'defaultActive' ],
    setup() {
      function handleOpen() {
        console.log('------handleOpen---')
      }
      function handleClose() {
        console.log('------handleClose---')
      }
      return {
        handleOpen,
        handleClose
      }
    }
  }

  
    
</script>

<style scoped lang="less">
  .my-siderbar {
    height: calc(100vh - 60px);
    overflow: hidden;
    &:hover {
      overflow-y: auto;
    }
  }
</style>