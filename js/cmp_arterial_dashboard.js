// Boston Region MPO 2019 Arterial Performance Dashboard
// Derived from  Boston Regiono MPO 2015 Arterial Performance Dashboard
//
// Data source: processed INRIX data, GIS reference data
// Data presentation: OpenLayers maps, accessible table, d3 visualizations 

// **************************************************************************************************************
// Contents (in line-number order) of this file:
//
// 1.  Miscellaneous state variables global to the app
// 2.  createChart() - function to render d3 charts - the displayed metrics can be updated via the renderChart()
// 	   closure function, which allows for user input to change the chart dimensions, dataStore, theme, color
//     palette, and more (see renderData() for execution)
// 3.  renderTable(dataStore, szRouteDesc) - renders the data in the specified data store for the
//     specified route (text) in the form of a table
// 4.  getData - submits WFS request to get CMP data for the route specified in the "selected_route"
//     combo box; collects WFS response, and stores it in aDataStore; pans map to the selected
//     route; calls 'renderData' to render data in both tabular and graphic form
// 5.  renderData - calls functions to render data in tabular and graphic forms
// 6.  showSelectedGraphic - makes visible the d3 visualization (in 'detail' panel) for the selected theme
// 7.  setOverviewMapTheme - selects the theme (symbology) for the 'overview' map
// 8.  setDetailMapTheme - selects the theme (symbology) for the 'detail' map
// 9.  setDetailDisplayFormat - toggles between table and graphic (visualization) format in 'detail' panel
// 10. setMainDisplay - toggles between 'overview' and 'detail' panels
// 11. Application - resets the app to its initial state
// 12. initDetailMap - initializes the OpenLeays map in the 'detail' panel
// 13. initOverviewMap - initializes the OpenLayers map in the 'overview' panel
// 14. displayHelp - routine to pop-open the Help page for this app
// 15. init - main routine called when document.ready event fires
// **************************************************************************************************************

// **************************************************************************************************************
// This application depends upon the following libraries:
// 
// 1. Modernizr - a customized build to only test for browser SVG support
// 2. jQuery - to tame the DOM, provide useful utilities, etc.
// 3. jQueryUI - for button and radio button UI element support
// 4. CTPS accessible grid - for rendering HTML tables that are navigable by screen readers
// 5. d3- for data visualization (in this case, charts)
// 6. d3-tip - for tooltips in d3 visualizations
// 7. OpenLayers - for client-side mapping
// 8. CMP_Arterial_Routes - custom library to select routes
// 9. CMP_Arterial_Themes - custom library to select map/visualization themes and OpenLayers 3 styles
// **************************************************************************************************************

var szServerRoot = location.protocol + '//' + location.hostname;
szServerRoot += (location.hostname.includes('appsrvr3')) ? ':8080/geoserver/' : '/maploc/';
var szWorkspace = (location.hostname.includes('appsrvr3')) ? 'ctps_pg:' : 'postgis:';
var szWMSserverRoot = szServerRoot + '/wms/',
    szWFSserverRoot = szServerRoot + '/wfs/';

// Click Tolerance for Route Number Popup
var IDENTIFY_TOLERANCE = 5;

// Map parameters
var mapCenter = [232908.27147578463, 902215.0940791398],
    mapZoom = 3.0;

// Placeholders for OpenLayers map objects
var overviewMap = {},
    detailMap = {};
	
// Placeholder object for "speed data" (i.e., INRIX data) layer in overview map
var oOverviewSpeedLayer = {};
	
// Placeholder object for highlight layer in detail map
var oHighlightLayer = {};	

// Tabular data store and spatial data feature cache
var aDataStore = [], 	// Tabular data store
    aFeaturesGeo = [];	// Geographic fature cache

// OpenLayers Map Projection -- MA State Plane NAD83: "EPSG:26986"
var projection = new ol.proj.Projection({
	code: 'EPSG:26986',
	extent: [33861.26,777514.31,330846.09,959747.44],
	units: 'm'
});
ol.proj.addProjection(projection);
var MaStatePlane = '+proj=lcc +lat_1=42.68333333333333 +lat_2=41.71666666666667 +lat_0=41 +lon_0=-71.5 +x_0=200000 +y_0=750000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs';
ol.proj.addCoordinateTransforms(
	'EPSG:4326',
	projection,
	function(coordinate){
		var WGS_to_MAState = proj4(MaStatePlane).forward(coordinate);
		return WGS_to_MAState;
	},
	function(coordinate){
		var MAState_to_WGS = proj4(MaStatePlane).inverse(coordinate);
		return MAState_to_WGS;
	}
);

// Some useful functions for formatted rendering of attribute values
var fRenderLength = function(dLength) { if (dLength === null || dLength === undefined) { return("N/A"); } else {return(dLength.toFixed(2)); } },
    fRenderSpeed = function(dSpeed) { if (dSpeed === null) { return("N/A"); } else { return(dSpeed.toFixed(0)); } },
    fRenderCongSpeed = function(dSpeed) { if (dSpeed === null || dSpeed === 0) { return("N/A"); } else { return(dSpeed.toFixed(0)); } },
    fRenderMinutes = function(dMinutes) { if (dMinutes === null) { return("N/A"); } else { return(dMinutes.toFixed(1)) } },
    fRenderIndex = function(dIndex) { if (dIndex === null) { return("N/A"); } else {return(dIndex.toFixed(2)); } },
	fRenderLottr = function(dIndex) { if (dIndex === null) { return("N/A"); } else {return(dIndex.toFixed(2)); } };

