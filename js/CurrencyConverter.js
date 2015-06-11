/**
 * Created by sergeykrivtsov on 4/24/15.
 */

function CurrencyConverter() {
	var currenciesList = ["RUB", "BYR", "UAH", "GBP", "NOK", "SEK", "CHF", "RON", "HUF", "CAD", "AUD", "MXN", "ARS", "BRL", "JPY", "CNY", "VND", "THB"]
	var apiURL = 'http://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.xchange where pair in (%currencies%)&env=store://datatables.org/alltableswithkeys&format=json';
	var mainCurrency = "USD";
	var currenciesForExchange = [];
	var currenciesFormattedForRequest = [];
	var currency;
	var request = new XMLHttpRequest();
	var urlRequest;
	var requestsDelay = 2000;

	this.getCurrenciesList = function() {
		return [].concat(currenciesList);
	};

	this.requestRates = function () {
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

		var myEvent  = new CustomEvent("CURRENCY_EXCHANGED", {
			detail: {
				results: function() {
					var values = {};
					var rateData;
					for (var i = 0; i < result.length; i++) {
						rateData = result[i];
						values[rateData.id.replace(mainCurrency, "")] = rateData.Rate;
					}
					return values;
				}
			}
		});

		document.dispatchEvent(myEvent);
		setTimeout(sendRequest, requestsDelay);
	};


	for(var i = 0; i < currenciesList.length; i++) {
		currency = currenciesList[i].toUpperCase();
		currenciesForExchange.push(currency);
		currenciesFormattedForRequest.push('"' + mainCurrency + currency + '"');
	};

	request.onload = onResponse;
}
