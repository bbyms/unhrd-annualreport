(function() {

// Fake JSON data
var json = {"countries_msg_vol": {
  "Air": 41, "Sea": 50, "Charter": 5, "Multimodal": 5
}};

// D3 Bubble Chart 

var diameter = 250;

var svg = d3.select('#bangladeshTransport').append('svg')
        .attr('width', 400)
        .attr('height', diameter);

var bubble = d3.layout.pack()
      .size([diameter, diameter])
      .value(function(d) {return d.size;})
       // .sort(function(a, b) {
      // 	return -(a.value - b.value)
      // }) 
      .padding(3);

// generate data with calculated layout values
var nodes = bubble.nodes(processData(json))
          .filter(function(d) { return !d.children; }); // filter out the outer bubble

var vis = svg.selectAll('circle')
        .data(nodes);

vis.enter().append('circle')
    .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
    .attr('r', function(d) { return d.r; })
    .attr('class', function(d) { return d.className; });

vis.enter().append('text')
    .attr('transform', function(d) { return 'translate(' + (d.x - 10) + ',' + (d.y + 10) + ')'; })
    .text(function(d) { return d.size + "%"; });


var legend = svg.append("g")
    .attr("class", "chart-legend")
    .selectAll("g")
    .data(nodes)
    .enter()
        .append("g")
        .attr("transform", function(d,i){
            return "translate(" + d.depth*15 + "," + i*25 + ")"; 
          })

legend.append("rect")
    .attr("width", 8)
    .attr("height", 8)
    .attr('class', function(d) { return d.className; });

legend.append("text")
    .attr("x", function(d,i){ return d.depth*10 +10;})
    .attr("dy", "10px")
    .text(function(d){return d.name;})

function processData(data) {
  var obj = data.countries_msg_vol;

  var newDataSet = [];

  for(var prop in obj) {
    newDataSet.push({name: prop, className: prop.toLowerCase(), size: obj[prop]});
  }
  return {children: newDataSet};
}

})();

// Bar chart --------------------------------------------------

// Data array
var data = [0.07, 1.46, 54.41, 2.40, 25.20, 16.39, 0.07];

var bartext = ["Camp Management", "Education", "Emergency Shelter", "Health", "Logistics", "Staff Supplies", "Wash"];

var width = 700,
    barHeight = 20;

var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, (width - 170)]);

var chart = d3.select("#bangladeshCargo").append('svg')
    .attr("width", width + 60)
    .attr("height", barHeight * data.length + 150);

//Bind data

var bar = chart.selectAll("g")
    .data(data);
    
// Enter
bar.enter().append("g");

// Update
bar.attr("transform", function(d, i) { return "translate(170," + i * (barHeight + 20) + ")"; });

bar.append("rect")
    .attr("width", x)
    .attr("height", barHeight - 1);

bar.append("text")
    .attr("x", function(d) { return x(d) + 5; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { return d + "%"; });

var barLegend = chart.append("g")
    .attr("class", "bar-legend")
    .attr("transform", function(d) { return "translate(0,15)"})
    .selectAll("g")
    .data(bartext)
    .enter()
        .append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * (barHeight + 20) + ")"; })

barLegend.append("text")
    .text(function(d){return d;})

    // Donut charts ------------------------------------------------------------------------

var weight = [
  { name: 'Dubai', percent: 68 },
  {name: 'Kuala Lumpur', percent: 32}
];

var volume = [
  { name: 'Dubai', percent: 43 },
  {name: 'Kuala Lumpur', percent: 57}
];

var value = [
  { name: 'Dubai', percent: 61 },
  {name: 'Kuala Lumpur', percent: 39}
];

var pie = d3.layout.pie()
  .value(function (d) { return d.percent })
  .sort(null)

var w = 370, h = 150;

var outerRadius = 75;
var innerRadius = 50;

var colors = ["#ff5252", "#ffc759", "#fcdc5d", "#b3de62"];

var color = d3.scale.ordinal().range(colors);

console.log(color.range);

var arc = d3.svg.arc()
  .outerRadius(outerRadius)
  .innerRadius(innerRadius);

var weightPie = d3.select("#bangladeshWeight")
  .append("svg")
  .attr({
    width: w,
    height: h
  }).append('g')
  .attr({
    transform: 'translate(' + w / 2 + ',' + h / 2 + ')'
  });

var path = weightPie.selectAll('path')
  .data(pie(weight))
  .enter()
  .append('path')
  .attr({
    d: arc,
    fill: function (d, i) {
      return color(i);
    }
  });


var valuePie = d3.select("#bangladeshValue")
  .append("svg")
  .attr({
    width: w,
    height: h
  }).append('g')
  .attr({
    transform: 'translate(' + w / 2 + ',' + h / 2 + ')'
  });

var value = valuePie.selectAll('path')
  .data(pie(value))
  .enter()
  .append('path')
  .attr({
    d: arc,
    fill: function (d, i) {
      return color(i);
    }
  });


var volumePie = d3.select("#bangladeshVolume")
  .append("svg")
  .attr({
    width: w,
    height: h
  }).append('g')
  .attr({
    transform: 'translate(' + w / 2 + ',' + h / 2 + ')'
  });

var volume = volumePie.selectAll('path')
  .data(pie(volume))
  .enter()
  .append('path')
  .attr({
    d: arc,
    fill: function (d, i) {
      return color(i);
    }
  });

  // Donut chart Legend ------------------------------------------------------------------------

var legendRectSize = 15;
var legendSpacing = 7;
var legendHeight = legendRectSize + legendSpacing;

var legend = weightPie.selectAll('.pie-legend')
  .data(color.domain())
  .enter()
  .append('g')
  .attr({
    class: 'pie-legend',
    transform: function (d, i) {
      //Just a calculation for x & y position
      return 'translate(-180,' + ((i * legendHeight) - 65) + ')';
    }
  });

legend.append('rect')
  .attr({
    width: legendRectSize,
    height: legendRectSize,
    rx: 20,
    ry: 20
  })
  .style({
    fill: color
  });

legend.append('text')
.data(pie(weight))
  .attr({
    x: 20,
    y: 12
  })
  .text(function (d) {
    return d.data.name;
  });


  var valueLegend = valuePie.selectAll('.pie-legend')
  .data(color.domain())
  .enter()
  .append('g')
  .attr({
    class: 'pie-legend',
    transform: function (d, i) {
      //Just a calculation for x & y position
      return 'translate(-180,' + ((i * legendHeight) - 65) + ')';
    }
  });

valueLegend.append('rect')
  .attr({
    width: legendRectSize,
    height: legendRectSize,
    rx: 20,
    ry: 20
  })
  .style({
    fill: color
  });

valueLegend.append('text')
  .data(pie(weight))
  .attr({
    x: 20,
    y: 12
  })
  .text(function (d) {
    return d.data.name;
  });

  var volumeLegend = volumePie.selectAll('.pie-legend')
  .data(color.domain())
  .enter()
  .append('g')
  .attr({
    class: 'pie-legend',
    transform: function (d, i) {
      //Just a calculation for x & y position
      return 'translate(-180,' + ((i * legendHeight) - 65) + ')';
    }
  });

  volumeLegend.append('rect')
  .attr({
    width: legendRectSize,
    height: legendRectSize,
    rx: 20,
    ry: 20
  })
  .style({
    fill: color
  });

volumeLegend.append('text')
  .data(pie(weight))
  .attr({
    x: 20,
    y: 12
  })
  .text(function (d) {
    return d.data.name;
  });
  
// Donut chart Legend ------------------------------------------------------------------------