// Renders reusable d3 chart with "data" from aDataStore, and other used-input variables
var createChart = function() {
	var data = [],
		containerWidth = 1125,
		containerHeight = 230,
		margin = {top: 20, right: 20, bottom: 50, left: 40},
		xTicks = 20,
		yTicks = 12,
		xAxisText = "Miles",
		yAxisText = CMP_Arterial_Themes.aThemes[0].yAxisText,
		theme = CMP_Arterial_Themes.aThemes[0].theme,
		palette = CMP_Arterial_Themes.aThemes[0].palette,
		routeDesc = "",
		themeName = CMP_Arterial_Themes.aThemes[0].name;
	var tip;
	var caption;
	var svg;
	var axis;
	
	function chart() {
		// Define chart width and height
		width = containerWidth - margin.left - margin.right;
		height = containerHeight - margin.top - margin.bottom;
		
		// Define x and y scales
		var x = d3.scaleLinear().range([0, width]);
		var y = d3.scaleLinear().range([height, 0]);
		var xDomainMax = d3.sum(data, function(d) { return(d.DISTANCE); });
		var yDomainMax = d3.max([d3.max(data, function(d) { return(d[theme]); }), 
	                             d3.max(data, function(d) { return(d[theme]); })]);
		x.domain([0, xDomainMax]);	
		y.domain([0, yDomainMax]);
		
		// Define x and y axes
		var xAxis = d3.axisBottom(x)
			.ticks(xTicks);
		var yAxis = d3.axisLeft(y)
			.ticks(yTicks);
		
		// Create/Update tip
		if (!tip) {
			 tip = d3.tip()
				.attr('class', 'd3-tip')
				.offset([-10, 0]);		
		};
		tip.html(function(d) { 
			var distance = fRenderLength(d.DISTANCE); 
			var measure, label_begin, label_end;
			switch(theme) {
				case "AM_CONG_MN":
				case "PM_CONG_MN":
					measure = fRenderMinutes(d[theme]);
					label_begin = "Congested Time: ";
					label_end = " minutes";
					break;
				case "AM_SPD_IX":
				case "PM_SPD_IX":
					measure = fRenderIndex(d[theme]);
					label_begin = "Speed Index: ";
					label_end = "";
					break;
				case "AM_AVTT_IX":
				case "PM_AVTT_IX":
					measure = fRenderIndex(d[theme]);
					label_begin = "Travel Time Index: ";
					label_end = "";
					break;
				default:
					measure = fRenderIndex(d[theme]);
					label_begin = "Performance Measure: ";
					label_end = "";
			};
			var tipHTML = 	"Segment Start: " + d.SEG_BEGIN + 
							"<br>Segment End: " + d.SEG_END + 
							"<br>Length: " + distance + " miles<br>" +
							"<span style='color:" + palette(measure) + "'>" + label_begin + measure + label_end + "</span>";
			return tipHTML;
		});
		
		// If no SVG exists, create one (and a h3 title)
		if (!svg) {
			caption = d3.select('#graphic_div')	// The chart caption.
				.append("h3")
					.attr('class','graphic_caption');
			svg = d3.select('#graphic_div')
				.append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
				.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
					.call(tip);
		};
		caption.html(themeName + ' for ' + routeDesc);
		
		// Exit, Enter, and Update chart
		var bars = svg.selectAll(".bar")
			.data(data)
		bars.exit()
				.style("fill", "none")
			.transition().duration(500).ease(d3.easeLinear)
				.attr("x", width + 100)
				.style("fill-opacity", 1e-6)
				.remove();
		bars.style("fill-opacity", 1)
				.on("mouseleave", function(d) { tip.hide(d); })
			.transition().duration(500).ease(d3.easeLinear)
				.attr("x", 		function(d) { return x(+d.START_DISTANCE); })
				.attr("width", 	function(d) { return x(+d.DISTANCE); })
				.attr("y", 		function(d) { return y(+d[theme]); })
				.attr("height", function(d) { return height - y(+d[theme]); })
				.style("fill", 	function(d) { return palette(+d[theme]); });
		bars.enter()
			.append("rect")
				.attr("class", "bar")
				.attr("x", 		function(d) { return x(+d.START_DISTANCE); })
				.attr("width", 	function(d) { return x(+d.DISTANCE); })
				.attr("y", 		function(d) { return y(+d[theme]); })
				.attr("height", function(d) { return height - y(+d[theme]); })
				.style("fill", "none")
				.style("fill-opacity", 1e-6)
				.on("mouseenter", function(d) { tip.show(d); })
				.on("mouseleave", function(d) { tip.hide(d); })
			.transition().duration(500).ease(d3.easeLinear)
				.style("fill-opacity", 1)
				.style("fill", function(d) { return palette(+d[theme]); });
		
		// Create or Update axes (done last so they are visually on top)
		if (!axis) {
			axis = "axis_rendered";
			svg.append("g")
					.attr("class", "x-axis")
					.attr("transform", "translate(0," + height + ")")
					.call(xAxis)
				.append("text")
					.attr("class", "x-axis-label")
					.attr("x", width/2)
					.attr("y", 25)
					.attr("dx", "0.71em")
					.style("text-anchor", "middle")
					.attr("fill", "#000")
					.text(xAxisText);
				
			svg.append("g")
					.attr("class", "y-axis")
					.call(yAxis)
				.append("text")
					.attr("transform", "rotate(-90)")
					.attr("class", "y-axis-label")
					.attr("x", -height/2)
					.attr("y", -35) // 6
					.attr("dy", ".71em")
					.style("text-anchor", "middle")
					.attr("fill", "#000")
					.text(yAxisText);
		};	
		svg.select(".x-axis")
			.transition()
				.duration(500)
				.ease(d3.easeLinear)
				.call(xAxis);
		$('.x-axis-label').text(xAxisText);
		svg.select(".y-axis")
			.transition()
				.duration(500)
				.ease(d3.easeLinear)
				.call(yAxis);
		$('.y-axis-label').text(yAxisText);
	};
	
	// Getter/Setter functions
	chart.data = function(value) {
		if (!arguments.length) return data;
		data = value;
		return chart;
	};
	chart.containerWidth = function(value) {
		if (!arguments.length) return containerWidth;
		containerWidth = value;
		return chart;
	};
	chart.containerHeight = function(value) {
		if (!arguments.length) return containerHeight;
		containerHeight = value;
		return chart;
	};
	chart.margin = function(value) {
		if (!arguments.length) return margin;
		margin = value;
		return chart;
	};
	chart.xTicks = function(value) {
		if (!arguments.length) return xTicks;
		xTicks = value;
		return chart;
	};
	chart.yTicks = function(value) {
		if (!arguments.length) return yTicks;
		yTicks = value;
		return chart;
	};
	chart.xAxisText = function(value) {
		if (!arguments.length) return xAxisText;
		xAxisText = value;
		return chart;
	};
	chart.yAxisText = function(value) {
		if (!arguments.length) return yAxisText;
		yAxisText = value;
		return chart;
	};
	chart.theme = function(value) {
		if (!arguments.length) return theme;
		theme = value;
		return chart;
	};
	chart.palette = function(value) {
		if (!arguments.length) return palette;
		palette = value;
		return chart;
	};
	chart.routeDesc = function(value) {
		if (!arguments.length) return routeDesc;
		routeDesc = value;
		return chart;
	};
	chart.themeName = function(value) {
		if (!arguments.length) return themeName;
		themeName = value;
		return chart;
	};
	return chart;
	
}; // createChart
var renderChart = createChart();

			
// Function to render data in data store to an accessible table
//
var renderTable = function(dataStore, szRouteDesc) {
	// Clear out previous table (if any).
	$('#table_div').empty();
	
	// Column descriptors for table.
	var columnDesc =  [
				//		{ header : 	'Road Number', 	dataIndex : 'RTE_NAME', colHeaderClass : 'road_num_col' }, 
				//		{ header : 	'DIRECTION', dataIndex : 'DIRECTION' },
						{ header : 	'Community(ies)', dataIndex : 'COMMUNITY', colHeaderClass : 'community_cols' },
						{ header : 	'Beginning at',	dataIndex : 'SEG_BEGIN', colHeaderClass : 'begin_end_cols' },
						{ header : 	'Ending at', dataIndex : 'SEG_END', colHeaderClass : 'begin_end_cols' },    
						{ header : 	'Length (Miles)', dataIndex : 'DISTANCE', renderer: fRenderLength },
						{ header :	'Number of Lanes', dataIndex: 'LANES' },
						{ header : 	'Speed Limit', dataIndex: 'SPD_LIMIT' },
						// AM stats
						{ header : 	'Congested speed (AM)', dataIndex : 'AM_CONG_SP', renderer: fRenderCongSpeed },
						{ header : 	'Average Speed (AM)', dataIndex : 'AM_AVG_SP', renderer: fRenderSpeed },
						{ header : 	'Speed index (AM)',	dataIndex : 'AM_SPD_IX', renderer: fRenderIndex },
						{ header : 	'Average travel-time index (AM)', dataIndex : 'AM_AVTT_IX', renderer: fRenderIndex },
						{ header : 	'Delay (AM)',	dataIndex : 'AM_DELAY', renderer: fRenderLength },
						{ header : 	'Congested minutes (AM)',	dataIndex : 'AM_CONG_MN', renderer: fRenderLength },	
						{ header : 'LOTTR (AM)', dataIndex : 'AM_LOTTR', renderer: fRenderLottr },
						// PM stats
						{ header : 	'Congested speed (PM)', dataIndex : 'PM_CONG_SP', renderer: fRenderCongSpeed },
						{ header : 	'Average Speed (PM)', dataIndex : 'PM_AVG_SP', renderer: fRenderSpeed },
						{ header : 	'Speed index (PM)',	dataIndex : 'PM_SPD_IX', renderer: fRenderIndex },
						{ header : 	'Average travel-time index (PM)', dataIndex : 'PM_AVTT_IX', renderer: fRenderIndex },
						{ header : 	'Delay (PM)',	dataIndex : 'PM_DELAY', renderer: fRenderLength },
						{ header : 	'Congested minutes (PM)',	dataIndex : 'PM_CONG_MN', renderer: fRenderLength },
						{ header : 'LOTTR (PM)', dataIndex : 'PM_LOTTR', renderer : fRenderLottr }
					];

	var szSummary = 'Columns are: community(ies), beginning location, ending location, '
	szSummary += 'length in miles, number of lanes, speed limit, ';
	szSummary += 'AM congested speed, AM average speed, AM speed index, AM average travel-time index, ';
	szSummary += 'AM delay, AM congested minutes';
	szSummary += 'PM congested speed, PM average speed, PM speed index, PM average travel-time index, ';
	szSummary += 'PM delay and PM congested minutes.';
	
	var speedGrid = new AccessibleGrid( { divId 	:	'table_div',
												  tableId 	:	't1',
												  summary	: 	szSummary,
												  caption	:	szRouteDesc,
												  colDesc	: 	columnDesc } );	
	speedGrid.loadArrayData(dataStore); 	
}; // renderTable()

