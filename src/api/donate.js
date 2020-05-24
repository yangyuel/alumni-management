import request from '@/utils/request'

/**
 *活动管理列表获取
 */
export const tableList = (data) => {
  return request({
    data,
    url: '/donate/query',
    method: 'get'
  })
}
/**
 * 添加捐赠
 */
export const addDonate = (data) => {
  return request({
    data,
    url: '/donate/donate/add',
    method: 'post'
  })
}
/**
 * 删除捐赠
 */
export const deleteDonate = (params) => {
  return request({
    params,
    url: '/donate/donate/delete',
    method: 'get'
  })
}
/**
 * 编辑捐赠
 */
export const modifyDonate = (data) => {
  return request({
    data,
    url: '/donate/donate/update',
    method: 'get'
  })
}
