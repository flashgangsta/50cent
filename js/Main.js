/**
 * Created by sergeykrivtsov on 4/17/15.
 */

$(document).ready(function () {
	console.log("DocumentReady");

	var body = $('body');
	var header = new Header();
	var soundController = new SoundController();
	var currencySelector = new CurrencySelector();
	var layout = new Layout();
	var currencyConverter = new CurrencyConverter();

	$(header).on(CustomEvent.HEADER_LOGO_LOADED, layout.headerLogoLoaded);
	$(currencyConverter).on(CustomEvent.CURRENCY_RATE_RESPONSE, onCurrenyRatesProcessedFirstTime);

	function onCurrenyRatesProcessedFirstTime(event, data) {
		onCurrenyRatesProcessed(event, data);
		//body.show();
		$(currencyConverter).off(CustomEvent.CURRENCY_RATE_RESPONSE, onCurrenyRatesProcessed);
		$(currencyConverter).on(CustomEvent.CURRENCY_RATE_RESPONSE, onCurrenyRatesProcessed);
	}

	function onCurrenyRatesProcessed(event, data) {
		console.log(JSON.stringify(data));
	}
});
