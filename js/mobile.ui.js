// JavaScript Document - handles UI
if(typeof(Storage)!=="undefined")
  {
	  if(localStorage.getItem("themeMode") !== null) {
		  var themeMode = localStorage.themeMode;
	  } else {
		  localStorage.themeMode = "a";
	  }
  }
else
  {
  var themeMode = "a";
  }

//console.log("current themeMode is " + themeMode);

$(document).ready(function(e) {
	$(".pages").attr("data-theme", themeMode);
	setThemeSwitch();
    $("#expand-nav").click(function(e) {
		$(".navigation-group").slideToggle();
	});
	
	if (zip == null) {
		retrieve_zip("setZip");
	} else {
		gotZip(true);	
	}
	
	$("#save-changes").click(function(e) {
		saveSettings();
	});
	
	$('.inputs-update').change(function(e) {
        var d = $(this).attr("data-dis-inputs");
		getPrice(d);
    });
	
//	$("#slider-length").on( "slidestop", function( event, ui ) {
//		console.log("detected");
//    	adjustBasePrice();
//	});
	
	$('.base-update').change(function(e) {
		adjustBasePrice();
    });
	
});

function setThemeSwitch() {
	$("#flip-theme").val(themeMode);
}

function saveSettings() {
	themeMode = $("#flip-theme").val();
	localStorage.themeMode = themeMode; 
	$(".pages").attr("data-theme", themeMode);
	$.mobile.changePage("#home");
	console.log("current themeMode is now " + themeMode);
	return;
}