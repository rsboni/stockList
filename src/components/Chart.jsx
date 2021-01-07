import React from 'react'
import ReactApexChart from 'react-apexcharts'

export default function Chart (props) {
  const { quote } = props
  const { stockName, quotes, timeStamps } = quote

  const data = quotes ? quotes.map((q, i) => ({ x: timeStamps ? new Date(timeStamps[i]).getTime() : 0, y: q })) : []

  const series = [{
    name: stockName,
    data: data
  }]

  const options = {
    chart: {
      height: 300,
      id: 'realtime',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      type: 'line',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: true
    },
    stroke: {
      curve: 'straight',
      width: 3
    },
    title: {
      show: false
    },
    grid: {
      show: true
    },
    legend: {
      show: false
    },
    xaxis: {
      type: 'datetime',
      lines: {
        show: false
      },
      labels: {
        show: false
      }
    },
    yaxis: {
      lines: {
        show: false
      },
      labels: {
        show: true
      }
    }
  }
  return (
    <div id='chart'>
      <ReactApexChart options={options} series={series} type='line' height={300} />
    </div>
  )
}
