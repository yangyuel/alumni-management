import request from '@/utils/request'

export function tableList(listQuery) {
  return request({
    url: '/user/schoolmate/query',
    method: 'get',
    params: listQuery
  })
}

export function deleteUser(params) {
  return request({
    url: '/user/schoolmate/deleteAll',
    method: 'get',
    params
  })
}

export function modifyUser(data) {
  return request({
    url: '/user/userList',
    method: 'put',
    data
  })
}

export function addUser(data) {
  return request({
    url: '/user/userList',
    method: 'post',
    data
  })
}
export function login(params) {
  return request({
    url: '/login/user/login',
    method: 'post',
    params
  })
}
