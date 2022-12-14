/**
 *
 * IMPORTANT --> Use of this JavaScript file requires d3 version 4 (or higher).
 *               Consequently, the D3 library _must_ be loaded _before_
 *               this script file is loaded.
 *
 * IMPORTANT --> Use of this library requires OpenLayers version 3, or higher
 *
 * Description:
 *
 *		This JS library contains information about each of the map/visualization 
 *      themes used by by the CMP arterial performance dashboards.
 *
 * Usage:
 *      This script file contains a single, anonymous, immediately-invoked function
 *      Loading this script file executes this function, which causes an Object
 *      named CMP_Arterial_Themes to be created and defined. This object contains
 *      a single property, 'aThemes', an array of objects containing information
 *      about how to render data according to several 'themes', i.e., symbologies.
 *
 * 		The records in the "CMP_Arterial_Themes.aThemes" array are as follows:
 * 			name      --> text description of the perfomance measure
 *			legend    --> .png file for a theme's legend
 *			style     --> an OpenLayers Style (ol.style.Style) that can be used to render 
 *					      the route based on the selected performance measure
 * 			theme     --> index names for data returned from geoserver
 *			palette   --> d3 threshold scale
 *			yAxisText --> yAxis label for d3 chart
 *
 *  - EKE 5/31/17, 6/13/17
 *  - BK 10/30/18 - First crack at refactoring code.
 *  - BK 11/02/22 - Improved documentation.
 *
 */
