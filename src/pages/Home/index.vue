<template>
  <div class="banner" >
    <div class="header" >
      <MyHeader :type="'home'"></MyHeader>
    </div>
    <div class="warp">
      <div class="content">
        <h3>学如逆水行舟，不进则退！</h3>
        <p>勤学如初起之苗，不见其增，日有所长；辍学如磨刀之石，不见其损，日有所亏！</p>
        <p>相信，越努力就越幸福！</p>
        <el-button type="danger" size="large" round>开始积累</el-button>
      </div>
      <img src="./imgs/slider-icon.png" />
    </div>
  </div>
  <div class="articals">
    <div class="art-item">
      <div class="art-title">
        <div class="img">
          <img src="./imgs/service-icon-01.png" />
        </div>
      </div>
      <div class="art-cotent">
        Express是基于Node.js平台，快速、开放、极简的web开发框架，通俗的理解：Express的作用和Node.js内置的http模块类似，是专门用来创建web服务器的。Express的本质：就是npm上的第三方包，提供了快速创建web服务器的便捷方式
      </div>
    </div>
    <div class="art-item">
      <div class="art-title">
         <div class="img">
          <img src="./imgs/service-icon-02.png" />
        </div>
      </div>
      <div class="art-cotent">
        Express是基于Node.js平台，快速、开放、极简的web开发框架，通俗的理解：Express的作用和Node.js内置的http模块类似，是专门用来创建web服务器的。Express的本质：就是npm上的第三方包，提供了快速创建web服务器的便捷方式
      </div>
    </div>
    <div class="art-item">
      <div class="art-title">
         <div class="img">
          <img src="./imgs/service-icon-03.png" />
        </div>
      </div>
      <div class="art-cotent">
        Express是基于Node.js平台，快速、开放、极简的web开发框架，通俗的理解：Express的作用和Node.js内置的http模块类似，是专门用来创建web服务器的。Express的本质：就是npm上的第三方包，提供了快速创建web服务器的便捷方式
      </div>
    </div>
  </div>
  <div class="segment">
    <div>
      <img src="./imgs/left-image.png" />
    </div>
    <div class="desp-content" style="margin-left: 36px;">
      <h3 class="title">日志</h3>
      <p>“不积跬步，无以至千里；不积小流，无以成江海！”</p>
      <p>记录日常工作中的知识点是很重要的事情，可以加深记忆，也有利于回顾。日志支持二级类目，目前类目是固定的，后期考虑做成数据库存储，支持到个人粒度！</p>
      <el-button type="danger" size="large" round>进入日志</el-button>
    </div>
  </div>
  <div class="segment">
    <div class="desp-content" style="margin-right: 36px;">
      <h3 class="title">工具</h3>
      <p>“故工欲善其事，必先利其器！”</p>
      <p>积累一些小工具，如渐变背景色、随机选取颜色、浏览器调试代码片段... 等等</p>
      <el-button type="danger" size="large" round>进入工具</el-button>
    </div>
    <div>
      <img src="./imgs/right-image.png" />
    </div>
  </div>
  <div class="picture-segment">
    <div class="title">图库</div>
    <div class="grid">
      <ul id="hexGrid">
        <li class="hex" v-for="(item, index) in imgs" :key="index" >
          <div class="hexIn">
            <a class="hexLink" href="#">
              <div class='img' :style="{backgroundImage: `url(${item})`}"></div>
              <h1 id="demo1">This is a title</h1>
              <p id="demo2">Some sample text about the article this hexagon leads to</p>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div class="footer">
    遇见 · 更好的自己
  </div>
</template>
<script lang="ts">

import MyHeader from '../../components/Layout/MyHeader.vue'
export default {
  components: { MyHeader },
  setup() {
    const imgs = Array.from({length: 14}, (_v, k) => `http://127.0.0.1:8085/imgs/${k + 1}.jpg`)
    return {
      imgs
    }
  },
}
</script>


