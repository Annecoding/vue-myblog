// 点击进来之后  就是单个blog
<template>
    <div id="single-blog">
        <h1>{{blog.title}}</h1>
        <p>作者：{{blog.author}}</p>
        <!-- :key数据优化 -->
        <p v-for="category in blog.categories" :key="category">分类：{{category}}</p>
  
        <article>正文：{{blog.content}}</article>
        <button @click="deleteSingleBlog()">删除</button>
        <!-- 编辑-根据id编辑哪个博客 /edit/-->
        <router-link :to= "'/edit/' + id">编辑博客</router-link>
    </div>
</template>

// 点击添加博客的时候  需要给个id
<script>
import axios from 'axios';//局部使用
export default {
    name:"single-blog",
    data(){
        return{
            id:this.$route.params.id,//请求路由参数id
            blog:{}//showblog请求的数据
        }
    },
    // 请求showblogs中的id  再把id给blog
    created(){
        //this.$http.get('https://vuedemo-864f4.firebaseio.com/posts/'+ this.id + ".json")
        axios.get('/posts/'+ this.id + ".json")
                  .then((data) => {//使用箭头函数可以使用上层this  箭头函数不会改变this指向
                    console.log(data);
                    //this.blog = data.body;
                    // return data.json();
                    this.blog = data.data;
                  })
                //   .then(function (data) {
                //       this.blog = data;
                //   })
    },
    methods:{//根据id删除数据
        deleteSingleBlog(){
            // this.$http.delete('/posts/'+ this.id + ".json")
            axios.delete('/posts/'+ this.id + ".json")
                      .then(response =>{
                          this.$router.push({path:'/'})
                      })
        }
    }
}
</script>

<style scoped>
#single-blog{ 
    max-width:960px;
    margin : 0 auto;
    padding: 20px;
    background: #eee;
    border:1px dotted #aaa;
}
h1{
    text-align: center;
}
button{
    display: block;
    margin:20px 0;
    background: cornflowerblue ;
    color:#fff;
    border:0;
    padding:14px;
    border-radius:10px;
    font-size: 18px;
    cursor: pointer; /**/ 
    float: right;
}
#single-blog a{
 display: block;
    margin:20px 0;
    background: cornflowerblue ;
    color:#fff;
    border:0;
    padding:14px;
    border-radius:10px;
    font-size: 18px;
    cursor: pointer; /**/ 
    text-decoration: none;
    width: 80px;   
}
</style>

