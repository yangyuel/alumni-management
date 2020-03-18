<template lang="pug">
ul(style="padding: 100px 200px" :data="community")
 li(v-for="(item,i) in community")
    el-row
      el-col.left(:span="4")
        img(:src="item.photo")
        p {{ item.myname }}
      el-col.right(:span="16")
        h3 {{ item.title }}
        p {{ item.content }}
    el-row.buttons
      el-badge.item(:value="item.like" :max="99")
        el-button(icon="el-icon-star-off" size="small")
      el-badge.item(:value="item.comNum" :max="99")
        el-button(icon="el-icon-message" size="small")
    el-row
      div
        span {{ item.comname + "：" }}
        span {{ item.comment }}
      el-input(style="margin-top: 10px" placeholder="请输入内容" v-model="input")
</template>
<script>
export default {
  name: 'Community',
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
      input: '',
      community: [
        {
          photo: '',
          myname: 'Yvonne',
          title: '小王子',
          content: '《小王子》是法国作家安托万·德·圣·埃克苏佩里于1942年写成的著名儿童文学短篇小说。本书的主人公是来自外星球的小王子。书中以一位飞行员作为故事叙述者，讲述了小王子从自己星球出发前往地球的过程中，所经历的各种历险。作者以小王子的孩子式的眼光，透视出成人的空虚、盲目，愚妄和死板教条，用浅显天真的语言写出了人类的孤独寂寞、没有根基随风流浪的命运。同时，也表达出作者对金钱关系的批判，对真善美的讴歌。',
          like: '6',
          comNum: '10',
          comname: '林夏灿',
          comment: '记得发货非计划的价格哈'
        },
        {
          photo: '',
          myname: 'Yvonne',
          title: '小王子',
          content: '《小王子》是法国作家安托万·德·圣·埃克苏佩里于1942年写成的著名儿童文学短篇小说。本书的主人公是来自外星球的小王子。书中以一位飞行员作为故事叙述者，讲述了小王子从自己星球出发前往地球的过程中，所经历的各种历险。作者以小王子的孩子式的眼光，透视出成人的空虚、盲目，愚妄和死板教条，用浅显天真的语言写出了人类的孤独寂寞、没有根基随风流浪的命运。同时，也表达出作者对金钱关系的批判，对真善美的讴歌。'
        },
        {
          photo: '',
          myname: 'Yvonne',
          title: '小王子',
          content: '《小王子》是法国作家安托万·德·圣·埃克苏佩里于1942年写成的著名儿童文学短篇小说。本书的主人公是来自外星球的小王子。书中以一位飞行员作为故事叙述者，讲述了小王子从自己星球出发前往地球的过程中，所经历的各种历险。作者以小王子的孩子式的眼光，透视出成人的空虚、盲目，愚妄和死板教条，用浅显天真的语言写出了人类的孤独寂寞、没有根基随风流浪的命运。同时，也表达出作者对金钱关系的批判，对真善美的讴歌。'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
ul {
  li {
    margin-bottom: 40px;
    el-row {
      border: 1px solid #ccc;
    }
  }
  .left {
    border-right: 1px solid #ccc;
    img {
      width: 100px;
      height: 100px;
      background-color: rgb(231, 185, 185);
    }
  }
  .right {
    margin-left: 50px;
  }
}
.buttons {
  text-align: right;
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }
}
</style>
