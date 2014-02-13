# Ejemplo PHP + MySQL + D3.js

Ejemplo que muestra la interacción vía una cadena JSON recuperada desde mysql a través de PHP

## Ejemplo completo y funcional, pero con temas pendientes

* Aún falta afinar el despliegue del gráfico final con el manejo de escalas.
   


```javascript
    
    <!DOCTYPE html>
<meta charset="utf-8">
<style>

body {
  font: 10px sans-serif;
}

.axis path,
.axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}

.x.axis path {
  display: none;
}

.line {
  fill: none;
  stroke: steelblue;
  stroke-width: 1.5px;
}

div.chart{ 
font-family:sans-serif; 
font-size:0.7em;
}

div.bar {
background-color:DarkRed; 
color:white;
height:3em; 
line-height:3em; 
padding-right:1em; 
margin-bottom:2px; 
text-align:right;
}

</style>
<body>
<script src="http://d3js.org/d3.v3.js"></script>
<script>

var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


var x = d3.scale.linear().range([0, width]);

var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.valor2); })
    .y(function(d) { return y(d.valor1); })
    .interpolate("linear");

var svg = d3.select("body").append("svg").text("New paragraph!")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.json("Livedata.php", function(error, data) {
  data.forEach(function(d) {
    d.valor2 = d.valor2;
    d.valor1 = +d.valor1;
//    data.push(d.valor1);
  });

  x.domain(d3.extent(data, function(d) { return d.valor2; }));
  y.domain(d3.extent(data, function(d) { return d.valor1; }));

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Escala");

  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
});


</script>
    
```