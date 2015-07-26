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
	var currenciesCountiresByCode = {
		RUB: "russia|ruble",
		BYR: "belarus|ruble",
		UAH: "ukraine|hryvnia",
		HUF: "hungary|forint",
		CNY: "china|yuan",
		BRL: "brazil|real",
		AUD: "australia|dollar",
		INR: "india|rupee",
		JPY: "japan|yen",
		EGP: "egypt|pound",
		ZWD: "zimbabwe|dollar"
	};
	var currenciesCodesByCountries = {};
	var currenciesNamesByCode = {};

	alignItems();

	this.onStageResized = function (event) {
		alignItems();
	}

	this.show = function () {
		popup.show();
		alignItems();
	}

	this.hide = function () {
		popup.hide();
		$(instance).trigger(CustomEvent.ON_CURRENCY_POPUP_HIDE_CALLED);
	}

	this.onStageResized = function (event) {
		alignItems();
	}

	this.isOpen = function () {
		return popup.is(":visible");
	}

	<!--TODO: Убедиться что функция нужна-->
	this.getElementID = function () {
		return popup.attr('id');
	}

	this.setCurrentCurrencyCode = function (code) {
		console.log("setCurrentCurrencyCode")
		code = code.toUpperCase();
		checkCurrencyCode(code);
		currentCurrencyCode = code;
		updateInteractive();
	}

	<!--TODO: Убедиться что функция нужна-->
	this.getCurrenciesCountriesByCodesList = function() {
		return jQuery.extend({}, currenciesCountiresByCode);
	};

	<!--TODO: Убедиться что функция нужна-->
	this.getCurrenciesCodesByCountriesList = function() {
		return jQuery.extend({}, currenciesCodesByCountries);
	};

	this.getCurrentCurrencyCode = function() {
		return currentCurrencyCode;
	};

	this.getCurrenctCurrencyName = function() {
		return currenciesNamesByCode[currentCurrencyCode];
	}

	<!--TODO: Убедиться что функция нужна-->
	this.getCountryNameByCurrencyCode = function(code) {
		code = code.toUpperCase();
		checkCurrencyCode(code);
		return currenciesCountiresByCode[code];
	}

	<!--TODO: Убедиться что функция нужна-->
	this.getCurrencyCodeByCountryName = function (country) {
		country = country.toLowerCase();
		checkCurrencyCountry(country);
		return currenciesCodesByCountries[country];
	}

	this.getCurrenctCurrencyCountryName = function() {
		return currenciesCountiresByCode[currentCurrencyCode];
	}

	function checkCurrencyCode(code) {
		if (!code || !currenciesCountiresByCode.hasOwnProperty(code.toUpperCase())) {
			throw new Error("Currency " + code + " is not supported.");
		}
	}

	function checkCurrencyCountry(coutry) {
		if (!code || !currenciesCodesByCountries.hasOwnProperty(coutry.toLowerCase())) {
			throw new Error("Country " + coutry + " is not supported.");
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
		console.log(">", currentCurrencyCode);
		$(instance).trigger(CustomEvent.ON_NEW_CURRENCY_SELECTED);
		updateInteractive();
	}

	function onButtonClicked(event) {
		event.preventDefault();
		onCurrencySelect($(event.target));
	}

	function updateInteractive() {
		for(var i = 0; i < buttonsList.length; i++) {
			var button = $(buttonsList[i]);
			button.off("click", onButtonClicked);
			if(currenciesCountiresByCode[currentCurrencyCode].toLowerCase() === button.text().toLowerCase()) {
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

	var k;

	for(var key in currenciesCountiresByCode) {
		k++;
		var button = $(buttonsList[k]);
		var code = currenciesCountiresByCode[key];
		var separatorIndex = code.indexOf("|");
		var country = code.substr(0, separatorIndex);
		var currency = code.substr(separatorIndex + 1);
		currenciesCountiresByCode[key] = country;
		currenciesNamesByCode[key] = currency;
		currenciesCodesByCountries[country] = key;
		button.text(country);
	}
}