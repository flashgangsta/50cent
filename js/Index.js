/**
 * Created by sergeykrivtsov on 4/17/15.
 */
function Index() {
	var CURRENCY_ID_RU = "ru";
	var CURRENCY_ID_BY = "by";
	var CURRENCY_ID_UA = "ua";
	var CURRENCY_BUTTON_POSTFIX = "Button";

	var currentCurrencyID = CURRENCY_ID_RU;

	var CLASS_LINK = "currencyButtonEnabled";
	var CLASS_NO_LINK = "currencyButtonDisabled";

	var currencyIDs = [CURRENCY_ID_RU, CURRENCY_ID_BY, CURRENCY_ID_UA];
	var currencyButtons = [];
	var currentCurrencyButton;
	var currentCurrencyRate = {};
	var main = document.getElementById("container");
	var priceTextfield = document.getElementById("price");
	var currencyTextfield = document.getElementById("currency");
	var header = document.getElementById("header");
	var content = document.getElementById("content");

	main.style.display = "none";

	function constructor() {
		var currencyID;
		var currencyButton;

		for (var i = 0; i < currencyIDs.length; i++) {
			currencyID = currencyIDs[i];
			currencyButton = document.getElementById(currencyID + CURRENCY_BUTTON_POSTFIX);
			currencyButtons.push(currencyButton);

			if (currentCurrencyID === currencyID) {
				currentCurrencyButton = currencyButton;
				currentCurrencyButton.className = CLASS_NO_LINK;
			} else {
				currencyButton.className = CLASS_LINK;
				updateButtonsClickEventListener(currencyButton, true);
			}
		}
	}

	/**
	 *
	 * @param target
	 * @param add is Boolean false for remove, true for add
	 */

	function updateButtonsClickEventListener(target, add) {
		target[(add ? "add" : "remove") + "EventListener"]("click", onLinkClicked);
	}

	function onLinkClicked(event) {
		currentCurrencyButton.className = CLASS_LINK;
		updateButtonsClickEventListener(currentCurrencyButton, true);
		currentCurrencyButton = event.target;
		currentCurrencyButton.className = CLASS_NO_LINK;
		updateButtonsClickEventListener(currentCurrencyButton, false);

		switch (currentCurrencyButton.id.substring(2, 0)) {
			case "ru": {
				priceTextfield.textContent = Math.round(Number(currentCurrencyRate.RUB) / 2).toString();
				currencyTextfield.innerText = "ROUBLES";
				break;
			}
			case "by": {
				priceTextfield.textContent = Math.round(Number(currentCurrencyRate.BYR) / 2).toString();
				currencyTextfield.innerText = "ROUBLES";
				break;
			}
			case "ua": {
				priceTextfield.innerText = Math.round(Number(currentCurrencyRate.UAH) / 2).toString();
				currencyTextfield.textContent = "HRIVNAS";
				break;
			}
		}

	}

	function onCurrencyResponse(event) {
		//currentCurrencyRate = event.detail.results();
		currentCurrencyRate.BYR = 7175;
		currentCurrencyRate.UAH = 11;
		currentCurrencyRate.RUB = 26;

		console.log("bel/usd:", currentCurrencyRate.BYR);
		console.log("rus/usd:", currentCurrencyRate.RUB);
		console.log("rus/uah:", currentCurrencyRate.UAH);

		priceTextfield.textContent = Math.round(Number(currentCurrencyRate.RUB) / 2).toString();
		currencyTextfield.textContent = "ROUBLES";

		main.style.display = "";

	}

	function alignItems() {
		//console.log("alignItems()");
		//console.log(window.innerWidth + "x" + window.innerHeight);
		//console.log(document.getElement.style);
		header.style.left = Math.round((window.innerWidth - header.offsetWidth) / 2) + "px";
		header.style.top = "17px";
	}

	constructor();
	onCurrencyResponse();
	window.onresize = alignItems;
	alignItems();

	/*var currencyConverter = new CurrencyConverter("BYR", "RUB", "UAH");
	document.addEventListener("CURRENCY_EXCHANGED", onCurrencyResponse)*/
}
