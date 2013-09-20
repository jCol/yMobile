// JavaScript Document - functions

var bp = 0; //base price configuration
var length = 0; //length configuration
var lastPrice = 0; //store last price in memory

var aNoRun = true; //makes sure hint is not already animating

var ppf = 253; //price per foot

function isNumber(n) { //validator
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function getPrice(d) {
	var optp = 0; //temp store value operation
	$(".inputs-update").each(function(index, element) {
        optp = optp + parseFloat($(this).val());
    });
	return updateUI(d,optp + bp);
}

function adjustBasePrice() {
	var tempStor = 0; //temporarily store value to pass to getPrice() method
	$('.base-update-val').each(function(index, element) {
        tempStor = tempStor + parseFloat($(this).val());
    });
	tempStor = tempStor + parseFloat($('.base-update-length').slider().val()) * ppf;
	bp = tempStor;
	getPrice();
}

function updateUI(disabledInputClass, priceToUI) {
	$(".price-display").html("$" + priceToUI);
	var pushChange = priceToUI - lastPrice;
	if(aNoRun && pushChange !== 0) {
		pushChangeHint(pushChange);
	}
	lastPrice = priceToUI;
	if(disabledInputClass !== null && disabledInputClass !== "unidentified") {
		$("." + disabledInputClass).attr("disabled", "true");
	}
}

function pushChangeHint(p) {
	aNoRun = false;
	$(".change-display").fadeOut(100, function() {
		$(".change-display").html("$" + p)
		$(".change-display").fadeIn(400, function() {
			$(".change-display").fadeOut(400, function() {
				aNoRun = true;
				return;
			});
		});
	});
}