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

// 获取文章详情
export const getArticle = slug => {
  return request({
    url: `/api/articles/${slug}`,
    method: 'GET'
  })
}



// 获取文章评论
export const getComments = slug => {
  return request({
    url: `/api/articles/${slug}/comments`,
    method: 'GET'
  })
}


// 添加评论
export const addComment = (slug, comment) => {
  return request({
    url: `/api/articles/${slug}/comments`,
    method: 'POST',
    data:{
      'comment':{
        'body': comment
      }
    }
  })
}



// 删除评论
export const deleteComment = (slug, id) => {
  return request({
    url: `/api/articles/${slug}/comments/${id}`,
    method: 'DELETE'
  })
}


// 创建文章
export const createArticle = params => {
  return request({
    url: '/api/articles',
    method: 'POST',
    data: params
  })
}



// 删除文章
export const deleteArticle = slug => {
  return request({
    url: `/api/articles/${slug}`,
    method: 'DELETE',
  })
}


// 更新文章
export const updateArticle = (slug, article) => {
  return request({
    url: `/api/articles/${slug}`,
    method: 'PUT',
    data: article
  })
}
