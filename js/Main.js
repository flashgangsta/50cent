/**
 * Created by sergeykrivtsov on 4/17/15.
 */

$(document).ready(function () {
	console.log("DocumentReady");
	var stage = $(window);
	var body = $('body');
	var header = new Header();
	var soundController = new SoundController();
	var currencySelector = new CurrencySelector();
	var layout = new Layout();
	var currencyConverter = new CurrencyConverter();
	var currenciesPopup = new CurrenciesPopup();
	var currecnciesPopupID = currenciesPopup.getElementID();
	var currenciesSelectorButtonID = currencySelector.getButtonID();
	var currentCurrency = localStorage.currentCurrency || "RUB";

	$(header).on(CustomEvent.HEADER_LOGO_LOADED, layout.headerLogoLoaded);
	$(currencyConverter).on(CustomEvent.CURRENCY_RATE_RESPONSE, onCurrenyRatesProcessedFirstTime);
	$(currencySelector).on(CustomEvent.ON_CURRENCY_SELECTOR_CLICKED, onCurrencySelectorClicked)
	$(currenciesPopup).on(CustomEvent.ON_NEW_CURRENCY_SELECTED, onNewCurrencySelected)

	function onCurrenyRatesProcessedFirstTime(event, data) {
		onCurrenyRatesProcessed(event, data);
		//body.show();
		$(currencyConverter).off(CustomEvent.CURRENCY_RATE_RESPONSE, onCurrenyRatesProcessed);
		$(currencyConverter).on(CustomEvent.CURRENCY_RATE_RESPONSE, onCurrenyRatesProcessed);
	}

	function onCurrenyRatesProcessed(event, data) {
		//console.log(JSON.stringify(data));
	}

	function onCurrencySelectorClicked(event) {
		console.log('onCurrencySelectorClicked');
		event.stopImmediatePropagation();
		currenciesPopup.show();
	}

	function onStageResized(event) {
		if(event) {
			event.stopImmediatePropagation();
		}
		header.onStageResized(event);
		currenciesPopup.onStageResized(event);
		layout.onStageResized(event);
	}

	function onStageClicked(event) {
		var target = $(event.target);
		var targetID = target.attr('id');
		event.stopImmediatePropagation();
		console.log(currenciesPopup.isOpen(), target.attr('id'));
		if(currenciesPopup.isOpen() && targetID !== currecnciesPopupID && targetID !== currenciesSelectorButtonID) {
			currenciesPopup.hide();
		}
	}

	function onNewCurrencySelected(event) {
		if(event) event.stopImmediatePropagation();
		currencySelector.setCurrentCurrencyName(currenciesPopup.getCurrenctCurrencyCountryName());

	}

	stage.resize(onStageResized);
	stage.on("click", onStageClicked);
	onStageResized();
	currenciesPopup.setCurrentCurrencyCode(currentCurrency);
	onNewCurrencySelected();
});
