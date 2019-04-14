// 路由的链接组件
<template>
    <nav>
        <ul>
            <li>
                <router-link to="/" exact>博客</router-link>
            </li>
            <li>
                <router-link to="/add" exact>添加博客</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name:"blog-header"
}
</script>

<style scoped>
ul{
    list-style-type: none;/**/
    text-align: center;
    margin: 0;
}
li{
    display: inline-block;/**/
    margin: 0 10px;
}
/* 元素为<a></a>标签 */
a{
    color:#fff;
    text-decoration:none;
    padding:12px;
    border-radius: 5px; 
}
nav{
    background:cornflowerblue ;
    padding:30px 0;
    margin-bottom: 40px; 
}
.router-link-active{/*一个类*/
    background: rgba(255, 255, 255, 0.8);
    color:#444;
}
</style>
