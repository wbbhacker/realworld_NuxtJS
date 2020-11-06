

// 基于 axios 封装的请求模块
import axios from 'axios'

export const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})


export default ({store})=>{

  // 请求拦截器
  

  // 响应拦截
  // 添加请求拦截器
  request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log('>>>request:')
    console.log(config.url)
    
    const { user } = store.state
    if(user && user.token){
      config.headers = {
        Authorization: `Token ${user.token}`
      }
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  // // 添加响应拦截器
  request.interceptors.response.use(function (response) {
    console.log('<<<response:')
    // 对响应数据做点什么
    console.log(response.config.url)
    console.log(response.data) 
    return response
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
}


// export default request