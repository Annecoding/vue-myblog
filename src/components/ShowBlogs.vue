<template>
<!-- 双引号传值应该是字符串  字符串是要用引号引起来-->
  <div v-theme:column="'wide'" id="show-blogs">
    <h1>博客总览</h1>
    <input type="text"  v-model="search" placeholder="搜索">
    <!-- 遍历出所有的博客内容 filterBlogs -->
    <!-- key值只能是string、number，不能是对象 -->
    <div v-for="blog in filteredBlogs" class="single-blog">
        <!-- 自定义指令v-rainbow使用  让标题改变颜色 -->
        <!-- 数据值都变成大写  过滤器实现 左边为拿到的值 用value接收-->
        <!-- 路由跳转--router.js--到单个的blog，顺便传过去id   v-bind绑定数据 showblog:id--singleblog:id -->
        <router-link v-bind:to="'/blog/' + blog.id">
          <h2 v-rainbow>{{blog.title | to-uppercase}}</h2>
        </router-link>
        <!-- 文章内容太长  点击详情再全部展示内容 -->
        <article>
          <!-- {{blog.body | snippet}} -->
           {{blog.content | snippet}} 
         </article>
    </div>
  </div>
</template>

<script>
import axios from 'axios';//局部使用
export default {
  name: 'show-blogs',
  data () {
    return {//返回对象
    // response中所有的对象Object放在blogs[]里面
      blogs:[],
      search:""
    }
  },
  created(){//请求数据
      // this.$http.get('https://vuedemo-864f4.firebaseio.com/posts.json')
      axios.get('https://vuedemo-864f4.firebaseio.com/posts.json')
                .then(function (data) {
                  // console.log(data.json());//请求对象 
                  // return data.json();
                  // data数据不在是个数组 而是一个对象
                  // this.blogs = data.body.slice(0,10);//展示10条数据
                  // console.log(data.data);//axios
                  return data.data;
                })
                .then((data) => {
                  var blogsArray = [];
                  for(let key in data){
                    // console.log(key);//key为数据库所创建的唯一标识  --> 赋给id
                    // console.log(data[key]);//打印出每个对象的属性等等
                    data[key].id = key;//给对象添加属性id
                    blogsArray.push(data[key]);
                  }
                  //console.log(blogsArray);
                  this.blogs = blogsArray;
                  // console.log(this.blogs);
                })
  },
  computed:{
      filteredBlogs:function(){//获取data中blogs[]内容  拿到之后匹配标题相关的值展示出来
        return this.blogs.filter((blog) =>{
            return blog.title.match(this.search)//搜索到相关的(不区分大小写)  只展示相关内容  否则全部都做展示
        })
      }
  },
  //方法私有化 过滤器私有化
  filters:{
    //   "to-uppercase":function (value) {
    //       return value.toUpperCase();
    //   },
    //添加私有过滤器
    toUppercase (value) {
        return value.toUpperCase();
    },
  },
  //指令私有化方式 local Api 改变h2标签颜色
  directives: {
      'rainbow':{//对象
        bind (el,binding,vnode){
            el.style.color = "#" + Math.random().toString(16).slice(2,8);
        }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#show-blogs{
    max-width: 800px;
    margin: 0 auto;
}
h1{
    text-align: center;
}
.single-blog{
    padding:20px;
    margin:20px 0;
    box-sizing:border-box;/*不会超过盒子容器*/
    background: #eee;
    border:1px dotted #aaa;
}
#show-blogs a{
  color: #444;
  text-decoration: none;
}
input[type="text"]{
  padding:8px;
  width:100%;
  box-sizing:border-box;/*对齐形式展示*/
}
</style>
