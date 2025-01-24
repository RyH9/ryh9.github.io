/*
Javascript class to render routes for the 2017 MC1 VAST challenge.
Written by Ryan Hare(main route part)and LuoBin Cui (bar part) for Dr. Sun's Information Visualization class.
*/

class RouteDrawing{
	constructor(){
		// Initialize variables
		this.carFilters = "all";
		this.scale = 4;
		this.startDate = Date.parse("05/01/2015 12:00 AM");
		this.endDate = Date.parse("05/31/2016 11:59 PM");
		this.lineGenerator = d3.svg.line().interpolate("basis");
		this.carColors = {"1": "#ff9933", 
					"2": "#3399ff", 
					"3": "#00e6e6", 
					"4": "#00e600", 
					"5": "#cccc00", 
					"6": "#cc33ff", 
					"2P": "#e60000"};
		// Start data loading sequence
		this.loadVehicleData();
		this.bardata={};
		this.textdata=[];
		this.barDatainit();
		
		
		// Data and preprocessing code FOR TESTING PURPOSES
		/*this.srcDstData = [
			{"start-time": "5/1/2015 0:43", "end-time": "5/1/2015 1:03", "source": "entrance3", "destination": "general-gate1", "route-id": 0, "direction": 1, "car-id": "20154301124328-262", "car-type": "2P"},
			{"start-time": "5/1/2015 0:43", "end-time": "5/1/2015 1:03", "source": "entrance3", "destination": "general-gate1", "route-id": 0, "direction": 1, "car-id": "20154301124328-262", "car-type": 1},
			{"start-time": "5/1/2015 1:03", "end-time": "5/1/2015 1:06", "source": "general-gate1", "destination": "ranger-stop2", "route-id": 1, "direction": 1, "car-id": "20154301124328-262", "car-type": 4}
		];
		this.srcDstPaths = [
			{"route-idx": 0, "coordinates": "(115, 167), (115, 166), (115, 165), (115, 164), (115, 163), (115, 162), (115, 161), (115, 160), (115, 159), (115, 158), (115, 157), (115, 156), (115, 155), (115, 154), (115, 153), (115, 152), (115, 151), (115, 150), (115, 149), (115, 148), (114, 148), (114, 147), (114, 146), (114, 145), (114, 144), (115, 144), (115, 143), (115, 142), (115, 141), (115, 140), (114, 140), (114, 139), (114, 138), (114, 137), (114, 136), (114, 135), (115, 135), (115, 134), (115, 133), (115, 132), (114, 132), (113, 132), (113, 131), (113, 130), (112, 130), (112, 129), (112, 128), (111, 128), (111, 127), (110, 127), (110, 126), (109, 126), (109, 125), (108, 125), (108, 124), (108, 123), (107, 123), (107, 122), (107, 121), (106, 121), (106, 120), (106, 119), (105, 119), (105, 118), (104, 118), (104, 117), (103, 117), (103, 116), (103, 115), (102, 115), (102, 114), (101, 114), (101, 113), (100, 113), (100, 112), (99, 112), (99, 111), (99, 110), (98, 110), (98, 109), (97, 109), (97, 108), (97, 107), (96, 107), (96, 106), (96, 105), (95, 105), (95, 104), (95, 103), (94, 103), (94, 102), (94, 101), (94, 100), (93, 100), (93, 99), (93, 98), (93, 97), (93, 96), (93, 95), (93, 94), (93, 93), (93, 92), (92, 92), (92, 91), (92, 90), (91, 90), (90, 90), (89, 90), (89, 89), (89, 88), (90, 88), (90, 87), (90, 86), (90, 85), (91, 85), (91, 84), (91, 83), (91, 82), (91, 81), (91, 80), (90, 80), (90, 79), (89, 79), (89, 78), (88, 78), (88, 77), (88, 76), (87, 76), (87, 75), (86, 75), (86, 74), (86, 73), (85, 73), (85, 72), (85, 71), (86, 71), (86, 70), (86, 69), (86, 68), (86, 67), (86, 66), (85, 66), (85, 65), (85, 64), (84, 64), (84, 63), (83, 63), (83, 62), (82, 62), (82, 61), (81, 61), (81, 60), (81, 59), (81, 58), (80, 58), (80, 57), (79, 57), (79, 56), (78, 56), (78, 55), (78, 54), (77, 54), (77, 53), (77, 52), (76, 52), (76, 51), (76, 50), (75, 50), (75, 49), (74, 49), (74, 48), (74, 47), (73, 47), (73, 46), (72, 46), (72, 45), (71, 45), (71, 44), (71, 43), (70, 43), (70, 42), (70, 41), (69, 41), (69, 40), (69, 39), (68, 39), (68, 38), (68, 37), (67, 37), (67, 36), (67, 35), (66, 35), (66, 34), (66, 33), (65, 33), (64, 33), (64, 32), (64, 31), (64, 30), (64, 29), (63, 29), (63, 28), (63, 27), (63, 26), (63, 25), (64, 25), (64, 25)"},
			{"route-idx": 1, "coordinates": "(64, 25), (65, 25), (65, 26), (66, 26), (67, 26), (67, 27), (68, 27), (68, 28), (69, 28), (69, 29), (70, 29), (71, 29), (71, 30), (72, 30), (73, 30), (73, 31), (74, 31), (75, 31), (76, 31), (76, 32), (76, 33), (76, 34), (76, 35), (77, 35), (78, 35), (79, 35), (80, 35), (80, 35)"}
		];
		
		// Clean vehicle data
		this.srcDstData.forEach(function(element){
			element["start-time"] = Date.parse(element["start-time"]);
			element["end-time"] = Date.parse(element["end-time"]);
		});
		
		// Clean coordinate data, parse to int, convert to array
		this.srcDstPaths.forEach(function(element){
			element["coordinates"] = element["coordinates"].split(')');
			element["coordinates"].pop();	
			element["coordinates"] = element["coordinates"].map(function(element){
				var x = element.replace(', (', '');
				x = x.replace('(', '');
				x = x.split(',');
				x[0] = parseInt(x[0]) * scaleXY + (scaleXY/2);
				x[1] = parseInt(x[1]) * scaleXY + (scaleXY/2);
				return x;
			});
		});
		
		this.plotRoutes();*/
	}
	barDatainit(){
		var thisObject = this;
		d3.csv("./data/LocCoords.csv", function(data) {
			for (var i = 0; i < data.length; i++) {
				thisObject.textdata.push([data[i].NAME,data[i].X,data[i].Y]);

			}
		});

	
	}
	updatabardata(fdata){
		
		for (let data of fdata.reverse())
		{	
			switch(data["car-type"]){
				case "1":thisObject.bardata[data["source"]][0]++;break;
				case "2":thisObject.bardata[data["source"]][1]++;break;
				case "3":thisObject.bardata[data["source"]][2]++;break;
				case "4":thisObject.bardata[data["source"]][3]++;break;
				case "5":thisObject.bardata[data["source"]][4]++;break;
				case "6":thisObject.bardata[data["source"]][5]++;break;
				case "2P":thisObject.bardata[data["source"]][6]++;break;
			}
			
		}
		/*
		var thisObject=this;
		switch(data["car-type"]){
			case "1":thisObject.bardata[data["source"]][0]++;break;
			case "2":thisObject.bardata[data["source"]][1]++;break;
			case "3":thisObject.bardata[data["source"]][2]++;break;
			case "4":thisObject.bardata[data["source"]][3]++;break;
			case "5":thisObject.bardata[data["source"]][4]++;break;
			case "6":thisObject.bardata[data["source"]][5]++;break;
			case "2P":thisObject.bardata[data["source"]][6]++;break;
		}*/
	}
	
