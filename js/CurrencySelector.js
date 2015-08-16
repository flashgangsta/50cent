/**
 * Created by sergeykrivtsov on 7/7/15.
 */

function CurrencySelector() {
	var selectorButton = $("#currencySelectorButton");
	var instance = this;
	selectorButton.on("click", onCurrencySelectorClicked);

	this.getButtonID = function() {
		<!--TODO: проверить нужна ли эта функция -->
		return selectorButton.attr('id');
	}

	this.setCurrentCurrencyCountry = function(name) {
		selectorButton.text(name);
	}

	function onCurrencySelectorClicked(event) {
		$(instance).trigger(CustomEvent.ON_CURRENCY_SELECTOR_CLICKED);
	}

}