// Wrapper function to render data to an accessible table and d3 chart
//
var renderData = function(dataStore) {
	// Collect "selected_route" and "selected_theme":
	var szRouteDesc = $("#selected_route option:selected").text();
	var iThemeId = +($("#selected_theme_detail option:selected").val());
	
	// Render the accessible table:
	renderTable(dataStore, szRouteDesc);
	
	// Render the d3 chart:
	if (iThemeId === 0) { return };
	renderChart.data(dataStore)
		.yAxisText(CMP_Arterial_Themes.aThemes[iThemeId].yAxisText)
		.theme(CMP_Arterial_Themes.aThemes[iThemeId].theme)
		.palette(CMP_Arterial_Themes.aThemes[iThemeId].palette)
		.routeDesc(szRouteDesc)
		.themeName(CMP_Arterial_Themes.aThemes[iThemeId].name);
	d3.select('#graphic_div')
		.call(renderChart);
					  
}; // renderData

// Event handler for route combo box on-change event.
// Event handler for 'selected_route' combobox selection. 
//     1. Performs WFS request to fetch data.
//     2. If WFS request is successful, calls renderData to render data.
var getData = function(){ 
	var szRouteDesc = $("#selected_route option:selected").text();
	var iRouteId = +($("#selected_route option:selected").val());
	$('#detail_popup').hide();
	
	// Break out if no route selected, display nothing:
	if (iRouteId === 0) {
		alert('No route selected. Please select a route to display.');
		oHighlightLayer.getSource().clear();
		$('#detail_legend').hide();
		$('#graphic_div').hide();
		$('#table_div').hide();
		$('.congestion_scan_container_class').hide();
		return;
	};
	
	//  Submit WFS request to get data for route, and zoom map to it.
	var cqlFilter = "(rid=='" + iRouteId + "')";
	var szUrl = szWFSserverRoot + '?';
		szUrl += 'service=wfs';
		szUrl += '&request=getfeature';
		szUrl += '&typename=' + szWorkspace + 'ctps_cmp_2019_art_routes_ext_v3';
		szUrl += '&srsname=EPSG:26986';
		szUrl += '&outputformat=json';
		szUrl += '&cql_filter=' + cqlFilter;
	
	$.ajax({ url		: szUrl,
			 type		: 'GET',
			 dataType	: 'json',
			 success	: 	function (data, textStatus, jqXHR) {	
								var reader = new ol.format.GeoJSON();
								aFeaturesGeo = [];
								aFeaturesGeo = reader.readFeatures(jqXHR.responseText);
								if (aFeaturesGeo.length === 0) {
									alert('WFS request in getData returned no features.');
									// clear_selection();
									return;
								};
								
								// Clear data store and any existing features in OL Layer.
								aDataStore = [];
								oHighlightLayer.getSource().clear();
								
								// Loop through features returned, populate data store, 
								// add features to layer, and set up bounds for animated transition.
								var i;
								var attrs = [];
								var oBounds = { minx: [],
												miny: [],
												maxx: [],
												maxy: [] };
								var vSource = oHighlightLayer.getSource();
								for (i = 0; i < aFeaturesGeo.length; i++) {				
									attrs = aFeaturesGeo[i].getProperties();
									var newFeature = new ol.Feature(attrs);
									vSource.addFeature(newFeature);
									
									var oGeo = aFeaturesGeo[i].getGeometry().getExtent()
									oBounds.minx.push(oGeo[0]);
									oBounds.miny.push(oGeo[1]);
									oBounds.maxx.push(oGeo[2]);
									oBounds.maxy.push(oGeo[3]);							
									
									aDataStore[i] = {	'MYID'		: i, 
														'COMMUNITY'	: attrs.community,					
														'FROM_MEAS'	: attrs.from_meas,
														'TO_MEAS'	: attrs.to_meas,
														'ROUTE_NUM'	: attrs.route_num,
														'DIRECTION'	: attrs.direction,
														'SEG_BEGIN'	: attrs.seg_begin,
														'SEG_END'	: attrs.seg_end, 
														'DISTANCE'  : attrs.distance,
														'LANES'		: attrs.lanes,
														'SPD_LIMIT'	: attrs.spd_limit,
														// AM stats
														'AM_AVG_SP'	: attrs.am_avg_sp, 
														'AM_CONG_SP': attrs.am_cong_sp,
														'AM_DELAY'	: attrs.am_delay,
														'AM_AVTT_IX': attrs.am_avtt_ix,
														'AM_5PTT_IX': attrs.am_5ptt_ix,												
														'AM_SPD_IX'	: attrs.am_spd_ix,
														'AM_CONG_MN': attrs.am_cong_mn,		
														'AM_LOTTR'  : attrs.am_lottr,
														// PM stats
														'PM_AVG_SP'	: attrs.pm_avg_sp,
														'PM_CONG_SP': attrs.pm_cong_sp,			
														'PM_DELAY'	: attrs.pm_delay,	
														'PM_AVTT_IX': attrs.pm_avtt_ix,
														'PM_5PTT_IX': attrs.pm_5ptt_ix,												
														'PM_SPD_IX'	: attrs.pm_spd_ix,	
														'PM_CONG_MN': attrs.pm_cong_mn,
														'PM_LOTTR'  : attrs.pm_lottr
													};	                                         
								};
								
								//  Legacy comment from Mary McShane:
								//  Sort JS array by Town (source -- www.devcurry.com/2010/05/sorting-json-array.html)
								//  For some reason, this is not picking up the minus sign on the sort keys--ergo, 2 versions:
								function SortByFmeas(x,y) {            
									if(x.FROM_MEAS<0){                                   
											return ((y.FROM_MEAS == x.FROM_MEAS) ? 0 : ((y.FROM_MEAS > x.FROM_MEAS) ? 1 : -1 ));
									} else {
											return ((y.FROM_MEAS == x.FROM_MEAS) ? 0 : ((y.FROM_MEAS < x.FROM_MEAS) ? 1 : -1 ));
									}
								}; 
								aDataStore.sort(SortByFmeas); 
								
								// Add the START_DISTANCE attribute to each record.
								// The addition of this attribute simplifies chart generation.
								var dCumDistance = 0; 
								for (i = 0; i < aDataStore.length; i = i + 1) {
									aDataStore[i].START_DISTANCE = dCumDistance;
									dCumDistance = dCumDistance + parseFloat(aDataStore[i].DISTANCE);
								};
								
								// Animated transition
								var oBoundsRoute = 	[	Math.min.apply(null,oBounds.minx),
														Math.min.apply(null,oBounds.miny),
														Math.max.apply(null,oBounds.maxx),
														Math.max.apply(null,oBounds.maxy)	];								
								detailMap.getView().fit(oBoundsRoute, { size: detailMap.getSize(),duration: 2000 });
								
								// Add features to vector layer.
								oHighlightLayer.setSource(vSource);
								
								// Render data
								renderData(aDataStore);
								// Refresh detail sub-display.
								refreshDetailDisplay();
							},
			 error		: 	function (qXHR, textStatus, errorThrown ) {
								alert('WFS request in getData failed.\n' +
										'Status: ' + textStatus + '\n' +
										'Error:  ' + errorThrown);
							}							
	});  //    END OpenLayers WFS request 
};  // getData

