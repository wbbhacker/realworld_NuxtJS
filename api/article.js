import { request} from '@/plugins/request'

// 获取文章列表
export const getArticles = params => {
 
  return request({
    url: '/api/articles',
    method: 'GET',
    params
  })
}


// 获取文章标签
export const getTag = params => {
  return request({
    url: '/api/tags',
    method: 'GET',
    params
  })
}

// 关注用户文章
export const getFeed = params => {
  return request({
    url: '/api/articles/feed',
    method: 'GET',
    // headers:{
    //   Authorization: 'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTIyNDYyLCJ1c2VybmFtZSI6ImFkbWlud2FuZyIsImV4cCI6MTYwOTc1MTgxNX0.3cUG2a19OH-PYxAXy2jfgHkGNxtQLyva2xqEHP0kKnk'
    // },
    params
  })
}


// 添加点赞
export const addFavorite = slug => {
  return request({
    url: `/api/articles/${slug}/favorite`,
    method: 'POST'
  })
}




// 取消点赞
export const deleteFavorite = slug => {
  return request({
    url: `/api/articles/${slug}/favorite`,
    method: 'DELETE'
  })
}