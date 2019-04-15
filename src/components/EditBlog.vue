<template>
  <div id="edit-blog">
    <h2>编辑博客</h2>
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
            <option v-for="author in authors">
                {{author}}
            </option>
        </select>
        <!-- prevent：阻止页面刷新 -->
        <button v-on:click.prevent="post">编辑博客</button>
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
            <li v-for="category in blog.categories">{{category}}</li>
        </ul>
        <p>作者：{{blog.author}}</p>
    </div>

  </div>
</template>

<script>
export default {
  //https://jsonplaceholder.typicode.com/
  //https://jsonplaceholder.typicode.com/posts
  name: 'edit-blog',
  data () {
    return {
      id:this.$route.params.id,
    //   blog:{
    //       title:"",
    //       content:"",
    //       categories:[],//复选框  存入数组
    //       author:"",
    //   },
      blog:{},
      authors:["Anne","Sanqi","Ami"],
      submmited:false//默认为假 是否已经提交了事件 什么时候会展示  点击之后为真
    }
  }, 
  methods:{
      fetchData(){
          console.log(this.id);//获取到的id
          this.$http.get("https://vuedemo-864f4.firebaseio.com/posts/" + this.id + ".json")
                    .then(response => {
                        console.log(response.body);
                        this.blog = response.body;
                    })
      },
      post:function () { //编辑所获得的数据
          this.$http.put("https://vuedemo-864f4.firebaseio.com/posts/" + this.id + ".json",this.blog
        //   {
        //                   title:this.blog.title,
        //                   body:this.blog.content,
        //                   userId:1
        //   }
          ).then(function(data){ //查看是否提交成功，成功则返回内容
              console.log(data);
              this.submmited = true;//点击添加博客按钮 submmited就变为true 来提交表单事件 --> 添加成功之后给个显示
          })
      }
  },
  created(){//进入编辑页面先请求数据回显
    this.fetchData();//调用一个方法
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#edit-blog *{
    box-sizing: border-box;
}
#edit-blog{
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
    border-radius:4px;
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
