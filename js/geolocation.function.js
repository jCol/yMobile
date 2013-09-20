// JavaScript Document - HTML5 GeoLocation
if(typeof(Storage)!=="undefined") {
  if(sessionStorage.zipcode !=="undefined") { 
  	var zip = sessionStorage.zipcode;
	var s = true;
  } else {
	var zip = null;  
  }
} else {
	var zip = null;
	var s = false;
}

var destMani = new google.maps.LatLng();

function retrieve_zip(callback)
{
	try { if(!google) { google = 0; } } catch(err) { google = 0; }
	if(navigator.geolocation) // FireFox/HTML5 GeoLocation
	{
		navigator.geolocation.getCurrentPosition(function(position) {
			zip_from_latlng(position.coords.latitude,position.coords.longitude,callback);
			destMani = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    },
    function(error){
         alert(error.message);
		 gotZip();
    }, {
         enableHighAccuracy: true
              ,timeout : 15000
    }
);
	}
	else if(google && google.gears) // Google Gears GeoLocation
	{
		var geloc = google.gears.factory.create('beta.geolocation');
		geloc.getPermission();
		geloc.getCurrentPosition(function(position)
		{
			zip_from_latlng(position.latitude,position.longitude,callback);
		},function(err){});
	}
}
function zip_from_latlng(latitude,longitude,callback)
{
	// Setup the Script using Geonames.org's WebService
		var script = document.createElement("script");
		script.src = "http://ws.geonames.org/findNearbyPostalCodesJSON?lat=" + latitude + "&lng=" + longitude + "&callback=" + callback;
	// Run the Script
		document.getElementsByTagName("head")[0].appendChild(script);
}

function gotZip(s) {
	if(s) {
		$(".geolocation-notification").html("Your location is cached at zipcode " + zip + '. If this is wrong, please see "site settings".');
	} if(zip!==null && zip!==undefined) {
		$(".geolocation-notification").html("Location detected at zipcode " + zip + '.');
//	} else if(s=true) {
//		$(".geolocation-notification").html("Your location is cached at zipcode " + zip + '. If this is wrong, please see "site settings".');
	} else {
		$(".geolocation-notification").html('Location service is unavailable. Delivery estimations hid. To manual set your zip, see "site settings".');	
	}
}

function setZip(json) {
	zip = json.postalCodes[0].postalCode;
	sessionStorage.zipcode = zip;
//	country = json.postalCodes[0].countryCode;
//	state = json.postalCodes[0].adminName1;
//	county = json.postalCodes[0].adminName2;
//	place = json.postalCodes[0].placeName;
	return gotZip();
}


function calculateDistance() {
  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: ["31512"],
      destinations: [destMani],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
      avoidHighways: false,
      avoidTolls: false
    }, processMapResults);
}

function processMapResults(response, status) {
  if (status != google.maps.DistanceMatrixStatus.OK) {
    alert('Error - Distance Matrix API: ' + status);
  } else {
	var origins = response.originAddresses;
    var destinations = response.destinationAddresses;
    for (var i = 0; i < origins.length; i++) {
      var results = response.rows[i].elements;
      for (var j = 0; j < results.length; j++) {
       $(".geolocation-notification").append("You are " + results[j].distance.text + " from our closest plant. This is apprx. " + results[j].duration.text + " away.");
      }
    }
  }	
}

//to be implemented...
function manualSetZip(err) {
	$(".geolocation-notification").html('<input type="text" id="manualZipEntry" /><br /><input type="button" data-mini="true" data-inline="true" onclick="manualSetZipWrite()" value="Set Zipcode" />');
	if(err) {
		$(".geolocation-notification").append("<br />Error: " + err);	
	}
}
//to be implemented...
function manualSetZipWrite () {
	$(".geolocation-notification").html("Please wait...");
	var writeZip = $("#manualZipEntry").val();
	if (writeZip.length == 4) {
		zip = writeZip;
		sessionStorage.zipcode = zip;
		gotZip();
	} else {
		manualSetZip("Invalid number of digits for zipcode");
	}
}