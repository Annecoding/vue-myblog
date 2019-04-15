//axios对url进行更多单独的配置  ---> showblogs中的使用展示
import axios from 'axios'
//配置全局的url
const instance = axios.create({
    baseURL:'https://vuedemo-864f4.firebaseio.com'
})
//请求头的配置 比如对token配置
//instance.defaults.headers.common['SOMETHING'] = 'SOMETHING'
//公开实例化的请求头
export default instance