var showSelectedGraphic = function(iThemeId) {
	if (iThemeId === 0) {
		alert("No theme selected. Please select a theme and route to display chart.");
		$('#detail_legend').hide();
		$('#graphic_div').hide();
	} else if (iThemeId > 0 && iThemeId < CMP_Arterial_Themes.aThemes.length) {
		renderData(aDataStore);
		$('#graphic_div').show();
	} else {
		alert("Invalid theme ID: " + iThemeId);
	}
} // showSelectedGraphic

// Set theme and legend for the 'overview' map.
var setOverviewMapTheme = function() {
	var iThemeId = +($("#selected_theme_overview option:selected").val());  
	$('#overview_popup').hide();
	
	if (iThemeId === 0) {
		alert("No theme selected");
		oOverviewSpeedLayer.setVisible(false);
		$('#overview_legend').hide();
	} else if (iThemeId > 0 && iThemeId < CMP_Arterial_Themes.aThemes.length) {
		var params = {};
		params.STYLES = CMP_Arterial_Themes.aThemes[iThemeId].sld;
		var source = oOverviewSpeedLayer.getSource();
		source.updateParams(params);
		oOverviewSpeedLayer.setVisible(true);			
/*
		CTPS.cmpArtApp.oOverviewSpeedData.setSource(
			new ol.source.TileWMS({
				url		: CTPS.cmpArtApp.szWMSserverRoot2,
				params	: {
					'LAYERS': CMP_Arterial_Themes.aThemes[iThemeId].name,
					'TRANSPARENT': 'true'
				}
			})
		);
		CTPS.cmpArtApp.oOverviewSpeedData.setVisible(true);	
*/
		// Set legend.
		$('#overview_legend').html('<img src="images/' + CMP_Arterial_Themes.aThemes[iThemeId].legend + '"></img>');		
		$('#overview_legend').show();
	} else {
		alert("Invalid theme ID: " + iThemeId);
	}
}; // setOverviewMapTheme

