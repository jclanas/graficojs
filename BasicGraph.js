$(document).ready(function(){ 
   
var margin = {top: 35, right: 20, bottom: 35, left: 40},
    	width = 520,
    	height = 380;
	
var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse;
 
var formatTime = d3.time.format("%H:%M:%S");
 
var x = d3.time.scale().range([0, width]);
 
var y = d3.scale.linear().range([height, 0]);
 
var xAxis = d3.svg.axis()
    	.scale(x)
    	.orient("bottom")
	.tickFormat(d3.time.format("%I:%M %p"));
 
var yAxis = d3.svg.axis()
    	.scale(y)
    	.orient("left");
 
var line = d3.svg.line()
	.interpolate('linear')
    	.x(function(d) { return x(d.dateTimeTaken); })
    	.y(function(d) { return y(d.reading); });
	
var svg = d3.select("#livefeed").append("svg")
    	.attr("width", width + margin.left + margin.right)
    	.attr("height", height + margin.top + margin.bottom)
  	.append("g")
    	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
svg.append("defs").append("clipPath")
    	.attr("id", "clip")
  	.append("rect")
    	.attr("width", width)
    	.attr("height", height);
 
d3.json("LiveData.php", function(error,data) {
  data.forEach(function(d) {
    d.dateTimeTaken = d.dateTimeTaken;
    d.reading = +d.reading;
  });
 
x.domain(d3.extent(data, function(d) { return d.dateTimeTaken; }));
y.domain(d3.extent(data, function(d) { return d.reading; }));
 		  
svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis)
	.append("text") 
	.attr("x", 240 )
	.attr("y", 430 )
	.style("text-anchor", "middle")
	.text("(TIME)");
 
svg.append("g")
	.attr("class", "y axis")
	.call(yAxis)
	.append("text")
	.attr("transform", "rotate(-90)")
	.attr("y", 6)
	.attr("dy", ".71em")
	.style("text-anchor", "end")
	.text("(LIVE)");
	
var path = svg.append("g")
    	.attr("clip-path", "url(#clip)")
  	.append("path")
    	.data(data)
    	.attr("class", "line")
	.attr("fill","pink");
 
var inter = setInterval(function() {	
updateData();
}, 5000);		
});
	
function updateData() 
{
d3.json("LiveData.php", function(data) {
data.forEach(function(d) {
d.dateTimeTaken = parseDate(d.dateTimeTaken);
d.reading = +d.reading;
});
 
svg.selectAll( ".timeDisplay" )
  	.data(data)
  	.text( function(d) { return d3.max( data, function(d) { return d.dateTimeTaken; })  } )
  	.enter()
  	.append("text")
  	.attr("class", "timeDisplay" )
  	.attr("x", width )
  	.attr("y", -20)
  	.attr("text-anchor", "end" );
 
x.domain(d3.extent(data, function(d) { return d.dateTimeTaken; }));
y.domain(d3.extent(data, function(d) { return d.reading; }));
 
svg.select("path.line")
	.attr("d", line(data));
	
svg.select(".x.axis")
  	.transition()
	.duration(750)
	.ease("linear")
	.call(xAxis);
	  	  
svg.select(".y.axis")
  	.transition()
	.duration(750)
	.ease("linear")
	.call(yAxis); 
	
svg.select("path")
  	.transition()
	.duration(750)
	.ease("linear")
	.attr("transform", "translate(" + x(0) + ")");
		
data.shift();
 
});
};});