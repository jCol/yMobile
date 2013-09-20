// JavaScript Document - functions

function getPrice() {
	var optp = 0;
	$(".inputs-update").each(function(index, element) {
        optp += $(this).attr("data-input-price");
    });
	return optp+bp;
}

function updateUI(disabledInputClass, priceToUI) {
	$(".price-display").html($ + "");
}