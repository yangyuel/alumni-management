<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="按工作性质分" name="first">
        <log-pie :option="pieOption" class="pie-height" />
      </el-tab-pane>
      <el-tab-pane label="按性别分" name="second">
        <div id="sex" style="width: 400px;height: 300px;" />
      </el-tab-pane>
      <el-tab-pane label="按工作地点分" name="third">
        <div id="place" style="width: 400px;height: 300px;" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import LogPie from './logPie' // 饼图
export default {
  name: 'AlumniActivity',
  components: { LogPie },
  data() {
    return {
      /* charts: '',
      opinion: ['及格人数', '未及格人数'],
      opinionData: [
        { value: 12, name: '及格人数', itemStyle: '#1ab394' },
        { value: 18, name: '未及格人数', itemStyle: '#79d2c0' }
      ], */
      pieOption: {
        title: {
          text: '',
          subtext: '',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          x: 'center',
          y: 'top',
          data: [
            'rose1',
            'rose2',
            'rose3',
            'rose4',
            'rose5',
            'rose6',
            'rose7',
            'rose8'
          ]
        },
        calculable: true,
        series: [
          {
            name: '面积模式',
            type: 'pie',
            radius: [30, 110],
            center: ['50%', '50%'],
            roseType: 'area',
            data: [
              { value: 10, name: 'rose1' },
              { value: 5, name: 'rose2' },
              { value: 15, name: 'rose3' },
              { value: 25, name: 'rose4' },
              { value: 20, name: 'rose5' },
              { value: 35, name: 'rose6' },
              { value: 30, name: 'rose7' },
              { value: 40, name: 'rose8' }
            ]
          }
        ]
      }
    }
  },
  methods: {
    /* drawPie(id) {
      this.charts = this.$echarts.init(document.getElementById(id))
      this.charts.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b}:{c} ({d}%)'
        },
        legend: {
          bottom: 10,
          left: 'center',
          data: this.opinion
        },
        series: [
          {
            name: '状态',
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              color: function(params) {
                // 自定义颜色
                var colorList = ['#1ab394', '#79d2c0']
                return colorList[params.dataIndex]
              }
            },
            data: this.opinionData
          }
        ]
      })
    } */
  }
}
</script>
<style lang="scss" scoped>
.pie-height {
  height: 400px;
}
</style>
