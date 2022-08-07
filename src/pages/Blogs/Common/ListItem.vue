<template>
  <div>{{title}}</div>
  <div>{{desp}}</div>
</template>
<script lang="ts">
import { toRefs } from 'vue'
export default {
  setup(props) {
    return {
      ...toRefs(props)
    }
  },
}
</script>
