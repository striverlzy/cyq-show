<template>
  <div>
    <Header></Header>
    <div style="width: 50rem">
      <div class="ql-editor" v-html="content">{{content}}</div>
    </div>


  </div>
</template>


<script>
    import Header from '@/components/Header'
    import {getArticleById} from '@/pages/api/article'

    export default {
        data() {
            return {
                content: ''
            }
        },
        methods: {
            getLoadData() {
                let id = "1238074596201205760"
                getArticleById(id).then((res) =>{
                    console.info("getArticleById res",res.data.data)
                    this.content = res.data.data.content
                })
            }
        },
        components:{
            Header
        },
        created() {
            this.getLoadData()
        }
    }
</script>
<style>


</style>


