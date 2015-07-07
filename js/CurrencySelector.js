/**
 * Created by sergeykrivtsov on 7/7/15.
 */

function CurrencySelector() {
	var selectorButton = $("#currencySelectorButton");
	selectorButton.on("click", onCurrencySelectorClicked);
	console.log("CurrencySelector");
	function onCurrencySelectorClicked(event) {
		alert("go to select currency");
	}
}