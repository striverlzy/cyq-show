import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from "./store/store";
import ViewUI from 'view-design'
import axios from 'axios'
import VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'view-design/dist/styles/iview.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)
Vue.use(ViewUI)
Vue.config.productionTip = false
Vue.prototype.$http = axios;

// 全局路由构造函数，判断是否登录和要跳转到页面
router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.requiresAuth)) {    // 需要登录
    if (window.localStorage.token) {
      ViewUI.LoadingBar.start();
      next()
    } else if (to.path !== '/login') {
      let token = window.localStorage.token;
      if (token === 'null' || token === '' || token === undefined) {
        ViewUI.LoadingBar.start();
        next({path: '/login'})
      }
    } else {
      ViewUI.LoadingBar.start();
      next()
    }
  } else {   // 不需要登录
    ViewUI.LoadingBar.start();
    next()
  }
})

//添加请求拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.common['token'] = store.state.token
    }
    return config;
  },
  error => {
    router.push('/login')
    //对请求错误做什么
    return Promise.reject(error);
  })

//http reponse响应拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token');
          router.push({
            path: '/login',
            query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
          })
      }
    }
  })

// router.beforeEach((to, from, next) => {
//   ViewUI.LoadingBar.start();
//   next();
// });

router.afterEach(route => {
  ViewUI.LoadingBar.finish();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
