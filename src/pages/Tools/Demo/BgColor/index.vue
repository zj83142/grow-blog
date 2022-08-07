<template>
  <div class="bg-color">
    <div v-for="(item, index) in colors" :key="index">
      <div class="item" :style="item.style"></div>
      <CopyText :text="item.name" />
    </div>
  </div>
</template>
<script lang="ts">
import CopyText from '@/components/CopyText.vue'
import { colors } from './bgColors'
// 颜色取值地址： https://color.oulu.me/ ，脚本如下
// const boxs = document.querySelectorAll('.gradient')
// const colorLs = []
// boxs.forEach(item => {
//   let nameEl = item.querySelector('.gradient__colors_box')
//   let name = ''
//   if (!nameEl) {
//     nameEl = item.querySelector('.gradient__advanced_text')
//   }
//   name = nameEl.textContent.replace(/[\n|\t]/g, '')
//   const colorEl = item.querySelector('.gradient__copy_button')
//   const colorInfos = colorEl.dataset.clipboardText.replace(';', '').split(': ')
//   colorLs.push({name, style: {[colorInfos[0]]: colorInfos[1]}})
// })
// console.log(JSON.stringify(colorLs))
export default {
  name: 'BgColor',
  components: {
    CopyText
  },
  setup() {
    return {
      colors
    }
  },
}
</script>

<style scoped lang="less">
  .bg-color {
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
    > div {
      height: 300px;
      width: 25%;
      padding: 16px;
      
      .item {
        width: 80%;
        height: 80%;
        box-sizing: border-box;
        background: #f0f;
        border-radius: 50%;
        margin: 0 auto;
        box-shadow: 0px 2px 4px rgb(192, 192, 192);
      }
      .name {
        margin-top: 12px;
      }
    }
  }

</style>
