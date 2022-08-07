<template>
  <div class="random-color" :class="theme">
    <div class="logo">
      <h1 class="head">
        随机颜色 
        <el-button-group class="number-btns">
          <el-button type="primary" @click="changLen(0)">
            <el-icon><Minus /></el-icon>
          </el-button>
          <el-button type="primary">{{colors.length}}</el-button>
          <el-button type="primary" @click="changLen(1)">
            <el-icon><Plus /></el-icon>
          </el-button>
        </el-button-group>
      </h1>
      <span class="icon" @click="changeTheme">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-sun theme-icon"
          :class="{active: theme === 'light'}"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <circle cx="12" cy="12" r="4" />
          <path d="M3 12h1M12 3v1M20 12h1M12 20v1M5.6 5.6l.7 .7M18.4 5.6l-.7 .7M17.7 17.7l.7 .7M6.3 17.7l-.7 .7" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon theme-icon icon-moon"
          :class="{active: theme === 'dark'}"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          @click="theme === 'dark'"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <path d="M16.2 4a9.03 9.03 0 1 0 3.9 12a6.5 6.5 0 1 1 -3.9 -12" />
        </svg>
      </span>
    </div>
    <div class="wrapper">
      <main>
        <div class="palette" @click="copeColor">
          <div 
            v-for="(item, index) in colors"
            :key="index"
            class="color" 
            :style="{backgroundColor: item}"
          >
            {{item}}
          </div>
        </div>
        <button type="button" class="btn" @click="generate">GENERATE</button>
      </main>
    </div>
    <textarea name="copyArea" cols="30" rows="3" style="position: absolute; left: -9999px; top: 0;"></textarea>
  </div>
</template>
<script lang="ts">
  import { reactive, toRefs, watch } from 'vue'
  import { ElMessage } from 'element-plus'
  export default {
    setup() {
      const hex = 'abcdef123456789'
      const data = reactive({
        theme: 'light',
        len: 4,
        colors: []
      })
      function changeTheme() {
        data.theme = data.theme === 'dark' ? 'light' : 'dark'
      }
      function randHex() {
        let hexString = '#'
        for (let i = 0; i < 6; i++) {
          hexString += hex[Math.round(Math.random() * 6)];
        }
        return hexString
      }
      function copyToClipboard(str: string) {
        const el = document.querySelector('textarea');
        if (el) {
          el.value = str;
          el.select();
          el.setSelectionRange(0, 99999);
          document.execCommand('copy');
        }
      }
      function generate() {
        const colors: any = Array.from({length: data.len}, (_v, k) => randHex())
        data.colors = colors;
      }
      function copeColor(e: any) {
        const color = window.getComputedStyle(e.target).backgroundColor
        copyToClipboard(color);
        ElMessage({
          message: `复制 ${color} 成功！`,
          type: 'success'
        })
      }
      function changLen(type: number) {
        if (type === 1) {
          data.len ++
        } else {
          if (data.len !== 1) {
            data.len --
          }
        }
      }
      watch(() => data.len, (newVal) => {
        generate()
      }, { immediate: true })

      return {
        ...toRefs(data),
        changeTheme,
        copeColor,
        generate,
        changLen
      }
    },
  }
</script>
<style lang="less" scoped>
  .dark {
    --btn-clr: #42506b;
    --txt-clr: #fff;
    --background: #011b34;
  }

  .light {
    --btn-clr: #3e619b;
    --txt-clr: #333;
    --background: #fff;
  }
  .random-color {
    position: relative;
    background-color: var(--background);
    color: var(--txt-clr);

    button {
      border: none;
      background-color: #eee;
      cursor: pointer;
    }

    .logo {
      height: 54px;
      line-height: 54px;
      position: relative;
      h1 {
      }
      .icon {
        width: 80px;
        position: absolute;
        top: 6px;
        right: 0;
      }

      .icon svg {
        display: none;
        position: absolute;
        cursor: pointer;
        &.active {
          display: block;
        }
      }
      .number-btns {
        button {
          width: 45px;
          background: #3abba3;
        }
      }
    }

    .wrapper {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      min-height: 100vh;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
    }

    h1,
    .head,
    .btn {
      letter-spacing: 0.1875rem;
    }

    h1 {
      font-family: Montserrat, sans-serif;
      margin-bottom: 3rem;
      text-align: center;
    }

    .btn {
      font-family: Lato, sans-serif;
      padding: 1rem 2.5rem;
      border-radius: 3rem;
      background-color: var(--btn-clr);
      color: white;
      display: block;
      margin: 2.5rem auto 0 auto;
    }

    .btn:active {
      -webkit-transform: scale(0.96);
      transform: scale(0.96);
    }

    .palette {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
    }

    .palette .color {
      height: 20rem;
      line-height: 20rem;
      width: 6.25rem;
      background-color: #eee;
      -ms-flex-negative: 1;
      flex-shrink: 1;
      -webkit-box-flex: 0;
      -ms-flex-positive: 0;
      flex-grow: 0;
      border-radius: 3rem;
      cursor: pointer;
      color: #333;
      text-align: center;
    }

    .palette .color:hover {
      -webkit-transform: scale(1.05);
      transform: scale(1.05);
    }

    .palette .color:active {
      -webkit-transform: scale(1);
      transform: scale(1);
    }

    .palette .color + .color {
      margin-left: 1rem;
    }
  }
</style>
