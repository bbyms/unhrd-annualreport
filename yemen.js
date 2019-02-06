(function() {

// Fake JSON data
var json = {"countries_msg_vol": {
  "Air": 43, "Charter": 6, "Liner": 52
}};

// D3 Bubble Chart 

var diameter = 250;

var svg = d3.select('#yemenTransport').append('svg')
        .attr('width', diameter)
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
var data = [0.07, 1.44, 53.67, 2.37, 24.85, 17.53, 0.07];

var width = 500,
    barHeight = 20;

var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, width]);

var chart = d3.select("#yemenCargo").append('svg')
    .attr("width", width + 60)
    .attr("height", barHeight * data.length + 60);

//Bind data
var bar = chart.selectAll("g")
    .data(data);

// Enter
bar.enter().append("g");

// Update
bar.attr("transform", function(d, i) { return "translate(0," + i * (barHeight + 10) + ")"; });

bar.append("rect")
    .attr("width", x)
    .attr("height", barHeight - 1);

bar.append("text")
    .attr("x", function(d) { return x(d) + 5; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { return d + "%"; });
