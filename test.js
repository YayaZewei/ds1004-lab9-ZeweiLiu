

//some of my code are from http://bl.ocks.org/weiglemc/6185069 
//I have referenced http://bl.ocks.org/weiglemc/6185069 to finish my homework
//My code could run well in firefox but not in chrome 


function clickfunction(){
    window.location.reload();
    var mpg_min = +$('#mpg-min').val();
    var mpg_max = +$('#mpg-max').val();
    draw(mpg_min,mpg_max);
}


var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 400 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;


$(document).ready(function() {
    var mpg_min = +$('#mpg-min').val();
    var mpg_max = +$('#mpg-max').val();
    draw(mpg_min,mpg_max);
});


var draw = function(mpg_min,mpg_max) {
  
  var x_var = d3.select("#sel-x").node().value;
  var y_var = d3.select("#sel-y").node().value;

  var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // load data
    d3.csv("car.csv", function(error, data) {
      data.forEach(function(d) {
      d.mpg = +d.mpg;
      d.cylinders = +d.cylinders;
      d.displacement = +d.displacement;
      d.horsepower = +d.horsepower;
      d.weight = +d.weight;
      d.acceleration = +d.acceleration;
      d["model.year"] = +d["model.year"];
    });

  // initial value
  var xValue = function(d) { return d[x_var];},
      xScale = d3.scale.linear().range([0, width]), 
      xMap = function(d) { return xScale(xValue(d));}, 
      xAxis = d3.svg.axis().scale(xScale).orient("bottom");
  var yValue = function(d) { return d[y_var];}, 
      yScale = d3.scale.linear().range([height, 0]), 
      yMap = function(d) { return yScale(yValue(d));}, 
      yAxis = d3.svg.axis().scale(yScale).orient("left");
  


    xScale.domain([d3.min(data, xValue)-5, d3.max(data, xValue)+5]);
    yScale.domain([d3.min(data, yValue)-5, d3.max(data, yValue)+5]);
    svg.append("g")
       .attr("class", "x axis")
       .attr("transform", "translate(0," + height + ")")
       .call(xAxis)
       .append("text")
       .attr("class", "label")
       .attr("x", width)
       .attr("y", -6)
       .style("text-anchor", "end")
       .text(x_var);
    svg.append("g")
       .attr("class", "y axis")
       .call(yAxis)
       .append("text")
       .attr("class", "label")
       .attr("transform", "rotate(-90)")
       .attr("y", 6)
       .attr("dy", ".71em")
       .style("text-anchor", "end")
       .text(y_var);
    svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .filter(function(d) { return d.mpg < mpg_max && d.mpg > mpg_min})
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", xMap)
        .attr("cy", yMap)
        .on("mouseover", function(d) {
           $('#hovered').text(d.name)
        });
  });
};
