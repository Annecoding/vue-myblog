<template>
<!-- 双引号传值应该是字符串  字符串是要用引号引起来-->
  <div v-theme:column="'wide'" id="show-blogs">
    <h1>博客总览</h1>
    <input type="text"  v-model="search" placeholder="搜索">
    <!-- 遍历出所有的博客内容 filterBlogs -->
    <div v-for="blog in filteredBlogs" class="single-blog">
        <!-- 自定义指令v-rainbow使用  让标题改变颜色 -->
        <!-- 数据值都变成大写  过滤器实现 左边为拿到的值 用value接收-->
        <!-- 路由跳转--router.js--到单个的blog，顺便传过去id   v-bind绑定数据 showblog:id--singleblog:id -->
        <router-link v-bind:to="'/blog/' + blog.id">
          <h2 v-rainbow>{{blog.title | to-uppercase}}</h2>
        </router-link>
        <!-- 文章内容太长  点击详情再全部展示内容 -->
        <article>{{blog.body | snippet}}</article>
    </div>
  </div>
</template>

<script>
export default {
  name: 'show-blogs',
  data () {
    return {//返回对象
      blogs:[],
      search:""
    }
  },
  created(){//请求数据
      this.$http.get('./../static/posts.json')
                .then(function (data) {
                   // console.log(data);//请求对象 
                  this.blogs = data.body.slice(0,10);//展示10条数据
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
  //指令私有化方式 local Api
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
    box-sizing:border-box;/**/
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