	loadVehicleData()
	{
		// Load vehicle data
		var thisObject = this;
		this.srcDstData = d3.csv("./data/SrcDstDataRaw.csv")
			.row(function(d) {

				return {
					// Clean time data
					"start-time": Date.parse(d["start-time"]),
					"end-time": Date.parse(d["end-time"]),
					"source": d["source"],
					"destination": d["destination"],
					"route-id": d["route-id"],
					"direction": d["direction"],
					"car-id": d["car-id"],
					"car-type": d["car-type"]
				};
			})
			.get(function(error, rows) {
				thisObject.srcDstData = rows;
				// Call next data function
				thisObject.loadPathData();				
			});
	}
	
	loadPathData()
	{
		// Load path data
		var scaleXY = this.scale;
		var thisObject = this;
			
		this.srcDstPaths = d3.csv("./data/SrcDstPaths.csv")
			.row(function(d) {
				return {
					"route-idx": d["route-idx"],
					"coordinates": d["coordinates"].split('(').map(function(element){
						// Clean coordinate data
						var x = element.replace('), ', '');
						x = x.replace('(', '');
						x = x.split(',');
						x[0] = parseInt(x[0]) * scaleXY + (scaleXY/2);
						x[1] = parseInt(x[1]) * scaleXY + (scaleXY/2);
						return x;
					}).slice(1)
				};
			})
			.get(function(error, rows) {
				thisObject.srcDstPaths = rows;
				// Finish initialization
				thisObject.plotRoutes();
			});
		this.plottext();
	}
	
