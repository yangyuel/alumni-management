import request from '@/utils/request'

/**
 *列表获取
 */
export const tableList = (data) => {
  return request({
    data,
    url: '/news/query',
    method: 'get'
  })
}
/**
 *添加公告
 */
export const addNews = (data) => {
  return request({
    data,
    url: '/news/News/creation',
    method: 'post'
  })
}
/**
 *删除公告
 */
export const deleteNews = (data) => {
  return request({
    data,
    url: '',
    method: ''
  })
}
/**
 * 编辑公告
 */
export const modifyAct = (data) => {
  return request({
    data,
    url: '/activity/activity/update',
    method: 'get'
  })
}