<template>
  <div ref="mdContent">
    <MdEditor v-model="content" :previewOnly="previewOnly" :toolbarsExclude="toolbarsExclude" />
  </div>
</template>
<script lang="ts">
  import { watch, ref, nextTick, onUpdated, onMounted } from 'vue';
  import MdEditor from 'md-editor-v3'
  import { useRoute, useRouter } from 'vue-router'
  export default {
    components: { MdEditor },
    props: ['content', 'previewOnly', 'toolbarsExclude'],
    setup(props: any) {
      const route = useRoute()
      const mdContent = ref(null);
      function getCatalogs() {
        const articleContent:any = mdContent.value;
        console.log(articleContent?.childNodes)
        const nodes = ["H1", "H2", "H3"];
        let titles: any = [];
        const mapArticle = (nodeLs: any) => {
          if (nodeLs?.length > 0) {
            nodeLs.forEach((e:any, index:number) => {
              if (nodes.includes(e.nodeName)) {
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
      watch(() => route.params.id, (newVal: any, oldVal: any) => {
        nextTick(() => getCatalogs())
      })

      return {
        mdContent,
      }
    },
   
  }
</script>