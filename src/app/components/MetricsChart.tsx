import React from 'react';
import ReactECharts from 'echarts-for-react';  


const option = {
  title: { text: 'Stacked Line' },
  tooltip: { trigger: 'axis' },
  legend: {
    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: { type: 'value' },

  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210],

      // 🔴 Annotation
      markLine: {
        symbol: 'none',
        lineStyle: { type: 'dashed', color: '#ff7300' },
        label: {
          formatter: 'Spike detected',
          position: 'end'
        },
        data: [{ xAxis: 'Thu' }]
      }
    },

    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'Direct',
      type: 'line',
      stack: 'Total',
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
};


function Chart() {
  return (
    <div>
      <ReactECharts
  option={option}
  notMerge={true}
  lazyUpdate={true}
  theme={"theme_name"}
//   onChartReady={this.onChartReadyCallback}
//   onEvents={EventsDict}
//   opts={}
/>
    </div>
  )
}

export default Chart;
