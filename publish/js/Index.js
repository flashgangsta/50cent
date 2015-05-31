/**
 * Created by sergeykrivtsov on 4/17/15.
 */

$(document).ready(function(){
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
		var currencyConverter;
		var currentCurrencyRate = {};
		var stage = $(window);
		var main = $("#container");
		var price = $("#price");
		var currency = $("#currency");
		var header = $("#header");
		var content = $("#content");
		var trash = $("#trash");
		var footer = $("#footer");
		var money = $("money");
		var portrait = $("#portrait");
		var changingPriceMotion = false;

		main.hide()

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
			currentCurrencyButton = event.currentTarget;
			currentCurrencyButton.className = CLASS_NO_LINK;
			updateButtonsClickEventListener(currentCurrencyButton, false);

			soundController.playSound(SoundController.RELOAD);

			changingPriceMotion = true;

			var motionDuration = 200;

			price.fadeOut(motionDuration, "swing");
			currency.delay(motionDuration / 2).fadeOut(motionDuration, "swing", function() {
				price.fadeIn({
					duration: motionDuration,
					easing: "swing",
					start: function() {
						changingPriceMotion = false;
						updateCurrency();
						alignItems();
					}
				})
				currency.delay(motionDuration / 2).fadeIn({
					duration: motionDuration,
					easing: "swing",
					start: function () {
						alignItems();
					},
					complete: function() {
						var time = 100;
						var shoots = 4;
						var delay = 400;
						for(var i = 0; i < shoots; i++) {
							setTimeout(soundController.playSound, time, SoundController.SHOT);
							time += delay;
						}
					}

				});
			});
		}

		function updateCurrency() {
			if(changingPriceMotion) return;
			switch (currentCurrencyButton.id.substring(2, 0)) {
				case "ru": {
					price.text(Math.round(Number(currentCurrencyRate.RUB) / 2));
					currency.text("RUBLES");
					break;
				}
				case "by": {
					price.text(Math.round(Number(currentCurrencyRate.BYR) / 2));
					currency.text("RUBLES");
					break;
				}
				case "ua": {
					price.text(Math.round(Number(currentCurrencyRate.UAH) / 2));
					currency.text("HRIVNAS");
					break;
				}
			}
		}

		function onCurrencyResponse(event) {
			currentCurrencyRate = event.detail.results();
			updateCurrency();
			main.show();
			alignItems();

		}

		function alignItems() {
			header.css({left: Math.round((stage.width() - header.width()) / 2)});
			price.css({top: 65});
			trash.css({top: price.position().top + 46});

			if(price.text().length === 2) {
				price.css({fontSize: "150pt"});
				price.css({top: 65});
				currency.css({top: price.position().top + price.height() - 37});

			} else if(price.text().length === 3) {

			} else if(price.text().length === 4) {
				price.css({fontSize: "75pt"});
				price.css({top: 130});
				currency.css({top: price.position().top + price.height() - 15});
			}


			content.css({left: header.position().left + 15});
			currency.css({left: Math.round((price.width() - currency.width()) / 2)});


			var headerBottom = header.position().top + header.height();
			var middleArea = stage.height() - headerBottom - footer.height();

			content.css({
				top: headerBottom + Math.round((middleArea - 374) / 2)
			});
		}

		constructor();
		window.onresize = alignItems;

		currencyConverter = new CurrencyConverter("BYR", "RUB", "UAH");
		document.addEventListener("CURRENCY_EXCHANGED", onCurrencyResponse);

		var soundController = new SoundController();
	}

	new Index();
});