<style lang="less" scoped>

  .banner {
    min-height: 100vh;
    background: url('./imgs/bg.jpg');

    .header {
      background: #483eaa91;
      box-shadow: 0 2px 4px #1f2f94;
    }
    .warp {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 48px 20px 8%;

      .content {
        color: #fff;
        > h3 {
          font-size: 2em;
          margin-bottom: 16px;
        }
        > p {
          margin-bottom: 8px;
        }
        button {
          margin-top: 24px;
          width: 180px;
        }
      }
    }
  }
  .articals {
    width: 80%;
    margin: 24px auto;
    display: flex;
    flex-wrap: wrap;
    color: #333;
    .art-item {
      width: 33%;
      padding: 24px 24px 0 24px;
      flex-shrink: 0;

      .art-title {
        background: #9ca6f1;
        padding: 12px;
        border-radius: 6px 6px 0 0;
        > .img {
          background: #6e7ece96;
          border-radius: 50%;
          width: 80px;
          height: 80px;
          text-align: center;
          padding: 15px;
          margin: 0 auto;
        }
      }
      .art-cotent {
        padding: 16px;
        box-shadow: 0px 2px 4px #ddd;
        font-size: 0.9em;
        line-height: 1.8em;
      }
    }
  }
  .segment {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 42px 6%;
    color: #333;
    img {
      width: 540px;
    }
    .desp-content {
      flex-grow: 1;
      p {
        margin-bottom: 8px;
        line-height: 1.6em;
      }
      button {
        margin-top: 24px;
        width: 140px;
      }
    }
  }
  .title {
    font-size: 1.8em;
    width: 60px;
    border-bottom: 4px solid #8edeef;
    margin-bottom: 32px;
  }
  .picture-segment {
    margin-bottom: 42px;
    .title {
      margin: 0 auto 36px;
      text-align: center;
    }
    #hexGrid {
      display: flex;
      flex-wrap: wrap;
      width: 90%;
      margin: 0 auto;
      overflow: hidden;
      font-family: sans-serif;
      list-style-type: none;
    }

    .hex {
      position: relative;
      visibility:hidden;
      outline:1px solid transparent; /* fix for jagged edges in FF on hover transition */
      transition: all 0.5s;
      backface-visibility: hidden;
      will-change: transform;
      transition: all 0.5s;
    }
    .hex::after{
      content:'';
      display:block;
      padding-bottom: 86.602%;  /* =  100 / tan(60) * 1.5 */
    }
    .hexIn{
      position: absolute;
      width:96%;
      padding-bottom: 110.851%; /* =  width / sin(60) */
      margin: 2%;
      overflow: hidden;
      visibility: hidden;
      outline:1px solid transparent; /* fix for jagged edges in FF on hover transition */
      -webkit-transform: rotate3d(0,0,1,-60deg) skewY(30deg);
          -ms-transform: rotate3d(0,0,1,-60deg) skewY(30deg);
              transform: rotate3d(0,0,1,-60deg) skewY(30deg);
      transition: all 0.5s;
    }
    .hexIn * {
      position: absolute;
      visibility: visible;
      outline:1px solid transparent; /* fix for jagged edges in FF on hover transition */
    }
    .hexLink {
        display:block;
        width: 100%;
        height: 100%;
        text-align: center;
        color: #fff;
        overflow: hidden;
        -webkit-transform: skewY(-30deg) rotate3d(0,0,1,60deg);
            -ms-transform: skewY(-30deg) rotate3d(0,0,1,60deg);
                transform: skewY(-30deg) rotate3d(0,0,1,60deg);
    }
    .hex img {
      left: -100%;
      right: -100%;
      width: auto;
      height: 100%;
      margin: 0 auto;
    }
    .hex h1, .hex p {
      width: 100%;
      padding: 5%;
      box-sizing:border-box;
      font-weight: 300;
      opacity: 0;
    }

    #demo1 {
      color: #F5CE95;
      text-transform: capitalize;
      text-align: center;
      bottom: 50%;
      padding-top:50%;
      font-size: 1.5em;
      z-index: 1;
    }
    .hex h1:before, .hex h1:after {
      display: inline-block;
      margin: 0 0.5em;
      width: 0.25em;
      height: 0.03em;
      background: #ffffff;
      content: '';
      vertical-align: middle;
      transition: all 0.3s;
      text-align:center;
    }

    #demo2 {
      top: 50%;
      text-align: center;
      text-transform: uppercase;
        
    }
    .img {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-position: center center;
      background-size: cover;
      overflow: hidden;
      -webkit-clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
      clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    }

    .img:before, .img:after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      content: '';
      opacity: 0;
      transition: opacity 0.5s;
    }
    .img:before {
      background: rgba(22, 103, 137, 0.3)
    }
    .img:after {
      background: linear-gradient(to top, transparent, rgba(0, 0, 0, 0.5), transparent);
    }
    .hexLink:hover h1, .hexLink:focus h1,
    .hexLink:hover p, .hexLink:focus p{
      opacity:1;
      transition: 0.8s;
    }
    .hexIn:hover .img:before,
    .hexIn:hover .img:after,
    .hexIn:hover .hexLink {
      opacity: 1;
    }
    @media (min-width:1201px) { /* <- 5-4  hexagons per row */
      #hexGrid{
        padding-bottom: 4.7%
      }
      .hex {
        width: 20%; /* = 100 / 5 */
      }
      .hex:nth-child(9n+6){ /* first hexagon of even rows */
        margin-left:10%;  /* = width of .hex / 2  to indent even rows */
      }
    }

    @media (max-width: 1200px) and (min-width:901px) { /* <- 4-3  hexagons per row */
      #hexGrid{
        padding-bottom: 5.5%;
        font-size: 13px;
      }
      .hex {
        width: 25%; /* = 100 / 4 */
      }
      .hex:nth-child(7n+5){ /* first hexagon of even rows */
        margin-left:12.5%;  /* = width of .hex / 2  to indent even rows */
      }
    }

    @media (max-width: 900px) and (min-width:601px) { /* <- 3-2  hexagons per row */
      #hexGrid{
        padding-bottom: 7.4%;
        font-size: 14px;
      }
      .hex {
        width: 33.333%; /* = 100 / 3 */
      }
      .hex:nth-child(5n+4){ /* first hexagon of even rows */
        margin-left:16.666%;  /* = width of .hex / 2  to indent even rows */
      }
    }

    @media (max-width: 600px) { /* <- 2-1  hexagons per row */
      #hexGrid{
        padding-bottom: 11.2%;
        font-size: 12px;
      }
      .hex {
        width: 50%; /* = 100 / 3 */
      }
      .hex:nth-child(3n+3){ /* first hexagon of even rows */
        margin-left:25%;  /* = width of .hex / 2  to indent even rows */
      }
    }
    @media (max-width: 400px) {
      #hexGrid {
          font-size: 8px;
      }
    }
  }
  .footer {
    height: 64px;
    background: #242d75;
    border-top: 6px solid #a9b1f2;
    color: #dfdede;
    line-height: 64px;
    text-align: center;
  }

</style>