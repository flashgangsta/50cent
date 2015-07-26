/**
 * Created by sergeykrivtsov on 7/15/15.
 */

function CurrenciesPopup() {
	var popup = $("#currenciesPopup");
	var closeCross = $("#closeCross");
	var buttonsHolder = $("#currenciesHolder");
	var buttonsList = buttonsHolder[0].getElementsByTagName("a");
	var instance = this;
	var currentCurrencyCode;
	var currentButton;
	var currenciesCodes = {
		RUB: "russia",
		BYR: "belarus",
		UAH: "ukraine",
		HUF: "hungary",
		CNY: "china",
		BRL: "brasil",
		AUD: "australia",
		INR: "india",
		JPY: "japan",
		EGP: "egupt",
		ZWD: "zimbabwe"
	};

	alignItems();
	popup.hide();

	this.onStageResized = function (event) {
		alignItems();
	}

	this.show = function () {
		popup.show();
		alignItems();
	}

	this.hide = function () {
		popup.hide();
	}

	this.onStageResized = function (event) {
		alignItems();
	}

	this.isOpen = function () {
		return popup.is(":visible");
	}

	this.getElementID = function () {
		return popup.attr('id');
	}

	this.setCurrentCurrencyCode = function (code) {
		code = code.toUpperCase();
		checkCurrencyCode(code);
		currentCurrencyCode = code;
		updateInteractive();
	}

	this.getCurrenciesList = function() {
		return jQuery.extend({}, currenciesCodes);
	}

	this.getCurrentCurrencyCode = function() {
		return currentCurrencyCode;
	}

	this.getCountryNameByCurrencyCode = function(code) {
		code = code.toUpperCase();
		checkCurrencyCode(code);
		return currenciesCodes[code]
	}

	this.getCurrencyCodeByCountryName = function (country) {
		country = country.toLowerCase();
		var code;
		for(code in currenciesCodes) {
			if(currenciesCodes[code] === country) {
				return code;
			}
		}

	}

	this.getCurrenctCurrencyCountryName = function() {
		return currentButton.text();
	}

	function checkCurrencyCode(code) {
		if (!code || !currenciesCodes[code.toUpperCase()]) {
			throw new Error("Currency " + code + " is not supported");
		}
	}

	function alignItems() {
		MappingManager.alignCenterX(popup, $(window));
	}

	function onCurrencySelect(target) {
		currentButton.attr("href", "");
		currentButton.removeClass("currenciesHolderButtonDisabled");
		currentButton.addClass("currenciesHolderButton");
		currentButton = $(target);
		var countryName = currentButton.text();
		currentCurrencyCode = instance.getCurrencyCodeByCountryName(countryName);
		console.log("new code:", currentCurrencyCode);
		$(instance).trigger(CustomEvent.ON_NEW_CURRENCY_SELECTED);
		updateInteractive();
	}

	function onButtonClicked(event) {
		event.preventDefault();
		onCurrencySelect($(event.target));
	}

	function updateInteractive() {
		console.log("updateInteractive", updateInteractive);
		for(var i = 0; i < buttonsList.length; i++) {
			var button = $(buttonsList[i]);
			button.off("click", onButtonClicked);
			if(currenciesCodes[currentCurrencyCode] === button.text()) {
				currentButton = button;
				button.removeAttr("href");
				button.removeClass("currenciesHolderButton");
				button.addClass("currenciesHolderButtonDisabled");
				continue;
			}
			button.on("click", onButtonClicked);
		}
	}

	closeCross.on("click", function () {
		event.preventDefault();
		instance.hide();
	});
}