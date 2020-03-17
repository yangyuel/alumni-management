<template lang="pug">
el-row(:gutter="100" style="padding: 100px")
  el-col(:span="16")
    h2.title 最新动态
    div.myInfo(:data="myInfo")
      el-row
        img.myimg(:src = "myimg")
        span(style="vertical-align:middle") {{ myInfo.name }}
      el-row
        h3.title {{myInfo.title}}
        p {{myInfo.content}}
      el-row
        img.imgList(v-for="i in myInfo.imgList")
  el-col.right(:span="8")
    el-row
      h3.actTitle 推荐活动
    el-row
</template>

<script>
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
      }
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
  el-row {
    width: 100%;
    height: 46%;
    margin-bottom: 4%;
    background-color: rgb(129, 104, 104);
  }
  .actTitle {
    border-bottom: 3px solid rgb(209, 40, 68);
  }
}
</style>
