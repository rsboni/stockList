import React from 'react'
import ReactApexChart from 'react-apexcharts'

export default function Chart (props) {
  const { quote } = props
  const { stockName, quotes, timeStamp } = quote

  const series = [{
    name: stockName,
    data: quotes.slice(-5)
  }]

  const options = {
    chart: {
      height: 60,
      width: 80,
      type: 'line',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    title: {
      show: false
    },
    grid: {
      show: false
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: timeStamp ? timeStamp.map(time => Date.now() - time).slice(-10) : [],
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
        show: false
      }
    }
  }
  return (
    <div id='chart' style={{ selfAlign: 'center' }}>
      <ReactApexChart options={options} series={series} type='line' height={80} width='100%' />
    </div>
  )
}
