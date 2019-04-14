// 点击进来之后  就是单个blog
<template>
    <div id="single-blog">
        <h1>{{blog.title}}</h1>
        <article>{{blog.body}}</article>
    </div>
</template>

// 点击添加博客的时候  需要给个id
<script>
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
        this.$http.get('https://jsonplaceholder.typicode.com/posts/'+ this.id)
                  .then(function(data){
                    //   console.log(data);
                    this.blog = data.body;
                  })
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
</style>

