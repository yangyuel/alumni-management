<template lang="pug">
el-row(:gutter="100" style="padding: 100px")
  el-col(:span="16")
    h2.title 最新动态
    div.myInfo(:data="myInfo")
      el-row
        img.myimg(:src = "myInfo.avatar")
        span(style="vertical-align:middle") {{ myInfo.stuName }}
  el-col.right(:span="8")
    el-row
      h3.actTitle 推荐活动
      ul.activities(:data="activities")
        li(v-for="(item, i) in activities" :key="i")
          h4 {{ item.actname }}
          div
            p {{ item.actsite }}
            p {{ item.actdate }}
    el-row
      h3.actTitle 新闻公告
      ul.news(:data="news")
        li(v-for="(item, i) in news" :key="i")
          div {{ item.name }}
          div {{ item.ctime }}
</template>

<script>
import { getCommunity, getNews, getActivity } from '@/api/platform'
export default {
  name: 'Platform',
  props: {
    option: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      myInfo: {
        myimg: '',
        name: '林夏灿',
        title: '社区活动',
        content: '周末何校友取跑步',
        imgList: [
          {
            id: '', src: ''
          },
          {
            id: '', src: ''
          },
          {
            id: '', src: ''
          }
        ]
      },
      activities: [],
      news: [
        {
          name: '20周年校庆大典',
          date: '2020/04/25'
        },
        {
          newTitle: '国宾大酒店',
          date: '2020/04/25'
        },
        {
          newTitle: '国宾大酒店',
          date: '2020/04/25'
        }
      ]
    }
  },
  mounted() {
    this.community()
    this.newsTable()
    this.activity()
  },
  methods: {
    community() {
      getCommunity().then(res => {
        this.myInfo = res.data.data
        console.log(this.myInfo)
      })
    },
    newsTable() {
      getNews().then(res => {
        this.news = res.data.data
      })
    },
    activity() {
      getActivity().then(res => {
        this.activities = res.data.data
        console.log(this.activities)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  color: rgb(209, 40, 68);
  margin-bottom: 20px;
}
.myInfo {
  width: 100%;
  height: 80%;
  padding: 20px;
  background-color: rgb(236, 216, 219);
  .myimg {
    width: 100px;
    height: 150px;
    margin: 20px;
    background-color: rgb(240, 196, 196);
    vertical-align: middle;
  }
  .imgList {
    width: 200px;
    height: 200px;
    background-color: rgb(204, 144, 144);
  }
}
.right {
  height: 100%;
  el-row {
    width: 100%;
    height: 46%;
    margin-bottom: 4%;
    background-color: rgb(129, 104, 104);
  }
  .actTitle {
    border-bottom: 3px solid rgb(209, 40, 68);
  }
  .activities {
    li {
      margin: 10px 0;
      height: 60px;
      div {
        display: flex;
        justify-content: space-between;
      }
    }
  }
  .news {
    li {
      margin: 10px 0;
      height: 40px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
