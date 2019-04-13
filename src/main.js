// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'

import App from './App'

Vue.config.productionTip = false
Vue.use(VueResource)
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
      el.style.background = "#6677cc";
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
