import request from '@/utils/request'

export function getnews(listQuery) {
  return request({
    url: '/news/newsList',
    method: 'get',
    params: listQuery
  })
}

export function deletenews(id) {
  return request({
    url: '/news/newsList',
    method: 'delete',
    params: id
  })
}

export function modifynews(data) {
  return request({
    url: '/news/newsList',
    method: 'put',
    data
  })
}

export function addnews(data) {
  return request({
    url: '/news/newsList',
    method: 'post',
    data
  })
}
