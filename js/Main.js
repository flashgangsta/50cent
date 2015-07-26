/**
 * Created by sergeykrivtsov on 4/17/15.
 */

$(document).ready(function () {
	<!--TODO: убедиться что закомменченные функции ненужны и удалить ненужные-->
	console.log("DocumentReady");
	var stage = $(window);
	var body = $('body');
	var popupBackstage = $("#popupBackstage");
	var header = new Header();
	var soundController = new SoundController();
	var currencySelector = new CurrencySelector();
	var layout = new Layout();
	var currencyConverter = new CurrencyConverter();
	var currenciesPopup = new CurrenciesPopup();
	var currentCurrency = localStorage.currentCurrency || "RUB";
	var currentCurrencyName;
	var lastCurrentCurrency = "" + currentCurrency ;
	var currencyNameChanged = true;
	var currencyRates;

	<!--TODO: localStorage заменить на куки-->

	$(header).on(CustomEvent.ON_HEADER_LOGO_LOADED, layout.onStageResized);
	$(currencyConverter).on(CustomEvent.ON_CURRENCY_RATE_RESPONSE, onCurrenyRatesProcessedFirstTime);
	$(currencySelector).on(CustomEvent.ON_CURRENCY_SELECTOR_CLICKED, onCurrencySelectorClicked);
	$(currenciesPopup).on(CustomEvent.ON_NEW_CURRENCY_SELECTED, onNewCurrencySelected);
	$(currenciesPopup).on(CustomEvent.ON_CURRENCY_POPUP_HIDE_CALLED, onCurrencyPopupHideCalled);
	$(soundController).on(CustomEvent.ON_ALL_SOUNDS_LOADED, onAllSoundsLoaded);

	function onCurrenyRatesProcessedFirstTime(event, data) {
		onCurrenyRatesProcessed(event, data);
		//body.show();
		$(currencyConverter).off(CustomEvent.CURRENCY_RATE_RESPONSE, onCurrenyRatesProcessed);
		$(currencyConverter).on(CustomEvent.CURRENCY_RATE_RESPONSE, onCurrenyRatesProcessed);
	}

	function onCurrenyRatesProcessed(event, data) {
		currencyRates = data;
		drawCurrency();
	}

	function drawCurrency() {
		if(currenciesPopup.isOpen()) {
			return;
		}
		var value = Math.round(currencyRates[currentCurrency] / 2);
		layout.setCurrency(value, currencyNameChanged ? currentCurrencyName : null);
		currentCurrencyName = false;
	}

	function onCurrencySelectorClicked(event) {
		event.stopImmediatePropagation();
		currenciesPopup.show();
		popupBackstage.show();
		soundController.playReload();
	}

	function onStageResized(event) {
		if (event) {
			event.stopImmediatePropagation();
		}
		header.onStageResized(event);
		currenciesPopup.onStageResized(event);
		layout.onStageResized(event);
	}

	function onPopupBackstageClicked(event) {
		event.stopImmediatePropagation();
		if (currenciesPopup.isOpen()) {
			currenciesPopup.hide();
		}
		popupBackstage.hide();
	}

	function onNewCurrencySelected(event) {
		if (event) {
			event.stopImmediatePropagation();
		}
		currencySelector.setCurrentCurrencyCountry(currenciesPopup.getCurrenctCurrencyCountryName());
		soundController.playReload();
	}

	function onCurrencyPopupHideCalled(event) {
		event.stopImmediatePropagation();
		currentCurrency = currenciesPopup.getCurrentCurrencyCode();
		if(lastCurrentCurrency !== currentCurrency) {
			currentCurrencyName = currenciesPopup.getCurrenctCurrencyName();
			currencyNameChanged = true;
			lastCurrentCurrency = currentCurrency;
			soundController.playShoot();
			drawCurrency();
		}
	}

	function onAllSoundsLoaded(event) {
		layout.onStageResized();
	}

	stage.resize(onStageResized);
	popupBackstage.on("click", onPopupBackstageClicked);
	currenciesPopup.setCurrentCurrencyCode(currentCurrency);
	currentCurrencyName = currenciesPopup.getCurrenctCurrencyName();
	onNewCurrencySelected();
	popupBackstage.hide();
	currenciesPopup.hide();
	soundController.loadAllSounds();
	onStageResized();
});
