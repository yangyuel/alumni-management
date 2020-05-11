import request from '@/utils/request'

/**
 *列表获取
 */
export const tableList = (data) => {
  return request({
    data,
    url: '/donate/query',
    method: 'get'
  })
}

