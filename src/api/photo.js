import request from '@/utils/request'

/**
 *
 */
export const tableList = (data) => {
  return request({
    data,
    url: '/photo/schoolmate/query',
    method: 'get'
  })
}
/**
 *
 */
export const addPhoto = (data) => {
  return request({
    data,
    url: '/photo/photo/add',
    method: 'post'
  })
}

export const downloadPhoto = (params) => {
  return request({
    params,
    url: '/common/getFile',
    method: 'get'
  })
}
