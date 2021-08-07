const commonTitleStyle = {
  fontSize: '21px',
  fontWeight: 'bold',
  color: 'rgba(0, 0, 0, 0.6)'
}

const roundOffAmount = (amount, name) => {
    console.log(amount)
    var unit = ''
    if(amount >= 1000000000) {
      amount /= 1000000000
      unit = 'B'
    }
    else if(amount >= 1000000) {
      unit = 'M'
      amount /= 1000000
    }
    else if(amount >= 1000) {
      unit = 'K'
      amount /= 1000
    }
    amount = amount*100 + 0.5
    amount = parseInt(amount)
    amount /= 100
    return '<span class="series-name">' + name + '</span>' + '<br/>' + '$' + amount + ' ' + unit
}

// prepare x and y axis data
const prepareData = ((series) => {
    var categories = []
    var data = []
    series.forEach((o) => {
      categories.push(o.key)
      data.push(o.value)
    })
    return {
      categories,
      data
    }
})
