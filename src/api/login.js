import request from '@/utils/request'
import md5 from 'js-md5'

export function loginByUsername(params) {
  return request({
    params,
    url: '/login',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function setUserInfo(username, password) {
  var pass = md5(password)
  const data = {
    username,
    pass
  }
  return request({
    url: '/user/info',
    method: 'post',
    data
  })
}
