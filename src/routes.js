import ShowBlogs from './components/ShowBlogs.vue'
import AddBlog from './components/AddBlog.vue' 
import SingleBlog from './components/SingleBlog.vue'

//返回一个对象
export default[
    {path:"/",component:ShowBlogs},
    {path:"/add",component:AddBlog},
    {path:"/blog/:id",component:SingleBlog},//路由的实现   根据id展示对应内容
]

//路由参数  根据一套模板跳转到某个位置  执行某个组件
