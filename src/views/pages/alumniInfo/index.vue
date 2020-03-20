<template>
  <div class="echarts">
    <div class="container">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="按单位性质">
          <div ref="natureRef" class="nature"/>
        </el-tab-pane>
        <el-tab-pane label="按性别">
          <div ref="genderRef" class="gender"/>
        </el-tab-pane>
        <el-tab-pane label="按工作地点">
          <div ref="placeRef" class="place"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
export default {
  name: '',
  data() {
    return {}
  },
  mounted() {
    this.initEchart()
  },
  methods: {
    initEchart() {
      var natureDemo = this.$ec.init(this.$refs.natureRef)
      var genderDemo = this.$ec.init(this.$refs.genderRef)
      var placeDemo = this.$ec.init(this.$refs.placeRef)

      var natureOption = {
        title: {
          text: '按单位性质',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          top: 'bottom',
          data: [
            '国企',
            '私企',
            '外企'
          ]
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ['pie', 'funnel']
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '按单位性质',
            type: 'pie',
            radius: [50, 100],
            roseType: 'area',
            data: [
              { value: 10, name: '国企' },
              { value: 5, name: '私企' },
              { value: 15, name: '外企' }
            ]
          }
        ]
      }
      var genderOption = {
        title: {
          text: '按性别',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          top: 'bottom',
          data: [
            '男',
            '女'
          ]
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ['pie', 'funnel']
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '按性别',
            type: 'pie',
            radius: [50, 100],
            roseType: 'area',
            data: [
              { value: 10, name: '男' },
              { value: 5, name: '女' }
            ]
          }
        ]
      }
      var placeOption = {
        title: {
          text: '按工作地点',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          top: 'bottom',
          data: [
            '地点1',
            '地点2',
            '地点3',
            '地点4',
            '地点5',
            '地点6',
            '地点7',
            '地点8'
          ]
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ['pie', 'funnel']
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '按地点',
            type: 'pie',
            radius: [50, 100],
            roseType: 'area',
            data: [
              { value: 10, name: '地点1' },
              { value: 5, name: '地点2' },
              { value: 15, name: '地点3' },
              { value: 25, name: '地点4' },
              { value: 20, name: '地点5' },
              { value: 35, name: '地点6' },
              { value: 30, name: '地点7' },
              { value: 40, name: '地点8' }
            ]
          }
        ]
      }

      natureDemo.setOption(natureOption)
      genderDemo.setOption(genderOption)
      placeDemo.setOption(placeOption)
    }
  }
}
</script>
<style  scoped>
.container {
  width: 100%;
  height: 100%;
}
.nature, .gender, .place{
  width: 700px;
  height: 500px;
  margin: 0 auto;
}
</style>
