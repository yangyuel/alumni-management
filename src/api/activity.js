import request from '@/utils/request'

/**
 *活动管理列表获取
 */
export const tableList = (data) => {
  return request({
    data,
    url: '/activity/query',
    method: 'get'
  })
}
/**
 * 添加活动
 */
export const addAct = (data) => {
  return request({
    data,
    url: '/activity/activity/add',
    method: 'post'
  })
}
/**
 * 删除活动
 */
export const deleteAct = (params) => {
  return request({
    params,
    url: '/activity/deleteAll',
    method: 'get'
  })
}
/**
 * 活动更新
 */
export const modifyAct = (data) => {
  return request({
    data,
    url: '/activity/activity/update',
    method: 'get'
  })
}
