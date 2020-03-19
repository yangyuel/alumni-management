<template lang="pug">
el-row(style="padding: 100px" :data="photos")
  el-col(:span="12")
    ul
      li(v-for="(item, i) in photos.school" :key="i")
        img(:src="item.src")
    h3 校园风光
  el-col(:span="12")
    ul
      li(v-for="(item, i) in photos.activity" :key="i")
        img(:src="item.src")
    h3 校友活动
</template>
<script>
export default {
  name: 'UserAlbum',
  data() {
    return {
      photos: {
        school: [
          {
            src: ''
          },
          {
            src: ''
          },
          {
            src: ''
          }
        ],
        activity: [
          {
            src: ''
          },
          {
            src: ''
          },
          {
            src: ''
          }
        ]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
el-row {
  height: 100%;
  el-col {
    height: 100%;
    text-align: center;
  }
}
ul {
  height: 100%;
  background: skyblue;
  position: relative;
  li {
    position: absolute;
    left: 0;
    top: 0;
  }
}
img {
  width: 200px;
  height: 200px;
  background: pink;
}
</style>
