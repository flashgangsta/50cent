/**
 * Created by sergeykrivtsov on 4/24/15.
 */

function CurrencyConverter(restOfCurrencyCodes) {
	var apiURL = 'http://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.xchange where pair in (%currencies%)&env=store://datatables.org/alltableswithkeys&format=json';
	var mainCurrency = "USD";
	var currenciesForExchange = [];
	var currenciesFormattedForRequest = [];
	var currency;
	var request = new XMLHttpRequest();

	function sendRequest() {
		request.open("get", apiURL.replace("%currencies%", currenciesFormattedForRequest.toString()), true);
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
		setTimeout(sendRequest, 2000);
	}


	for(var i = 0; i < arguments.length; i++) {
		currency = arguments[i].toUpperCase();
		currenciesForExchange.push(currency);
		currenciesFormattedForRequest.push('"' + mainCurrency + currency + '"');
	}

	request.onload = onResponse;
	sendRequest();

}
