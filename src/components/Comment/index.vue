<template>
  <div class="comment">
    <h3>评论留言</h3>
    <el-input
      v-model="content"
      :rows="4"
      type="textarea"
    />
    <div class="submit-btn">
      <el-button  type="primary" @click="onSubmit">发送</el-button>
    </div>
  </div>
  <div v-for="item in msgLs" :key="item.id">
    <div class="msg-item">
      <div class="user-avatar"><img :src="item.from.avatar" /></div>
      <div>
        <div class="user-info"><span>{{item.from.username}}</span> 回复 <span>{{item.to.username}}</span> 于 {{item.date}}</div>
        <div class="content">{{item.content}}</div>
      </div>
    </div>
    <div v-if="item.children" >
      <div v-for="child in item.children" :key="child.id" class="child-msg">
        <div class="msg-item">
          <div class="user-avatar"><img :src="child.from.avatar" /></div>
          <div>
            <div class="user-info"><span>{{child.from.username}}</span> 回复 <span>{{child.to.username}}</span> 于 {{child.date}}</div>
            <div class="content">{{child.content}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs } from '@vue/reactivity'
  export default {
    setup() {
      const msgLs = [
        {
          id: 1,
          content: '非常棒',
          parentId: null,
          date: '2022-08-09 16:39',
          to: {
            username: '小黑',
          },
          from: {
            username: '李华',
            avatar: 'http://127.0.0.1:8085/imgs/4.jpg',
          },
          children: [
            {
              id: 2,
              content: '谢谢，我会继续努力的！',
              parentId: 1,
              date: '2022-08-09 18:04',
              to: {
                username: '李华',
                
              },
              from: {
                username: '小黑',
                avatar: 'http://127.0.0.1:8085/imgs/8.jpg',

              }
            },
          ]
        },
        {
          id: 3,
          content: '文章写的非常不错，学习了!',
          parentId: null,
          date: '2022-08-11 10:33',
          to: {
            username: '小黑'
          },
          from: {
            username: '大鱼海棠',
            avatar: 'http://127.0.0.1:8085/imgs/3.jpg',
          }
        },
      ]
      const data: any = reactive({
        content: null,
        msgLs
      })
      return {
        ...toRefs(data)
      }
    }
    
  }
</script>
<style lang="less" scoped>
  .comment {
    margin-top: 16px;
    h3 {
      margin-bottom: 6px;
    }
    .submit-btn {
      text-align: right;
      margin-top: 10px;
    }
  }
  .msg-item {
    color: #777;
    display: flex;
    margin-bottom: 16px;

    .user-avatar {
      height: 42px;
      width: 42px;
      line-height: 42x;
      text-align: center;
      margin-right: 16px;
      border-radius: 50%;
      overflow: hidden;
      > img {
        width: 100%;
      }
    }
    .user-info {
      margin-bottom: 4px;
      font-size: 12px;
      > span {
        margin-right: 6px;
        color: #36ace1;
      }
    }
    .content {
      color: #555;
    }
  }
  .child-msg {
    margin-left: 48px;
  }
</style>