(function() {
	var strokeColor;

	// Gray for 0, i.e., 'no data' values
	var color_gray = "rgba(128, 128, 128, 0.9)";	
	
	// Domain, range, and threshold scale for the strokeColor for each metric.
	var congTimeDomain = [0.001, 15, 30, 45, Infinity];
	var congTimeRange = [color_gray,
						 "rgba(175, 235, 186, 0.9)", "rgba(105, 166, 148, 0.9)",
	                     "rgba(205, 138, 171, 0.9)", "rgba(153, 0, 189, 0.9)"];
	var congTimeStrokeScale = d3.scaleThreshold().domain(congTimeDomain).range(congTimeRange);
	
	var speedIxDomain = [0.001, 0.400, 0.500, 0.700, 0.900, Infinity]; 
	var speedIxRange = [color_gray,
						"rgba(230, 0, 169, 0.9)", "rgba(169, 0, 230, 0.9)",
						"rgba(0, 112, 255, 0.9)", "rgba(115, 178, 255, 0.9)", "rgba(190, 210, 255, 0.9)"];
	var speedIxStrokeScale = d3.scaleThreshold().domain(speedIxDomain).range(speedIxRange);
	
	var ttIxDomain = [0.001, 1.150, 1.300, 2.000, Infinity];
	var ttIxRange = [color_gray, 
	                 "rgba(175, 235, 186, 0.9)", "rgba(105, 166, 148, 0.9)",
			         "rgba(205, 138, 171, 0.9)", "rgba(153, 0, 189, 0.9)"];
	var ttIxStrokeScale = d3.scaleThreshold().domain(ttIxDomain).range(ttIxRange);
	
	return CMP_Arterial_Themes = {
		aThemes : [	
			{ name:		'Select a map theme', 
			  legend: 	'', 
			  sld: 		'',
			  style: 	function(feature) {
							return [new ol.style.Style({
								fill	: new ol.style.Fill({ color: 'rgba(255,255,255,0.1)' }), 
								stroke 	: new ol.style.Stroke({ 
											color: "rgba(0,0,0,0.9)",
											width: 4.0,
											lineCap: "butt"
										})
							})];
						},
			  theme: 	'',
			  palette:	'',
			  yAxisText:''
			},
			{ name: 	'AM Congested Time',
			  legend:	'Congested_Time.png',
			  sld:		'art_am_cong_mn',
			  style:	function(feature) {
							var val = feature.get("am_cong_mn");
							strokeColor = congTimeStrokeScale(val);;
							
							return [new ol.style.Style({
								fill	: new ol.style.Fill({ color: 'rgba(255,255,255,0.1)' }), 
								stroke 	: new ol.style.Stroke({ 
											color: strokeColor,
											width: 4.0,
											lineCap: "butt"
										})
							})];
						},
			  theme: 	'AM_CONG_MN',
			  palette:	d3.scaleThreshold()
							.domain([15,30,45])
							.range(["rgb(175,235,186)", "rgb(105,166,148)", "rgb(205,138,171)", "rgb(153,0,189)"]),
			  yAxisText:'Minutes'
			},
			{ name : 	'PM Congested Time',
			  legend:	'Congested_Time.png',
			  sld:		'art_pm_cong_mn',
			  style:	function(feature) {
							var val = feature.get("pm_cong_mn");
							strokeColor = congTimeStrokeScale(val);

							return [new ol.style.Style({
								fill	: new ol.style.Fill({ color: 'rgba(255,255,255,0.1)' }), 
								stroke 	: new ol.style.Stroke({ 
											color: strokeColor,
											width: 4.0,
											lineCap: "butt"
										})
							})];
						},
			  theme: 	'PM_CONG_MN',
			  palette:	d3.scaleThreshold()
							.domain([15,30,45])
							.range(["rgb(175,235,186)", "rgb(105,166,148)", "rgb(205,138,171)", "rgb(153,0,189)"]),
			  yAxisText:'Minutes'
			},
			{ name : 	'AM Speed Index',
			  legend:	'Speed_Index.png',
			  sld:		'art_am_spd_ix',
			  style:	function(feature) {
							var val = feature.get("am_spd_ix");
							strokeColor = speedIxStrokeScale(val);
							
							// debug
							console.log('am_spd_ix = ' + val + ' color = ' + strokeColor);
	
							return [new ol.style.Style({
								fill	: new ol.style.Fill({ color: 'rgba(255,255,255,0.1)' }), 
								stroke 	: new ol.style.Stroke({ 
											color: strokeColor,
											width: 4.0,
											lineCap: "butt"
										})
							})];
						},
			  theme: 	'AM_SPD_IX',
			  palette:	d3.scaleThreshold()
							.domain([0.4,0.5,0.7,0.9])
							.range(["rgb(230,0,169)", "rgb(169,0,230)", "rgb(0,112,255)", "rgb(115,178,255)", "rgb(190,210,255)"]),
			  yAxisText:'Speed Index'
			},
			{ name : 	'PM Speed Index',
			  legend:	'Speed_Index.png',
			  sld:		'art_pm_spd_ix',
			  style:	function(feature) {
							var val = feature.get("pm_spd_ix");
							strokeColor = speedIxStrokeScale(val);
							
							// debug
							console.log('pm_spd_ix = ' + ' color = ' + strokeColor);
							
							return [new ol.style.Style({
								fill	: new ol.style.Fill({ color: 'rgba(255,255,255,0.1)' }), 
								stroke 	: new ol.style.Stroke({ 
											color: strokeColor,
											width: 4.0,
											lineCap: "butt"
										})
							})];
						},
			  theme: 	'PM_SPD_IX',
			  palette:	d3.scaleThreshold()
							.domain([0.4,0.5,0.7,0.9])
							.range(["rgb(230,0,169)", "rgb(169,0,230)", "rgb(0,112,255)", "rgb(115,178,255)", "rgb(190,210,255)"]),
			  yAxisText:'Speed Index'
			},
			{ name : 	'AM Travel Time Index',
			  legend:	'Travel_Time_Index.png',
			  sld:		'art_am_avtt_ix',
			  style:	function(feature) {
							var val = feature.get("am_avtt_ix");
							strokeColor = ttIxStrokeScale(val);
							
							return [new ol.style.Style({
								fill	: new ol.style.Fill({ color: 'rgba(255,255,255,0.1)' }), 
								stroke 	: new ol.style.Stroke({ 
											color: strokeColor,
											width: 4.0,
											lineCap: "butt"
										})
							})];
						},
			  theme: 	'AM_AVTT_IX',
			  palette:	d3.scaleThreshold()
							.domain([1.15, 1.30, 2.00])
							.range(["rgb(175,235,186)", "rgb(105,166,148)", "rgb(205,138,171)", "rgb(153,0,189)"]),
			  yAxisText:'Travel Time Index'
							
			},
			{ name : 	'PM Travel Time Index',
			  legend:	'Travel_Time_Index.png',
			  sld:		'art_pm_avtt_ix',
			  style:	function(feature) {
							var val = feature.get("pm_avtt_ix");
							strokeColor = ttIxStrokeScale(val);
							
							return [new ol.style.Style({
								fill	: new ol.style.Fill({ color: 'rgba(255,255,255,0.1)' }), 
								stroke 	: new ol.style.Stroke({ 
											color: strokeColor,
											width: 4.0,
											lineCap: "butt"
										})
							})];
						},
			  theme: 	'PM_AVTT_IX',
			  palette:	d3.scaleThreshold()
							.domain([1.15, 1.30, 2.00])
							.range(["rgb(175,235,186)", "rgb(105,166,148)", "rgb(205,138,171)", "rgb(153,0,189)"]),
			  yAxisText:'Travel Time Index'
			}		
		]
	};
})();