<template>
  <div>
    <Header></Header>
    <Index></Index>
  </div>
</template>

<script>
    import Header from '@/components/Header'
    import Index from '@/pages/main/index'
    import {getAll} from '@/pages/api/gathering'
    import '@/assets/plugins/normalize-css/normalize.css'
    import '@/assets/plugins/yui/cssgrids-min.css'
    import '@/assets/plugins/sui/sui.min.css'
    import '@/assets/plugins/sui/sui-append.min.css'
    import '@/assets/plugins/font-awesome/css/font-awesome.min.css'
    import '@/assets/css/widget-base.css'
    import '@/assets/css/page-sj-activity-index.css'
    import '@/assets/css/widget-head-foot.css'
    import '@/assets/css/page-sj-headline-login.css'
    export default {
        name: 'HelloWorld',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        methods: {
            getLoadData() {
                // getAll().then((res) => {
                //     if(res.data.code === 20000){
                //         console.log("22222222222222")
                //     }
                //     console.log("res", res)
                // })
            }
        },
        created() {
            this.getLoadData()
        },
        components:{
            Index,
            Header
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
