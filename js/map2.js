/*This Javascript includes the Openlayers map for the quiz as well as quiz functionality itself
 *Vector Layer includes data from Republic of Ireland sources at Ordinance Survey Ireland: https://osi.ie/
 *Vector Layer also includes data from Ordinance Survey Northern Ireland: https://www.nidirect.gov.uk/campaigns/ordnance-survey-of-northern-ireland
 *Code for Openlayers version 6.12 adapted or learned from: https://www.giserdqy.com
 *Other JS resources include: https://www.w3schools.com, https://developer.mozilla.org/en-US/
 */
 
// initialise map variable
var map;
//Array of Counties
const counties = ["ANTRIM", "ARMAGH", "CARLOW", "CAVAN", "CLARE", "CORK", "DONEGAL", "DOWN", "DUBLIN", "FERMANAGH", "GALWAY", "KERRY", "KILDARE", "KILKENNY", "LAOIS", "LEITRIM", "LIMERICK", "DERRY", "LONGFORD", "LOUTH", "MAYO", "MEATH", "MONAGHAN", "OFFALY", "ROSCOMMON", "SLIGO", "TIPPERARY", "TYRONE", "WATERFORD", "WESTMEATH", "WEXFORD", "WICKLOW"];
//Generates Question for Player
var item;
//Will Pull County Name from geoJSON
var properties;
//Displays answer as Correct/Incorrect
var answer = document.getElementById('answer');
var score = document.getElementById('score');
//Button to Initiate Game
var start = document.getElementById('startButton');
//Button to Submit Answer
var submit = document.getElementById('submitButton');
submit.style.opacity = 0;
//Generate Style for Vector
var style1 = [
		new ol.style.Style({
			stroke: new ol.style.Stroke({
				color: 'gray',
				width: 2
			}),
			fill: new ol.style.Fill({
				color: 'white'
			})
		}),
	];
	
var style2 = [
		new ol.style.Style({
			stroke: new ol.style.Stroke({
				color: 'gray',
				width: 2.5
			}),
			fill: new ol.style.Fill({
				color: 'lightgreen'
			})
		}),
	];
//Runs Map Function
function initMap() {
 var osm;
 var myview;
 var IrMap;

 // Create a Tile layer getting tiles from OpenStreetMap source
 osm = new ol.layer.Tile(
  {
   source: new ol.source.OSM(),
   title: 'Open Street Map',
   type: 'base'
  }
);
//Map of Ireland//
IrMap = new ol.layer.Vector(
	{
		source: new ol.source.Vector(
			{
				format: new ol.format.GeoJSON(),
				url: 'data/IrMap4.geojson',
			}
		),
	title: 'Ireland Map',
	visible: true,
	style: style1
	},
);
// Create a view
 myview = new ol.View(
  {
   center: ol.proj.fromLonLat([-902640, 7052997], "EPSG:4326"),
   zoom: 6.5
  }
);
// Create a map
 map = new ol.Map(
  {
   target: 'mymap',
   layers:[osm, IrMap],
   view: myview,
       controls:[
       new ol.control.Zoom(),
       new ol.control.ZoomSlider(),
       new ol.control.ScaleLine(),
    ]
  }
);
//Adds interaction to map layer
map.addInteraction(new ol.interaction.Select({style: style2}));

//When User single clicks on feature, pulls name from geoJSON
map.on('singleclick', showInfo);

var info = document.getElementById('info');
  function showInfo(event) {
		var features = map.getFeaturesAtPixel(event.pixel);
		//Gets county name as Properties
		properties = features[0].get("ENGLISH");
		//prints county name in 'info' div. Development purposes only
		/*info.innerText = JSON.stringify(properties);
		info.style.opacity = 1; */
		return properties;
	}
	
	//Displays the county to find
	var countyQuestion = document.getElementById('question');
	start.addEventListener("click", genCounty);
	start.addEventListener("click", disable);
	start.addEventListener("click", function enableSubmit() {submit.disabled = false; submit.style.opacity = 1});
	
	function disable() {
		start.disabled = true;
		start.style.opacity = 0;
	};
	function genCounty() { 
	//calls random county from array
	item = counties[Math.floor(Math.random()*counties.length)];
	//calls county on click to print in question div
	countyQuestion.innerText = JSON.stringify(item);
	return item;
	}
	
	//Keeps track of how many rounds have been played
	var roundNo = 0;
	//Keeps track of player score
	var score = 0;
	
	//Calls Round Number in HTML
	var roundNumber = document.getElementById('roundNumber');
	var scoreUpdate = document.getElementById('score');
	
	function answerCheck(){
		if (roundNo <= 14) {
			if (item !== properties) {
				answer.style.color = "red";
				answer.innerHTML = "incorrect!";
				roundNo += 1;
				roundNumber.innerHTML = roundNo;
				score += 50;
				scoreUpdate.innerHTML = score;
			}
		
	
			else if (item === properties) {
				answer.style.color = "green";
				answer.innerHTML = "correct!";
				roundNo += 1;
				roundNumber.innerHTML = roundNo;
				score += 1000;
				scoreUpdate.innerHTML = score;
			};
		}
		else if (roundNo >= 14) {
			sessionStorage.setItem('finalScore', score);
			window.location.href = "resultspage.html";
		};
	};
	
	//Checks is answer is correct when Submit is clicked
	submit.addEventListener("click", answerCheck);
	//Generates new question on Submit
	submit.addEventListener("click", genCounty);
	
}
//end of InitMap
	
