<template>
  <div class="hexagonBg">
    <div class="cursor"></div>
    <div class="row">
      <div class="hexagon" v-for="(item, index) in new Array(18)" :key="index"></div>
    </div>
    <div class="row row-moved">
      <div class="hexagon" v-for="(item, index) in new Array(18)" :key="index"></div>
    </div>
    <div class="row">
      <div class="hexagon" v-for="(item, index) in new Array(18)" :key="index"></div>
    </div>
    <div class="row row-moved">
      <div class="hexagon" v-for="(item, index) in new Array(18)" :key="index"></div>
    </div>
    <div class="row">
      <div class="hexagon" v-for="(item, index) in new Array(18)" :key="index"></div>
    </div>
    <div class="row row-moved">
      <div class="hexagon" v-for="(item, index) in new Array(18)" :key="index"></div>
    </div>
    <div class="row">
      <div class="hexagon" v-for="(item, index) in new Array(18)" :key="index"></div>
    </div>
    <div class="row row-moved">
      <div class="hexagon" v-for="(item, index) in new Array(18)" :key="index"></div>
    </div>
    <div class="row">
      <div class="hexagon" v-for="(item, index) in new Array(18)" :key="index"></div>
    </div>
    <div class="row row-moved">
      <div class="hexagon" v-for="(item, index) in new Array(18)" :key="index"></div>
    </div>
    <div class="row">
      <div class="hexagon" v-for="(item, index) in new Array(18)" :key="index"></div>
    </div>
    <div class="row row-moved">
      <div class="hexagon" v-for="(item, index) in new Array(18)" :key="index"></div>
    </div>
  </div>
</template>
<script lang="ts">
  import { reactive, toRefs, watch, onMounted } from 'vue'
  export default {
    setup() {
      const data = reactive({
        theme: 'light',
        len: 4,
        colors: []
      })
      onMounted(() => {
        let curs: any = document.querySelector('.cursor');
        document.addEventListener('mousemove', (e) => {
          let x = e.pageX;
          let y = e.pageY;
          curs.style.left = (x - 175) + "px";
          curs.style.top = (y - 175) + "px";
          curs.style.opacity = "1"
        });


      })
      return {
        ...toRefs(data),
      }
    },
  }
</script>
<style lang="less" scoped>
  .hexagonBg {
    position: relative;
    background: #353535;
    overflow: hidden;
    margin-left: -62px;

    .row {
      display:block;
      width: 100vw;
      height: 125px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: -35px;
      margin-left: -33px;
      
      .hexagon {
        position: relative;
        width: 100px; 
        height: 57.74px;
        background-color: #2b2b2b;
        margin: 32.87px 2px;
        display: block;
        transition: all .2s linear;
      
      &::after{
        content: "";
        position: absolute;
        width: 0;
        border-left: 50px solid transparent;
        border-right: 50px solid transparent;
          top: 100%;
        width: 0;
        border-top: 28.87px solid #2b2b2b;
        transition: all .2s linear;
      }
      
      &::before {
        content: "";
        position: absolute;
        width: 0;
        border-left: 50px solid transparent;
        border-right: 50px solid transparent;
        bottom: 100%;
        border-bottom: 28.87px solid #2b2b2b;
        transition: all .2s linear;
        }
      }
      &.row-moved {
        margin-left: 19px;
      }
    }
    .cursor {
      width:350px;
      height:350px;
      border-radius:100%;
      position: absolute;
      box-shadow: 2px -3px 41px -1px rgba(241,196,15,0.64);
      z-index: 0;
      opacity: 0;
      background: linear-gradient(45deg, #e8f74d, #ff6600d9, #00ff66, #13ff13, #ad27ad, #bd2681, #6512b9, #ff3300de, #5aabde);
      background-size: 400%;
      animation: glower 20s linear infinite;
      filter: blur(40px);

      @keyframes glower {
        0% {
          background-position: 0 0;
        }
        
        50% {
          background-position: 400% 0;
        }
        
        100% {
          background-position: 0 0;
        }
      }
    }
  }
</style>