// Set theme and legend for 'detail' map and d3 visualization.
var setDetailMapTheme = function() {
	var iThemeId = +($("#selected_theme_detail option:selected").val());
	var	ix = +($("#selected_route option:selected").val());
	$('#detail_popup').hide();
	
	if (iThemeId === 0) {
		alert("No theme selected.");
		oHighlightLayer.setStyle(CMP_Arterial_Themes.aThemes[iThemeId].style);
		$('#detail_legend').hide();
		$('#graphic_div').hide();
	} else if (iThemeId > 0 && iThemeId < CMP_Arterial_Themes.aThemes.length) {
		oHighlightLayer.setStyle(CMP_Arterial_Themes.aThemes[iThemeId].style);
		// Set legend.
		$('#detail_legend').html('<img src="images/' + CMP_Arterial_Themes.aThemes[iThemeId].legend + '"></img>');
		$('#detail_legend').show();
		// If the "display choice" is 'display_graphic', hide all the "graphic_div's", 
		// and then only expose the one for the selected metric.
		var szRadioId = $('#radio_span_2 :radio:checked').attr('id');
		if (szRadioId === 'display_graphic') {
			$('.graphic_class').hide();
			if (iThemeId > 0 && ix > 0) {	// The 0th <option> element is the one for "Select a theme"
				showSelectedGraphic(iThemeId);
			};
		};		
	} else {
		alert("Invalid theme ID: " + iThemeId);	
	}			
}; // setDetailMapTheme

// Enums for detail display option values
var DISPLAY_FORMAT_TABLE = 0,
    DISPLAY_FORMAT_CHART = 1,
    DISPLAY_FORMAT_SCAN  = 2; // To be removed
var detailDisplayFormat = DISPLAY_FORMAT_TABLE;

var refreshDetailDisplay = function() {
	var	ix = +($("#selected_route option:selected").val());
	var iThemeId = +($("#selected_theme_detail option:selected").val());
	switch (detailDisplayFormat) {
		case DISPLAY_FORMAT_TABLE:
			$('.graphic_class').hide();
			$('.congestion_scan_container_class').hide();
			if (ix > 0) {  // The 0th <option> element is the one for "Select a route"
				$('.table_class').show();
			}
			break;
		case DISPLAY_FORMAT_CHART:
			$('.table_class').hide();
			$('.congestion_scan_container_class').hide();
			// Show only the graphic_div corresponding to the selected map theme.
			if (iThemeId > 0 && ix > 0) {	// The 0th <option> element is the one for "Select a theme"
				showSelectedGraphic(iThemeId);
			};
			break;
		// *** THIS CASE TO BE REMOVED ***
		case DISPLAY_FORMAT_SCAN:
			$('.table_class').hide();
			$('.graphic_class').hide();
			// Show only the congestion scan div corresponding to the selected route.
			// First, be sure to clear whatever scan might be there.
			$('.congestion_scan_container_class').hide();
			if (ix > 0) {  // The 0th <option> element is the one for "Select a route"
				var szDivId = CMP_Arterial_Routes.oRoutes.aRouteList[ix - 1].CONGESTION_SCAN_DIV; 
				$('#' + szDivId).show();
			}
			break;
		default: 
			break;
	}
}; // refreshDetailDisplay

