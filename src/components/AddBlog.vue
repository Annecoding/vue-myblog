<template>
  <div id="add-blog">
    <h2>添加博客</h2>
    <!-- 在data()里面设定，当submmited为true的时候就会提交 -->
    <form v-if="!submmited">
        <label>博客标题</label>
        <input type="text" v-model="blog.title" required />

        <label>博客内容</label>
        <textarea v-model="blog.content"></textarea>

        <div id="checkboxes">
            <label>Vue.js</label>
            <input type="checkbox"  value="Vue.js" v-model="blog.categories"/>
            <label>Node.js</label>
            <input type="checkbox"  value="Node.js" v-model="blog.categories"/>
            <label>React.js</label>
            <input type="checkbox"  value="React.js" v-model="blog.categories"/>
            <label>Angular4.js</label>
            <input type="checkbox"  value="Angular4.js" v-model="blog.categories"/>
        </div>

        <label>作者：</label>
        <!-- 多个数据就放在数组里面 -->
        <!-- v-model绑定数据是选择了某个人  就放进去数据  -->
        <select v-model="blog.author">
            <option v-for="author in authors" :key="author">
                {{author}}
            </option>
        </select>
        <!-- prevent：阻止页面刷新 -->
        <button v-on:click.prevent="post">添加博客</button>
    </form>

    <!-- 只有为真才会展示，点击【添加博客】之后，this.submmited == true ，所以这时候submmited为真-->
    <div v-if="submmited">
        <h3>您的博客发布成功!</h3>
    </div>

    <div id="preview">
        <h3>博客总览</h3>
        <p>博客标题:{{blog.title}}</p>
        <p>博客内容:</p>
        <p>{{blog.content}}</p>
        <p>博客分类</p>
        <ul>
            <li v-for="category in blog.categories" :key="category">{{category}}</li>
        </ul>
        <p>作者：{{blog.author}}</p>
    </div>

  </div>
</template>

<script>
import axios from 'axios';//局部使用
export default {
  //https://jsonplaceholder.typicode.com/
  //https://jsonplaceholder.typicode.com/posts
  name: 'add-blog',
  data () {
    return {
      blog:{
          title:"",
          content:"",
          categories:[],//复选框  存入数组
          author:"",
      },
      authors:["Anne","Sanqi","Ami"],
      submmited:false//默认为假 是否已经提交了事件 什么时候会展示  点击之后为真
    }
  },
  methods:{
      post:function () { //提交所获得的数据
        //   this.$http.post("https://vuedemo-864f4.firebaseio.com/posts.json",this.blog
        //   {
        //                   title:this.blog.title,
        //                   body:this.blog.content,
        //                   userId:1
        //   }
        // var _this = this;//axios中当前this指向的是拥有function
        axios.post("https://vuedemo-864f4.firebaseio.com/posts.json",this.blog
        //   ).then(function(data){ //查看是否提交成功，成功则返回内容
           ).then((data) => {//使用ES6语法，箭头函数拿到的this为上一层的this，而不是axios不知道的this
            //   console.log(data);
              this.submmited = true;//点击添加博客按钮 submmited就变为true 来提交表单事件 --> 添加成功之后给个显示
            // _this.submmited = true;
          })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#add-blog *{
    box-sizing: border-box;
}
#add-blog{
    margin: 20px auto;
    max-width: 600px;
    padding: 20px;
}
label{
    display: block;
    margin: 20px 0 10px;
}
input[type="text"],textarea,select{
    display: block;
    width: 100%;
    padding: 8px;
}
textarea{
    height: 200px;
}
#checkboxes label{
    display: inline-block;/**/
    margin-top:0;
}
#checkboxes input{
    display: inline-block;
    margin-right: 10px;
}
button{
    display: block;
    margin:20px 0;
    background: cornflowerblue;
    color:#fff;
    border:0;
    padding:14px;
    border-radius:10px;
    font-size: 18px;
    cursor: pointer; /**/ 
}
#preview{
    padding: 10px 20px;
    border:1px dotted #ccc;
    margin: 30px 0;
}
h3{
    margin-top:10px;
}
</style>