	updateCarFilters(carType)
	{
		this.carFilters = carType;
		this.plotRoutes();
		this.initbardata();
		

		var btnContainer = document.getElementById("vehicleTypeButtons");
		var btns = btnContainer.getElementsByClassName("btn");
		for (var i = 0; i < btns.length; i++) {
		  btns[i].addEventListener("click", function() {
			var current = document.getElementsByClassName("active");
			current[0].className = current[0].className.replace(" active", "");
			this.className += " active";
		  });
		}
		

	}
	
	plottext(){
		var thisObject = this;
		
		var svgbar = d3.select("body").select("svg[id = 'bar']").style("visibility", "visible");
		d3.select("body").select("svg").selectAll("text")
		.data(this.textdata)
		.enter()
		.append("text")
		.attr("x", function(d){return d[1]*4-10})
		.attr("y", function(d){return d[2]*4})
		.attr("font-size","12px")
		.style("fill","#e6b422")
		.text(function(d){return d[0]})
		.on("mousemove", function(d){
			
			for (var i = 0; i < thisObject.textdata.length; i++) {
				thisObject.bardata[thisObject.textdata[i][0]]=[0,0,0,0,0,0,0];
			}
			var filteredData = thisObject.srcDstData.filter(function(d){
				return (d["start-time"] >= thisObject.startDate && d["start-time"] <= thisObject.endDate);
			});
			
			for (let data of filteredData.reverse())
			{	
				switch(data["car-type"]){
					case "1":thisObject.bardata[data["source"]][0]++;break;
					case "2":thisObject.bardata[data["source"]][1]++;break;
					case "3":thisObject.bardata[data["source"]][2]++;break;
					case "4":thisObject.bardata[data["source"]][3]++;break;
					case "5":thisObject.bardata[data["source"]][4]++;break;
					case "6":thisObject.bardata[data["source"]][5]++;break;
					case "2P":thisObject.bardata[data["source"]][6]++;break;
				}
			}
			var dataset=thisObject.bardata[d[0]];
			var bar=d3.select("body").select("svg[id = 'bar']")
			var carColorss = {
			"1": "#ff9933", 
			"2": "#3399ff", 
			"3": "#00e6e6", 
			"4": "#00e600", 
			"5": "#cccc00", 
			"6": "#cc33ff", 
			"7": "#e60000"};
			var SizeScale = d3.scale.linear()
			.domain([0, d3.max(dataset, function(d) { return d; })])
			.range([0, 140]);

			bar
			.selectAll("rect")
			.data(dataset)
			.enter()
			.append("rect")
			.attr("x", function(d, i) {
				return i * 40;  //
			})
			.attr("y", function(d) {
				return 150-SizeScale(d);  
			})
			.attr("width", 35)
			.attr("height", function(d) {
				return SizeScale(d);
			})
			.attr("fill", function(d, i) {
				return carColorss[i+1]; //
			})
			

			bar
			.selectAll("text")
			.data(dataset)
			.enter()
			.append("text")
			.attr("x", function(d, i) {
				return i * 40 ;  
			})
			.attr("y", function(d) {
					return 150;  
			})
			.text(function(d) {
					return d;
			})
			.attr("font-family", "sans-serif")
			.attr("font-size", "15px")
			.attr("fill", "white")

			bar	
			.append("text")
			.attr("x", 0)
			.attr("y", 20)
			.text(d[0])
			.attr("font-family", "sans-serif")
			.attr("font-size", "20px")
			.attr("fill", "white")



			svgbar.style("visibility", "visible");
		})
		.on("mouseout", function(){
			d3.select("body").select("svg[id = 'bar']").selectAll("rect").remove();
			d3.select("body").select("svg[id = 'bar']").selectAll("text").remove();
			svgbar.style("visibility", "hidden");
		});
		
	}


