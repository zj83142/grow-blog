<template>
  <div class="name">
    <span>{{text}}</span>
    <i class="iconfont icon-growfuzhi" @click="onCopy"></i>
  </div>
</template>
<script lang="ts">
import { ElMessage } from 'element-plus'
export default {
  props: [ 'text' ],
  setup(props) {
    function onCopy() {
      let oInput = document.createElement("input");
      oInput.value = props.text;
      document.body.appendChild(oInput);
      oInput.select();
      document.execCommand("Copy");
      oInput.remove();
      ElMessage({
        message: '复制成功',
        type: 'success',
      })
    }
    return {
      onCopy
    }
  }
}
</script>

