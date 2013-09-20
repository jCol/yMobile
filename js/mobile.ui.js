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

$(".pages").attr("data-theme", themeMode);

$(document).ready(function(e) {
	
    $("#expand-nav").click(function(e) {
		$(".navigation-group").slideToggle();
	});
	
	$('.inputs-update').change(function(e) {
        var d = $(this).attr("data-dis-inputs");
		var i = $(this).attr("id");
		var v = $(this).attr("value");
		var priceResponse = getPrice();
		updateUI(d,priceResponse);
    });
	if (zip == null) {
		retrieve_zip("setZip");
	} else {
		gotZip(true);	
	}

	$("#save-changes").click(function(e) {
		themeMode = $("#flip-theme").val();
        $(".pages").attr("data-theme", themeMode);
		localStorage.themeMode = themeMode; 
		$.mobile.changePage("#home").trigger("pagecreate");
		$( "#home" ).on( "pagecreate", function( event ) {
			$("#home").trigger("create");
		});
    });
	
	
});