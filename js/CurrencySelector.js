/**
 * Created by sergeykrivtsov on 7/7/15.
 */

function CurrencySelector() {
	var selectorButton = $("#currencySelectorButton");
	var instance = this;
	selectorButton.on("click", onCurrencySelectorClicked);

	selectorButton[0].style.cursor = "pointer";

	this.setCurrentCurrencyCountry = function(name) {
		selectorButton.text(name);
	}

	function onCurrencySelectorClicked(event) {
		$(instance).trigger(CustomEvent.ON_CURRENCY_SELECTOR_CLICKED);
	}

}