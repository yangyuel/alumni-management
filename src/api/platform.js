import request from '@/utils/request'

/**
 *列表动态
 */
export const getCommunity = () => {
  return request({
    url: '/community/queryLatestCommunity',
    method: 'get'
  })
}
/**
 *列表新闻
 */
export const getNews = () => {
  return request({
    url: '/news/queryLatestNews',
    method: 'get'
  })
}
/**
 *列表活动
 */
export const getActivity = () => {
  return request({
    url: '/activity/queryLatestActivity',
    method: 'get'
  })
}
