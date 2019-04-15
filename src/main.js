// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an aliase
// 用axios替换resource  get put post delete  resource官方已不再更新
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router';
import App from './App'
import Routes from './routes'
import axios from 'axios'

//全局配置
axios.defaults.baseURL = 'https://vuedemo-864f4.firebaseio.com'
// axios.defaults.headers.common['Authorization'] = 'Token'//请求数据时候，比如登录 要求有tocken的值 只有tocken验证成功  才可以登录
// axios.defaults.headers.post['Contnet-type'] = 'application/urlencode'
// axios.defaults.headers.get['Accepts'] = 'application/json'


Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(VueRouter)

//全局API
//v-rainbow  自定义指令使用  改变h2标题标签颜色
// Vue.directive('rainbow', {
//   bind(el,binding,vnode){
//     //彩虹色 #+六位数字
//     el.style.color = "#" + Math.random().toString().slice(2,8);
//   }
// })

//v-theme 自定义参数使用  改变宽度
Vue.directive('theme',{
  bind(el,binding,vnode){
    if (binding.value == 'wide') {//所传值为wide
      el.style.maxWidth = "1260px";
    }else if(binding.value == "narrow"){//所传值为narrow
      el.style.minWidth == "560px";
    }
    if(binding.arg == 'column'){//v-theme自定义参数传值，如果为column,则给其一个背景和padding
      el.style.background = "cornflowerblue";
      el.style.padding = '20px';
    }
  }
})
//自定义过滤器 实现标题都变为大写  实现全局搜索功能 
// Vue.filter("to-uppercase", function (value) {//形参接收管道左边的值
//   return value.toUpperCase();//标题变为大写
// })
//自定义过滤器  实现文章内容部分展示功能
Vue.filter("snippet",function(value){
  return value.slice(0,100) + "...";//实现截取文章展示
})


//创建路由并调用路由
const router = new VueRouter({
  routes:Routes, //使用路由-->router.js
  mode:"history" //去掉路径的#
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router:router,//最大的一层容器里面去使用
})