	plotRoutes(){
		// Initialize tooltip
		if (this.tooltip != undefined){
			this.tooltip.remove();
		}
		this.tooltip = d3.select("body")
			.append("div")
			.attr("class", "tooltip")
			.style("visibility", "hidden")
			.text("Tooltip");

		// Remove simulation data
		d3.select("body").select("svg").selectAll("rect").remove();
		
		// Need a local reference to the class
		var thisObject = this;
		
		// Initialize and clear paths
		var paths = d3.select("body").select("svg").selectAll("path");
		
		var filteredData = this.srcDstData.filter(function(d){
			return (d["start-time"] >= thisObject.startDate && d["start-time"] <= thisObject.endDate) && (thisObject.carFilters === "all" || d["car-type"].toString() === thisObject.carFilters);
		});
		
		// Filter path data to only show the most recent path/vehicle-type combination (to avoid crashing the browser). Also track number of data.
		var combinations = {};
		var finalData = [];
		for (let data of filteredData.reverse())
		{	
			

			if (!(data["car-type"].toString() + '-' + data["route-id"].toString() in combinations)) {
				combinations[data["car-type"].toString() + '-' + data["route-id"].toString()] = 1;
				finalData[finalData.length] = data;
			}
			else {
				combinations[data["car-type"].toString() + '-' + data["route-id"].toString()] += 1;
			}
		}

		
		
		
		// Draw paths
		var pathData = paths.data(finalData);
		var carColors = this.carColors;
		
		// Draw new data
		pathData
			.enter()
			.append("path")
			.attr("d", function(d){
					return thisObject.lineGenerator(thisObject.srcDstPaths[d["route-id"]]["coordinates"]);
			})
			.attr("stroke", function(d){
				return carColors[d["car-type"].toString()];
			})
			.attr("fill", "none")
			.attr("stroke-width", function(d){
				var values = Object.values(combinations);
				var widthScale = d3.scale.linear()
					.domain([Math.min.apply(Math, values), Math.max.apply(Math, values)])
					.range([thisObject.scale, thisObject.scale * 4]);
				return widthScale(combinations[d["car-type"] + '-' + d["route-id"]]).toString() + "px";
			})
			.on("mouseover", function(d){
				thisObject.tooltip.text("Car ID: " + d["car-id"] + "\nCar Type: " + d["car-type"] + "\nNumber of Vehicles: " + combinations[d["car-type"] + '-' + d["route-id"]]); 
				thisObject.tooltip.style("visibility", "visible");
				
				// Highlight the current route by lowering opacity of others
				var selectedRoute = this;
				d3.selectAll("path").transition().style('opacity',function () {
					return (this === selectedRoute) ? 1.0 : 0;
				});
			})
			.on("mousemove", function(){
				thisObject.tooltip.style("top", (d3.event.pageY - 10)+"px").style("left",(d3.event.pageX + 10) + "px");
			})
			.on("mouseout", function(){
				thisObject.tooltip.style("visibility", "hidden");
				
				// Reset opacity
				d3.selectAll("path").transition().style('opacity', 1.0);
			});
		
		// Update existing data
		pathData
			.attr("d", function(d){
				return thisObject.lineGenerator(thisObject.srcDstPaths[d["route-id"]]["coordinates"]);
			})
			.attr("stroke", function(d){
				return carColors[d["car-type"].toString()];
			})
			.attr("stroke-width", function(d){
				var values = Object.values(combinations);
				var widthScale = d3.scale.linear()
					.domain([Math.min.apply(Math, values), Math.max.apply(Math, values)])
					.range([thisObject.scale, thisObject.scale * 4]);
			return widthScale(combinations[d["car-type"] + '-' + d["route-id"]]).toString() + "px";
			})
			.on("mouseover", function(d){
				thisObject.tooltip.text("Car ID: " + d["car-id"] + "\nCar Type: " + d["car-type"] + "\nNumber of Vehicles: " + combinations[d["car-type"] + '-' + d["route-id"]]); 
				thisObject.tooltip.style("visibility", "visible");
				
				// Highlight the current route by lowering opacity of others
				var selectedRoute = this;
				d3.selectAll("path").transition().style('opacity',function () {
					return (this === selectedRoute) ? 1.0 : 0;
				})
				
			});
		
		// Remove old data
		pathData.exit().remove()
	}

