// instantiate crossfilter
var cf = crossfilter(dataset)

// chart 1 for aging bucket
var agingBucketDim = cf.dimension(d => d.aging_bucket)
var agingBucket = () => {
    var agingBucketGroup = agingBucketDim.group().reduceSum(d => d.collected_amount)
    const cmpBucketRange = (a, b) => {
        if(a.key == 'Current' || b.key == 'Current')
            return -1
        a = a.key.split('-')
        b = b.key.split('-')
        return a[1] - b[1]
    }
    var agingBucketSeries = agingBucketGroup.all()
    agingBucketSeries.sort(cmpBucketRange)
    var agingSeries = prepareData(agingBucketSeries)
    return agingSeries
}
var agingSeries = agingBucket()

var chart1Options = {
  chart: {
      renderTo: 'graph-1',
      type: 'column'
  },
  title: {
      text: 'Cash Collected by Aging Bucket',
      style: commonTitleStyle
  },
  xAxis: {
      type: 'category',
      categories: agingSeries.categories,
      labels: {
        rotation: -45,
        style: {
          fontSize: '10px',
          fontFamily: 'Verdana, sans-serif'
        },
      }
  },
  yAxis: {
      title: {
          text: ''
      },
  },
  legend: {
      enabled: false
  },
  labels: {
      enabled: false
  },
  credits: {
      enabled: false
  },
  plotOptions: {
      series: {
          cursor: 'pointer',
          point: {
              events: {
                click: function() {
                    this.select(null, true)
                    var selectedPoints = this.series.chart.getSelectedPoints()
                    var filteredPoints = []
                    for(i=0; i<selectedPoints.length; i++) {
                        filteredPoints.push(selectedPoints[i].category)
                    }
                    byAgingBucket(filteredPoints)
                }
              }
          }
      }
  },

  tooltip: {
    pointFormat: 'Collected: {point.y}',
    formatter: function() {
        return roundOffAmount(this.y, this.x)
    }
  },

  series: [{
      data: agingSeries.data,
      color: '#16aff0'
  }],
}
var chart1 = new Highcharts.chart(chart1Options)


// chart2 for activity type
var activityTypeDim = cf.dimension(d => d.type)
const activity = () => {
    var activityTypeGroup = activityTypeDim.group().reduceSum(d => d.collected_amount)
    var activityTypeSeries = activityTypeGroup.all()
    activityTypeSeries.reverse()
    var activitySeries = prepareData(activityTypeSeries)
    return activitySeries
}
var activitySeries = activity()

var chart2Options = {
  chart: {
      renderTo: 'graph-2',
      type: 'column'
  },
  title: {
      text: 'Cash Collected by Activity',
      style: commonTitleStyle
  },
  xAxis: {
      type: 'category',
      categories: activitySeries.categories,
  },
  yAxis: {
      title: {
          text: ''
      },
  },
  legend: {
      enabled: false
  },
  labels: {
      enabled: false
  },
  credits: {
      enabled: false
  },
  plotOptions: {
      series: {
          cursor: 'pointer',
          point: {
              events: {
                  click: function() {
                    this.select(null, true)
                    var selectedPoints = this.series.chart.getSelectedPoints()
                    var filteredPoints = []
                    for(i=0; i<selectedPoints.length; i++) {
                        filteredPoints.push(selectedPoints[i].category)
                    }
                    byActivity(filteredPoints)
                  }
              }
          }
      },
      column: {
          colorByPoint: true
      }
  },
  tooltip: {
    pointFormat: 'Collected: {point.y}',
    formatter: function() {
        return roundOffAmount(this.y, this.x)
    }
  },
  colors: ['#f75353', '#8ed163'],
  series: [{
      data: activitySeries.data,
      color: '#16aff0'
  }],
}
var chart2 = new Highcharts.chart(chart2Options)

// chart3 for top collectors
var analystDim = cf.dimension(d => d.analyst_name)
const analyst = () => {
    var analystGroup = analystDim.group().reduceSum(d => d.collected_amount)
    var analystGroupSeries = analystGroup.all()
    analystGroupSeries = analystGroupSeries.sort((a, b) => {
        return b.value - a.value
    })
    var analystSeries = prepareData(analystGroupSeries)
    return analystSeries
}
var analystSeries = analyst()

var chart3Options = {
  chart: {
      renderTo: 'graph-3',
      type: 'bar'
  },
  title: {
      text: 'Top Collectors',
      style: commonTitleStyle
  },
  xAxis: {
      type: 'category',
      categories: analystSeries.categories,
      labels: {
        align: 'left',
        x: 2,
        y: -25,
      }
  },
  yAxis: {
      title: {
          text: ''
      },
  },
  legend: {
      enabled: false
  },
  labels: {
      enabled: false
  },
  credits: {
      enabled: false
  },
  plotOptions: {
      series: {
          cursor: 'pointer',
          point: {
              events: {
                  click: function() {
                    this.select(null, true)
                    var selectedPoints = this.series.chart.getSelectedPoints()
                    var filteredPoints = []
                    for(i=0; i<selectedPoints.length; i++) {
                        filteredPoints.push(selectedPoints[i].category)
                    }
                    byAnalyst(filteredPoints)
                  }
              }
          }
      }
  },
  tooltip: {
    pointFormat: 'Collected: {point.y}',
    formatter: function() {
        return roundOffAmount(this.y, this.x)
    }
  },
  series: [{
    data: analystSeries.data,
    color: '#16aff0'
  }],
}
var chart3 = new Highcharts.chart(chart3Options)

// chart4 for top 10 customers
var customerDim = cf.dimension(d => d.customer_name)
const customer = () => {
    var customerGroup = customerDim.group().reduceSum(d => d.collected_amount)
    var customerGroupSeries = customerGroup.all()
    customerGroupSeries = customerGroupSeries.sort((a, b) => {
        return b.value - a.value
    })
    var customerSeries = customerGroupSeries.slice(0, 10)
    customerSeries = prepareData(customerSeries)
    return customerSeries
}
var customerSeries = customer()

var chart4Options = {
  chart: {
      renderTo: 'graph-4',
      type: 'bar'
  },
  title: {
      text: 'Top 10 Customers',
      style: commonTitleStyle
  },
  xAxis: {
      type: 'category',
      categories: customerSeries.categories,
      labels: {
        align: 'left',
        x: 2,
        y: -25,
      }
  },
  yAxis: {
      title: {
          text: ''
      },
  },
  legend: {
      enabled: false
  },
  labels: {
      enabled: false
  },
  credits: {
      enabled: false
  },
  plotOptions: {
      series: {
          cursor: 'pointer',
          point: {
              events: {
                  click: function() {
                    this.select(null, true)
                    var selectedPoints = this.series.chart.getSelectedPoints()
                    var filteredPoints = []
                    for(i=0; i<selectedPoints.length; i++) {
                        filteredPoints.push(selectedPoints[i].category)
                    }
                    byCustomer(filteredPoints)
                  }
              }
          }
      }
  },
  tooltip: {
    pointFormat: '',
    formatter: function() {
        return roundOffAmount(this.y, this.x)
    }
  },
  series: [{
    data: customerSeries.data,
    color: '#fc7500'
  }],
}
var chart4 = new Highcharts.chart(chart4Options)