// import { param2Obj } from '@/utils'
import Mock from 'mockjs'
import { param2Obj, getNowFormatDate } from '@/utils'

const index = []
const Random = Mock.Random
for (let i = 0; i < 10; i++) {
  index.push(Mock.mock({
    id: '@increment(0)',
    'actName|1': ['北京经济论坛', '测试活动', '趣味运动会', '新校友见面会', '秋游'],
    stuName: '@cname',
    actDate: '@date("yyyy-MM-dd")',
    actSite: '@province' + '@city' + '@county',
    'state|1': ['1', '2'],
    actImage: Random.image('50x50', '#50B347', '#FFF', 'Mock.js')
  }))
}

export default {
  tableList: config => {
    // XXX: 此处应该根据token值返回符合权限的用户
    // 例如当前用户是admin, 则应该只能返回role是editor或者vistor的用户
    const { management, name, page, limit } = param2Obj(config.url)
    const mockList = index.filter(item => {
      if (name && item.actName.indexOf(name) < 0) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  },
  deletUser: config => {
    // console.log(config)
    const { ids } = param2Obj(config.url)
    console.log(ids)
    const idsList = JSON.parse(ids)
    console.log('要删除的id数组' + idsList)
    idsList.forEach(id => {
      const deleteId = index.findIndex(item => {
        return id === item.id
      })
      index.splice(deleteId, 1)
    })

    return { data: 'success' }
  },
  modifyUser: config => {
    const data = JSON.parse(config.body)
    const id = index.findIndex(item => {
      return data.id === item.id
    })
    data.modifyTime = getNowFormatDate()
    index[id] = data
    return { data: 'success' }
  },
  addUser: config => {
    const data = JSON.parse(config.body)
    data.modifyTime = getNowFormatDate()
    data.createdTime = getNowFormatDate()
    index.push(data)
    return { data: 'success' }
  }
}