// Handles toggling between table, graphic, and congestion scan sub-displays on 'detail' panel.
var setDetailDisplayFormat = function(e) {
	var oElement, szTheme, szThemeId, iThemeid, ix, szDivId;
	switch(e.target.id) {
		case 'display_table':
			detailDisplayFormat = DISPLAY_FORMAT_TABLE;
			break;
		case 'display_graphic':
			detailDisplayFormat = DISPLAY_FORMAT_CHART;
			break;
		case 'display_congestion_scan':
			detailDisplayFormat = DISPLAY_FORMAT_SCAN;
			break;
		default:
			break;
	}
	refreshDetailDisplay();
}; // setDetailDisplayFormat

// Toggle between 'overview' (regional) and 'detail' (by-route) displays.
var setMainDisplay = function(e) {
	if (e.target.id === 'display_overview') {
		$('.detail_class').hide();
		$('.overview_class').show();
	} else if (e.target.id === 'display_detail') {
		$('.overview_class').hide();
		$('.detail_class').show();
		// Only need to do this the 1st time!
		detailMap.setTarget("detail_map");
		$('#detail_popup_close_x').on('click', function() {
			$('#detail_popup').hide();
		});	
	};
}; // setMainDisplay

// On-click event handler for 'Reset Application' button.
var resetApplication = function() {
	var oElement;
	
	// Reset the 'overview' panel.
	oOverviewSpeedLayer.setVisible(false);
	overviewMap.getView().setCenter(mapCenter);
	overviewMap.getView().setZoom(mapZoom);	

	oElement = $('#selected_theme_overview').get(0);
	oElement.selectedIndex = 0;
	
	$('#display_overview').prop('checked', true).button('refresh');
	$('#display_detail').prop('checked', false).button('refresh');
	
	// Reset the 'detail' panel.
    oHighlightLayer.getSource().clear();
	detailMap.getView().setCenter(mapCenter);
	detailMap.getView().setZoom(mapZoom);
	
	oElement = $('#selected_route').get(0);
	oElement.selectedIndex = 0;
	oElement = $('#selected_theme_detail').get(0);
	oElement.selectedIndex = 0;
	
	$('#display_table').prop('checked', true).button('refresh');
	// $('#display_graphic').prop('checked', 'false');
	
	// Clear the table and graphics (if any).
	$('.table_class').empty();
	$('.table_class').show();
	$('.graphic_class').hide();
	$('.congestion_scan_container_class').hide();
	$('.legend_class').empty();
	$('#overview_popup').hide();
	$('#detail_popup').hide();
	// And make sure the 'overview' panel is visible 
	// and the 'detail' panel is hidden.
	$('.detail_class').hide();
	$('.overview_class').show();
}; // resetApplication

// Route Number Popup - event handler for on-click event on overview map
var overviewMapOnClick = function(coord,px) {
	var oUpperLeft = overviewMap.getCoordinateFromPixel([(px[0]+(-1*IDENTIFY_TOLERANCE)),(px[1]+IDENTIFY_TOLERANCE)]);
	var oLowerRight = overviewMap.getCoordinateFromPixel([(px[0]+IDENTIFY_TOLERANCE),(px[1]+(-1*IDENTIFY_TOLERANCE))]);
	var oBoundsString = oUpperLeft[0].toString() + "," + oUpperLeft[1].toString() + "," + oLowerRight[0].toString() + "," + oLowerRight[1].toString();
	
	//  Submit WFS request to get data for route, and zoom map to it.
	var szUrl = szWFSserverRoot + '?';
		szUrl += 'service=wfs';
		szUrl += '&request=getfeature';
		szUrl += '&typename=' + szWorkspace + 'ctps_cmp_2019_art_routes_ext_v3';
		szUrl += '&srsname=EPSG:26986';
		szUrl += '&outputformat=json';
		szUrl += '&bbox=' + oBoundsString + ',EPSG:26986';

	$.ajax({ url		: szUrl,
			 type		: 'GET',
			 dataType	: 'json',
			 success	: 	function (data, textStatus, jqXHR) {	
								var reader = new ol.format.GeoJSON();
								aFeatures = [];
								aFeatures = reader.readFeatures(jqXHR.responseText);
								if (aFeatures.length === 0) {
									var msg = 'No road found.';
									console.log(msg);
									$('#overview_popup').hide();
								} else {
									// Loop through features returned, populate popup.
									var attrs = [];
									for (i = 0; i < aFeatures.length; i++) {				
										attrs = aFeatures[i].getProperties();
									}
									var popupHTML = attrs.RTE_NAME;
									if (attrs.RTE_NAME === "NULL") {
										var popupHTML = attrs.ROAD_NAME;
									}
									$("#overview_popup_test").text(Array(popupHTML_length+1).join("M"));
									$("#overview_popup").width($("#overview_popup_test").width());
									$("#overview_popup_text").html("<br><strong>" + popupHTML + "<br>");
									overviewPopup.setPosition(coord);
									$('#overview_popup').show();
								}
							},
			 error		: 	function (qXHR, textStatus, errorThrown ) {
								alert('WFS request in timerFunc failed.\n' +
										'Status: ' + textStatus + '\n' +
										'Error:  ' + errorThrown);
							}							
	});
}; // overview map on-click event handler 

