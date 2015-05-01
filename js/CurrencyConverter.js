/**
 * Created by sergeykrivtsov on 4/24/15.
 */

function CurrencyConverter(restOfCurrencyCodes) {
	var apiURL = "http://www.freecurrencyconverterapi.com/api/v3/convert?q=";
	var mainCurrency = "USD";
	var currenciesForExchange = [];
	var currenciesFormattedForRequest = [];
	var currency;

	for(var i = 0; i < arguments.length; i++) {
		currency = arguments[i].toUpperCase();
		currenciesForExchange.push(currency);
		currenciesFormattedForRequest.push(mainCurrency + "_" + currency);
	}

	$(document).ready(function () {
		$.ajax({
		 	url: apiURL + currenciesFormattedForRequest.toString(),
			dataType: 'jsonp',
			success: function (data) {
				var myEvent  = new CustomEvent("CURRENCY_EXCHANGED", {
					detail: {
						results: function() {
							var values = {};
							for (var i = 0; i < currenciesForExchange.length; i++) {
								values[currenciesForExchange[i]] = data.results[currenciesFormattedForRequest[i]].val;
							}

							return values;
						}
					}
				});

				document.dispatchEvent(myEvent);
			}
		});
	})
}