	plotPositions(){
		// While plotRoutes plots entire routes, plotPositions instead plots all vehicle positions at a single point in time
		
		// Remove all paths
		d3.select("body").select("svg").selectAll("path").remove();
		
		var thisObject = this;
		
		// Filter data
		var filteredData = this.srcDstData.filter(function(d){
			return (d["start-time"] <= thisObject.startDate && d["end-time"] >= thisObject.startDate) && (thisObject.carFilters === "all" || d["car-type"].toString() === thisObject.carFilters);
		});
		
		// Compute x and y coordinates given current time step
		filteredData.forEach(function(element){
			var progress = Math.round(((thisObject.startDate - element["start-time"]) / (element["end-time"] - element["start-time"])) * thisObject.srcDstPaths[element["route-id"]]["coordinates"].length);
					
			if (isNaN(progress))
			{
				progress = 0;
			}
			
			// Account for direction
			if (parseInt(element["direction"]) === 0){
				progress = thisObject.srcDstPaths[element["route-id"]]["coordinates"].length - progress;
			}
			
			progress = Math.min(Math.max(progress, 0), thisObject.srcDstPaths[element["route-id"]]["coordinates"].length - 1);
			
			element["x"] = parseInt(thisObject.srcDstPaths[element["route-id"]]["coordinates"][progress][0] - (thisObject.scale * 3 / 2));
			element["y"] = parseInt(thisObject.srcDstPaths[element["route-id"]]["coordinates"][progress][1] - (thisObject.scale * 3 / 2));
		})

		var rects = d3.select("body").select("svg").selectAll("rect");

		// Draw new data
		rects.data(filteredData)
			.enter()
				.append("rect")
				.attr("x", function(d){
					return d["x"];
				})
				.attr("y", function(d){
					return d["y"];
				})
				.attr("width", this.scale * 3)
				.attr("height", this.scale * 3)
				.attr("fill", function(d){
					return thisObject.carColors[d["car-type"].toString()];
				});

		// Update existing data
		rects.data(filteredData)
			.attr("x", function(d){
				return d["x"];
			})
			.attr("y", function(d){
				return d["y"];
			})
			.attr("fill", function(d){
				return thisObject.carColors[d["car-type"].toString()];
			});

		// Remove old data
		rects.data(filteredData).exit().remove();
	}
	
	enableSimulation()
	{
		d3.select("body").select('button[id = "simOnBtn"]')
			.style("visibility", "hidden");
		d3.select("body").select('button[id = "simOffBtn"]')
			.style("visibility", "visible");
		d3.select("body").select('div[id = "simTimer"]')
			.style("visibility", "visible")
			.style("height", "1em")
			.html("");
		
		var thisObject = this;
		// Store original start date
		this.initialDate = this.startDate;
		
		// Start interval function
		this.simInterval = setInterval(function(){
			var datetime = new Date(thisObject.startDate).toString();
			d3.select("body").select('div[id = "simTimer"]')
				.html("Current time: " + datetime);
			
			// Increment date (in milliseconds)
			thisObject.startDate += 10000;
			
			thisObject.plotPositions();
		}, 20);
	}
	
	disableSimulation()
	{
		d3.select("body").select('button[id = "simOnBtn"]')
			.style("visibility", "visible");
		d3.select("body").select('button[id = "simOffBtn"]')
			.style("visibility", "hidden");
		d3.select("body").select('div[id = "simTimer"]')
			.style("visibility", "hidden")
			.style("height", "0em");
		
		clearInterval(this.simInterval);
		
		this.startDate = this.initialDate;
		this.plotRoutes();
	}
}

// Global class
let routeDrawing = new RouteDrawing();

// Date + Time selection callback
$(function() {
	$('input[name="datetimes"]').daterangepicker({
		"timePicker": true,
		"minDate": "05/01/2015 12:00 AM",
		"maxDate": "05/31/2016 11:59 PM",
		"startDate": "05/01/2015 12:00 AM",
		"endDate": "05/31/2016 11:59 PM",
		"locale": {
			format: 'MM/DD/YYYY hh:mm A'
		}
	}, function(start, end, label){
		// Date + Time callback
		//console.log('New date selection: ' + start.format('YYYY-MM-DD hh:mm A') + ' to ' + end.format('YYYY-MM-DD hh:mm A'));
		routeDrawing.startDate = Date.parse(start);
		routeDrawing.endDate = Date.parse(end);
		routeDrawing.plotRoutes();
		routeDrawing.plottext();
	});
});