// Initializes 'detail' map and UI controls associated with it.
var initDetailMap = function() {
	// Base layer: ocean background, NE states, MA towns, MPO boundary ('transparent' === false)
	var oBaseLayer = new ol.layer.Tile({	
		source: new ol.source.TileWMS({
			url		:  szWMSserverRoot,
			params	: {
				'LAYERS': [	szWorkspace + 'ctps_oceanmask_poly_small',
							szWorkspace + 'mgis_nemask_poly',
							szWorkspace + 'mgis_townssurvey_polym',
							szWorkspace + 'ctps_ma_wo_model_area'	],
				'STYLES': [	'oceanmask_poly',
							'ne_states',
							'towns_blank',
							'non_boston_mpo_gray_mask'	]
			}
		})
	});
	 
	// Roads
	var oRoads = new ol.layer.Tile({	
		source: new ol.source.TileWMS({
			url		: szWMSserverRoot,
			params	: {
				'LAYERS': szWorkspace + 'road_inventory_grouped',
				'STYLES': 'RoadsMultiscaleGroupedBG',
				'TRANSPARENT': 'true'
			}
		})
	});	
				
	// Layer with INRIX speed data.
	var oDetailSpeedLayer = new ol.layer.Tile({	
		source: new ol.source.TileWMS({
			url		: szWMSserverRoot,
			params	: {
				'LAYERS': szWorkspace + 'ctps_cmp_2019_art_routes_ext_v3',
				'STYLES': 'line',
				'TRANSPARENT': 'true'
			}
		}),
		visible: false
	});	
     
	// Vector layer with variable styles for detail map.
	// Note: This object is _declared_ global to the page, but is actually "populated" here.
    oHighlightLayer = new ol.layer.Vector({
		source	: new ol.source.Vector({
			wrapX: false 
		})
	});
	
	// Popup Overlay
	var detailPopup = new ol.Overlay({
		element	: document.getElementById('detail_popup'),
		offset : [-48,-11],
		positioning : 'bottom-left',
		//autoPan	: true,
		//autoPanAnimation : { duration : 250 }
	});
	
	// NOTES: 	1. This object is _declared_ global to the page to facilitate debugging,
	//             but is actually populated here.
	//          2. No 'div' option provided here!
	//             This map will be rendered to the "detail_map" div using 
	//             delayed rendering in setMainDisplay().
    detailMap = new ol.Map({
		//target	: 'detail_map',
		controls: ol.control.defaults().extend([
			new ol.control.ScaleLine({
				units	: 'us'
			})
		]),
		layers	: [	oBaseLayer,
					oRoads,
					oDetailSpeedLayer,
					oHighlightLayer ],
		overlays: [detailPopup],
		view	: new ol.View({	projection	: projection,
								center		: mapCenter,
								zoom		: mapZoom })
	});
	
	// On-click event handler for _detail_ map	
	detailMap.on('singleclick', function(e) {
		var coord = e.coordinate;
		var iThemeId = +($("#selected_theme_detail option:selected").val());
		var theme = CMP_Arterial_Themes.aThemes[iThemeId].theme;
		var palette = CMP_Arterial_Themes.aThemes[iThemeId].palette;
		
		// Show:	
		detailMap.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
			var popupHTML_begin = "Segment Begin: " + feature.getProperties().seg_begin;
			var popupHTML_end = "Segment End: " + feature.getProperties().seg_end;
			var popupHTML_dist = "Length: " + feature.getProperties().distance.toFixed(2);
			var measure, label_begin, label_end;
			switch(theme) {
				case "AM_CONG_MN":
				case "PM_CONG_MN":
					measure = fRenderMinutes(feature.getProperties()[theme.toLowerCase()]);
					label_begin = "Congested Time: ";
					label_end = " minutes";
					break;
				case "AM_SPD_IX":
				case "PM_SPD_IX":
					measure = fRenderIndex(feature.getProperties()[theme.toLowerCase()]);
					label_begin = "Speed Index: ";
					label_end = "";
					break;
				case "AM_AVTT_IX":
				case "PM_AVTT_IX":
					measure = fRenderIndex(feature.getProperties()[theme.toLowerCase()]);
					label_begin = "Travel Time Index: ";
					label_end = "";
					break;
				default:
					measure = fRenderIndex(feature.getProperties()[theme.toLowerCase()]);
					label_begin = "Performance Measure: ";
					label_end = "";
			};
			var popupHTML_meas = label_begin + measure + label_end;
			var popupHTML_length = Math.max(popupHTML_begin.length, popupHTML_end.length, popupHTML_dist.length, popupHTML_meas.length);
			$("#detail_popup_test").text(Array(popupHTML_length+1).join("e"));
			var popup_width = $("#detail_popup_test").width();
			$("#detail_popup").width(popup_width);
			
			$("#detail_popup_text").html(
				"<br><strong>" + popupHTML_begin + 
				"<br>" + popupHTML_end + 
				"<br>" + popupHTML_dist +
				"<br><span style='color:" + palette(measure) + "'>" + popupHTML_meas + "</span></strong>"
			);
			detailPopup.setPosition(coord);
			$('#detail_popup').show();
		});
	}); // detail map on-click event handler
	
	// Set up map theme selection combo box.
	$.each(CMP_Arterial_Themes.aThemes, function (i, theme) {
		$('#selected_theme_detail').append($('<option>', { 
			value: i,
			text : theme.name 
		}));
	});

	// Populate combo box of routes from the CMP_Arterial_Routes.oRoutes.aRouteList array.		
	//
	// *** TBD: Populate this list from a query of the arterial routes _table_. ***
	//
	var aRouteList = CMP_Arterial_Routes.oRoutes.aRouteList;
	$('#selected_route').append($('<option>', { 
		value: 0,
		text : "Select a route"
	}));
	$.each(aRouteList, function (i, route) {
		$('#selected_route').append($('<option>', { 
			value: route.RID,
			text : route.ROUTE 
		}));
	});
}; // initDetailMap

