import request from '@/utils/request'

/**
 *活动管理列表获取
 */
export const tableList = (data) => {
  return request({
    data,
    url: '/activity/selectOne1',
    method: 'get'
  })
}
