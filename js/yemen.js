(function() {

// Fake JSON data
var json = {"countries_msg_vol": {
  "Air": 18, "Charter": 64, "Truck": 18
}};

// D3 Bubble Chart 

var diameter = 250;

var svg = d3.select('#yemenTransport').append('svg')
        .attr('width', 350)
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
    .attr('transform', function(d) { return 'translate(' + (d.x - 15) + ',' + (d.y + 10) + ')'; })
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
var data = [1.43, 11.38, 41.80, 45.27, 0.11, 0.01];

var bartext = ["CCCamp Management", "Education", "Emergency Shelter", "Health", "Logistics", "Wash"];

var width = 700,
    barHeight = 20;

var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, (width - 170)]);

var chart = d3.select("#yemenCargo").append('svg')
    .attr("width", width + 60)
    .attr("height", barHeight * data.length + 100);

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