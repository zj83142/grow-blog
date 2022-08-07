<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <slot name="header"></slot>
      </el-header>
      <el-container>
        <slot name="siderbar"></slot>
        <el-container style="height: calc(100vh - 60px)">
          <el-main class="main-container">
            <div style="min-height: calc(100vh - 108px);">
              <slot name="container"></slot>
            </div>
            <!-- <router-view></router-view> -->
            <el-footer class="h48">
              遇见 · 更好的自己
            </el-footer>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import MyHeader from './MyHeader.vue'
import Siderbar from './Siderbar.vue'

export default defineComponent({
  components: { MyHeader, Siderbar }
})

</script>

<style>
  .el-header {
    background-color: #04315e;
    padding: 0;
  }
  .el-footer {
    /* margin: 0 -20px -20px; */
    color: #666;
    background: #3252780d;
    text-align: center;
  }
  .el-main {
    padding: 0;
  }
</style>
