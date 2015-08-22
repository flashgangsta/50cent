/**
 * Created by sergeykrivtsov on 4/24/15.
 */

function CurrencyConverter() {
	var currenciesList = ["RUB", "BYR", "UAH", "HUF", "CNY", "BRL", "AUD", "INR", "JPY", "EGP"];
	var apiURL = 'http://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.xchange where pair in (%currencies%)&env=store://datatables.org/alltableswithkeys&format=json';
	var mainCurrency = "USD";
	var currenciesForExchange = [];
	var currenciesFormattedForRequest = [];
	var currency;
	var request = new XMLHttpRequest();
	var urlRequest;
	var requestsDelay = 1000;
	var instance = this;

	this.getCurrenciesList = function() {
		return [].concat(currenciesList);
	};

	this.getCurrenciesRates = function() {
		sendRequest();
	};

	function sendRequest() {
		urlRequest =  apiURL.replace("%currencies%", currenciesFormattedForRequest) + "&r=" + new Date().getTime();
		request.open("get", urlRequest, true);
		request.send();
	}

	function onResponse() {
		var response = JSON.parse(this.responseText);
		var result = response.query.results.rate;
		var data = {};
		var rateData;

		for (var i = 0; i < result.length; i++) {
			rateData = result[i];
			data[rateData.id.replace(mainCurrency, "")] = rateData.Rate;
		}

		$(instance).trigger(CustomEvent.ON_CURRENCY_RATE_RESPONSE, data);

		setTimeout(sendRequest, requestsDelay);
	};


	for(var i = 0; i < currenciesList.length; i++) {
		currency = currenciesList[i].toUpperCase();
		currenciesForExchange.push(currency);
		currenciesFormattedForRequest.push('"' + mainCurrency + currency + '"');
	};

	request.onload = onResponse; <!--TODO: .bind(this) - почитать -->
}
