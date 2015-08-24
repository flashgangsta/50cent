/**
 * Created by sergeykrivtsov on 7/15/15.
 */

CurrenciesPopup.getInstance = function () {
	return null;
}

function CurrenciesPopup() {
	var popup = $("#currenciesPopup");
	var closeCross = $("#closeCross");
	var buttonsHolder = $("#currenciesHolder");
	var buttonsList = buttonsHolder[0].getElementsByTagName("a");
	var instance = this;
	var currentCurrencyCode;
	var currentButton;
	var closeCrossImage = Assets.getInstance().getAssetByName(App.getRatio() === 1 ? "popupCloseCross_x1_" : "popupCloseCross_x2_");
	var currenciesCountiresByCode = {
		RUB: "russia|rubles",
		BYR: "belarus|rubles",
		UAH: "ukraine|hryvnias",
		HUF: "hungary|forints",
		CNY: "china|yuans",
		BRL: "brazil|reals",
		AUD: "australia|dollars",
		INR: "india|rupees",
		JPY: "japan|yens",
		EGP: "egypt|pounds",
		KZT: "kazakhstan|tenges",
		EUR: "eurozone|euros"
	};
	var currenciesCodesByCountries = {};
	var currenciesNamesByCode = {};

	closeCross.append(closeCrossImage)

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
		MappingManager.alignCenterY(buttonsHolder, $(window));
	}

	function onCurrencySelect(target) {
		currentButton.attr("href", "");
		currentButton.removeClass("currenciesHolderButtonDisabled");
		currentButton.addClass("currenciesHolderButton");
		currentButton = $(target);
		var countryName = currentButton.text();
		currentCurrencyCode = instance.getCurrencyCodeByCountryName(countryName);
		$(instance).trigger(CustomEvent.ON_NEW_CURRENCY_SELECTED);
		updateInteractive();
	}

	function onButtonClicked(event) {
		event.preventDefault();
		onCurrencySelect($(event.target));
		instance.hide();
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

	CurrenciesPopup.getInstance = function () {
		return instance;
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