var margin = {top: 20, bottom: 20, left:20, right: 20},
	width = 500 - margin.right - margin.left,
	height = 500 - margin.top - margin.bottom
	radius = width/2;

var color = d3.scaleOrdinal()
		.range(["#BBDEFB", "#98CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2"]);

var arc = d3.arc()
		.outerRadius(radius - 10)
		.innerRadius(0);
var labelArc = d3.arc()
		.outerRadius(radius - 50)
		.innerRadius(radius - 50)

var pie = d3.pie()
		.sort(null)
		.value(function(d){return d.UX;});

var svg = d3.select("body").append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(" + width/2 + "," + height/2 + ")");


d3.csv("data2.csv", function(error, data){

	if (error) throw error;

	data.forEach(function(d) {
		d.UX = + d.UX;
		d.Name = d.Name;
	});

	var g = svg.selectAll(".arc")
			.data(pie(data))
			.enter().append("g")
			.attr("class", "arc");

	g.append("path")
			.attr("d", arc)
			.style("fill", function (d){return color(d.data.UX);});

	g.append("text")
		.attr("transform", function(d){return "translate(" + labelArc.centroid(d) + ")";})
		.attr("dy", ".35em")
		.text(function(d){return d.data.Name;});
})