var initOverviewMap = function() {
	// Base layer: ocean background, NE states, MA towns, MPO boundary ('transparent' === false)
	var oBaseLayer = new ol.layer.Tile({	
		source: new ol.source.TileWMS({
			url		:  szWMSserverRoot,
			params	: {
				'LAYERS': [	szWorkspace + 'ctps_oceanmask_poly_small',
							szWorkspace + 'mgis_nemask_poly',
							szWorkspace + 'mgis_townssurvey_polym',
							szWorkspace + 'ctps_ma_wo_model_area'	],
				'STYLES': [	'oceanmask_poly',
							'ne_states',
							'towns_blank',
							'non_boston_mpo_gray_mask'	]
			}
		})
	});
	 
	// Roads
	var oRoads = new ol.layer.Tile({	
		source: new ol.source.TileWMS({
			url		: szWMSserverRoot,
			params	: {
				'LAYERS': szWorkspace + 'road_inventory_grouped',
				'STYLES': 'RoadsMultiscaleGroupedBG',
				'TRANSPARENT': 'true'
			}
		})
	});
	
	// Overview Layers	
	oOverviewSpeedLayer = new ol.layer.Tile({	
		source: new ol.source.TileWMS({
			url		: szWMSserverRoot,
			params	: {
				'LAYERS': szWorkspace + 'ctps_cmp_2019_art_routes_ext_v3',
				'STYLES': 'exp_am_avg_sp',
				'TRANSPARENT': 'true'
			}
		}),
		visible: false
	});
	
	// Shields	
	var oOverviewShields = new ol.layer.Tile({	
		source: new ol.source.TileWMS({
			url		: szWMSserverRoot,
			params	: {
				'LAYERS': szWorkspace + 'ctps_cmp_2019_art_routes_ext_v3',
				'STYLES': 'cmp_arterial_shields',
				'TRANSPARENT': 'true'
			}
		}),
		visible: true
	}); 			
	
	// Popup Overlay
	var overviewPopup = new ol.Overlay({
		element	: document.getElementById('overview_popup'),
		offset : [-48,-11],
		positioning : 'bottom-left',
		//autoPan	: true,
		//autoPanAnimation : { duration : 250 }
	});
	
	// NOTE: The OpenLayers "overviewMap" object is _declared_ global to the app,
	//       to facilitate debugging, but is acutally created here.
    overviewMap = new ol.Map({
		target	: 'overview_map',
		controls: ol.control.defaults().extend([
			new ol.control.ScaleLine({
				units	: 'us'
			})
		]),
		layers	: [	oBaseLayer,
					oRoads,
					oOverviewSpeedLayer,
					oOverviewShields ],
		overlays: [overviewPopup],
		view	: new ol.View({ projection	: projection, 
		                        center		: mapCenter,
								zoom		: mapZoom })
	});
	
	// Event Handler for Click on _overview_ map	
	overviewMap.on('singleclick', function(e) {
		var coord = e.coordinate;
		var px = e.pixel;
		overviewMapOnClick(coord,px);
	});
		
	// Set up map theme selection combo box.
	$.each(CMP_Arterial_Themes.aThemes, function (i, theme) {
		$('#selected_theme_overview').append($('<option>', { 
			value: i,
			text : theme.name 
		}));
	});
}; // initOverviewMap

function popup(url) {
    var popupWindow = window.open(url,'popUpWindow', 'height=700,width=800,left=10,top=10,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=yes')
}; // popup

displayHelp = function() {
	popup('cmpArtAppHelp.html');
}; // displayHelp

var initDownloadText = function() {
	var szTemp = szWFSserverRoot + '?';  

	szTemp += "service=wfs";
	szTemp += "&typename=" + szWorkspace + "ctps_cmp_2019_art_routes_ext_v3";
	szTemp += "&request=getfeature";
	szTemp += "&outputFormat=csv";
	
	szTemp += "&propertyname=rte_name,direction,community,seg_begin,seg_end,distance,lanes,spd_limit,";
	szTemp += "am_cong_sp,am_avg_sp,am_spd_ix,am_avtt_ix,am_delay,am_cong_mn,";
	szTemp += "pm_cong_sp,pm_avg_sp,pm_spd_ix,pm_avtt_ix,pm_delay,pm_cong_mn,am_lottr,pm_lottr";
	

	$('.spanForButtonWithLink').each(function() { 
		$(this).click(function() {
			location = $(this).find('a').attr('href');
		});	
	}); // end each() 

	var szUrl = szTemp;	
	$("#downloadAnchorTag").attr("href", szUrl);
}; // initDownloadText()

// Main routine, called when document ready event fires.
function initialize() { 
	// Test for browser SVG support.
	var szMsg =
	  "Your web browser does not support W3C standard SVG graphics, which is required for the charts rendered by this application"  +
	  "This application will run, but charts will not be displayed." +
	  "All of the following browsers provide the necessary SVG support:" +
	 "    Internet Explorer (version 9 and higher), Firefox, Chrome, Safari, and Opera.";
	if (Modernizr.svg !== true) {
		alert(szMsg);
	}
	// Some jQueryUI set up.
	$('#radio_span_1').buttonset();
	$('#radio_span_2').buttonset();
	$('#reset_button').button();
	$('#download_button').button();
	$('#help_button').button();
	$('#selected_theme_overview').menu();
	$('#selected_route').menu();
	$('#selected_theme_detail').menu();

	// Set initial visibility to the 'overview' display.
	$('.detail_class').hide();
	$('.overview_class').show();
	// Set the initial visibility of the table, graphics, and congestion scan sub-displays in the 'detail' panel.
	$('.table_class').show();
	$('.graphic_class').hide();
	$('.congestion_scan_container_class').hide();

	// Register event handlers.
	$('#reset_button').bind('click', resetApplication);
	$('#help_button').bind('click', displayHelp);
	$('.main_display_choice_class').bind('change', setMainDisplay);

	// Event handler for 'overview' panel.
	$('#selected_theme_overview').bind('change', setOverviewMapTheme);
	// Event handlers for 'detail' panel.
	$('#selected_route').bind('change', getData);
	$('#selected_theme_detail').bind('change', setDetailMapTheme);
	$('.detail_display_choice_class').bind('change', setDetailDisplayFormat);
	
	initDownloadText();
	initOverviewMap();
	initDetailMap();	
	
	// Route Number Popup Hide + Event Handlers for "x" Button		
	$('#overview_popup').hide();
	$('#detail_popup').hide();
	$('#overview_popup_close_x').on('click', function() {
		$('#overview_popup').hide();
	});
	var _DEBUG_HOOK = 0;
}  // initialize  
