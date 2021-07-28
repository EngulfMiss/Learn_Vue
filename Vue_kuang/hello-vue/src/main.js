import Vue from 'vue'
import App from './App'

import router from './route'  //把路由配置进来
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(router);
Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
