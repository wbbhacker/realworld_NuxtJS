import { request } from '@/plugins/request'

// 用户登录
export const login = data => {
  return request({
    url: '/api/users/login',
    method: 'POST',
    data
  })
}


// 用户注册
export const register = data => {
  return request({
    url: '/api/users',
    method: 'POST',
    data
  })
}



// follow 用户
export const followUser = username => {
  return request({
    url: `/api/profiles/${username}/follow`,
    method: 'POST',
  })
}


// unfollow 用户
export const unfollowUser = username => {
  return request({
    url: `/api/profiles/${username}/follow`,
    method: 'DELETE',
  })
}


// 获取当前用户信息
export const getUser = username => {
  return request({
    url: 'api/user',
    method: 'GET',
  })
}
// 更新用户信息
export const updateUser = user => {
  return request({
    url: 'api/user',
    method: 'PUT',
    data: user
  })
}
