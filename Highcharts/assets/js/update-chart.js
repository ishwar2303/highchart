const updateChart = (chart, dataSeries) => {
    chart.update({
        xAxis: {
            type: 'category',
            categories: dataSeries.categories,
        },
        series:[{
            data: dataSeries.data
        }]
    })
}

const multivalueFilter = (values) => {
    return (v) => {
        return values.indexOf(v) !== -1
    }
}

const getFilteredData = (dim, filteredPoints) => {
    if(filteredPoints.length > 0)
        dim.filterFunction(multivalueFilter(filteredPoints))
    else dim.filterAll() 
    return dim.top(Infinity)
}

const byAgingBucket = (filteredPoints) => {
    var filteredData = getFilteredData(agingBucketDim, filteredPoints)
    var cf = crossfilter(filteredData)
    updateChart(chart3, analyst())
    updateChart(chart2, activity())
    updateChart(chart4, customer())
}

const byActivity = (filteredPoints) => {
    var filteredData = getFilteredData(activityTypeDim, filteredPoints)
    var cf = crossfilter(filteredData)
    updateChart(chart1, agingBucket())
    updateChart(chart3, analyst())
    updateChart(chart4, customer())
}

const byAnalyst = (filteredPoints) => {
    var filteredData = getFilteredData(analystDim, filteredPoints)
    var cf = crossfilter(filteredData)
    updateChart(chart1, agingBucket())
    updateChart(chart2, activity())
    updateChart(chart4, customer())
}

const byCustomer = (filteredPoints) => {
    var filteredData = getFilteredData(customerDim, filteredPoints)
    var cf = crossfilter(filteredData)
    updateChart(chart1, agingBucket())
    updateChart(chart2, activity())
    updateChart(chart3, analyst())
}