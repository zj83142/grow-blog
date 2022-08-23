<template>
  <div class="detail" v-show="mode === 'add' || blog">
    <div class="d-header">
      <div>
        <span class="title" v-if="blog">{{blog.title}}</span>
        <span class="btns">
          <el-button v-if="mode !== 'detail'" @click="onCancel">取消</el-button>
          <el-button v-if="mode==='detail'" type="primary" @click="changeMode('edit')">编辑</el-button>
          <el-button v-else type="primary" @click="onSave">保存</el-button>
        </span>
      </div>
      <div class="desp" v-if="blog">
        <span>{{blog.username}}</span>
        <span>{{blog.updateTime}}</span>
        <span>{{blog.keyword}}</span>
      </div>
    </div>
    <el-divider border-style="dashed" style="margin: 12px 0" />
    <div ref="mdContent">
      <MdEditor
        class="md-editor"
        :key="mode"
        v-model="content" 
        :previewOnly="mode === 'detail'"
        :toolbarsExclude="toolbarsExclude"
      />
    </div>
  </div>
  <el-dialog v-model="isSave" :title="mode === 'add' ? '保存文章' : '更新文章'">
    <el-form>
      <el-form-item label="标题" :label-width="formLabelWidth">
        <el-input v-model="blog.title" autocomplete="off" />
      </el-form-item>
      
      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input
          v-model="blog.descript"
          :rows="4"
          type="textarea"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isSave=false">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
  import { watch, ref, toRefs, reactive, computed } from 'vue';
  import MdEditor from 'md-editor-v3'
  import { ElMessage } from 'element-plus'
  import moment from 'moment'
  import { useRoute, useRouter } from 'vue-router'
  import _, { isNull } from 'lodash'

  import { onSaveBlog, getBlogById } from '../../../api/blog'

  export default {
    components: { MdEditor },
    props: [ 'mode' ],
    setup(props: any, context: any) {
      const route = useRoute()
      const router = useRouter()
      const isSave = ref(false)
      const content = ref('')
      const mdContent = ref(null)
      const historyIds: string[] = []
      const data: any = reactive({
        isSave: false,
        blog: {title: '', descript: ''},
      })
      function onSave() {
        if (!content.value) {
          return ElMessage({
            message: '文章内容不能为空！',
            type: 'error'
          })
        }
        isSave.value = true
      }
      async function onSubmit() {
        const category = route.params.category
        const params = {
          ...(data.blog || {}),
          content: content.value,
          category
        }
        const res = await onSaveBlog(params)
        const {status, data: id } = res;
        if (res.status) {
          context.emit('onRefresh', id)
          isSave.value = false
        }
      }
      async function getBlogDetail(id: any) {
        const res = await getBlogById({id})
        const { status, data: info } = res || {}
        if (status) {
          if (data) {
            info.updateTime = moment(info.updateTime).format('YYYY-MM-DD HH:mm:ss')
          }
          data.blog = info
          content.value = info.content
        }
      }
      watch(() => route.params.id, (newVal: any, oldVal: any) => {
        if (newVal) {
          getBlogDetail(newVal)
          historyIds.unshift(newVal)
        } else {
          data.blog = {title: '', descript: ''}
          content.value = ''
        }
      }, { immediate: true })
      watch(() => props.mode, (newVal: any) => {
        if (newVal === 'add') {
          router.push(`/blog/${route.params.category}`)
        }
      }, { immediate: true })
      watch(content, (newVal: any) => {
        setTimeout(() => {
          getCatalogs()
        }, 800);
      })

      function getCatalogs() {
        const articleContent:any = mdContent.value;
        console.log('==articleContent=====', articleContent)
        console.log(articleContent?.childNodes)
        const nodes = ["H1", "H2", "H3", "H4", "H5", "H6"];
        let titles: any = [];
        const mapArticle = (nodeLs: any) => {
          if (nodeLs?.length > 0) {
            nodeLs.forEach((e:any, index:number) => {
              if (nodes.includes(e.nodeName)) {
                console.log('=====e=====>', e.id)
                const id = "header-" + index;
                e.setAttribute("id", id);
                titles.push({
                  id: id,
                  title: e.innerHTML,
                  level: Number(e.nodeName.substring(1, 2)),
                  nodeName: e.nodeName
                });
              }
              mapArticle(e?.childNodes)
            });
          }
        }
        mapArticle(articleContent?.childNodes)
        console.log('===titles==>', titles)
      }

      function changeMode(_mode: string) {
        context.emit('changeMode', _mode)
      }
      function onCancel() {
        if (historyIds.length > 0) { 
          context.emit('changeMode', 'detail')
          router.push(`/blog/${route.params.category}/${historyIds[0]}`)
        }
      }

      const toolbarsExclude = ['github', 'save']
      return {
        ...toRefs(data),
        formLabelWidth: '80px',
        toolbarsExclude,
        content,
        mdContent,
        changeMode,
        isSave,
        onSave,
        onSubmit,
        onCancel,
      }
    }
  }
</script>

<style lang="less" scoped>
  .detail {
    .d-header {
      min-height: 32px;
      .title {
        margin-right: 180px;
      }
      .btns {
          font-size: 16px;
          font-weight: bold;
          float: right;
        }
      .desp {
        color: #666;
        font-size: 12px;
        > span {
          padding-right: 12px;
        }
      }
    }
    .md-editor{
      padding: 4px 12px;
      box-shadow: 0px 4px 8px #ddd;
      border-radius: 4px;
    }
  }
</style>