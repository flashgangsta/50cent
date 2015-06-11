/**
 * Created by sergeykrivtsov on 6/12/15.
 */
/**
 * Created by sergeykrivtsov on 4/17/15.
 */

$(document).ready(function () {
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
	var portrait = $("#portrait");
	var changingPriceMotion = false;
	var soundController = new SoundController();
	var bullets = new Bullets();
	var bulletsHolder = $("#bullets");
	var bulletsMargin;

	main.hide();

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
		currency.delay(motionDuration / 2).fadeOut(motionDuration, "swing", function () {
			price.fadeIn({
				duration: motionDuration,
				easing: "swing",
				start: function () {
					changingPriceMotion = false;
					updateCurrency();
					alignItems();
					bulletsHolder.empty();
				}
			});
			currency.delay(motionDuration / 2).fadeIn({
				duration: motionDuration,
				easing: "swing",
				start: function () {
					alignItems();
				},
				complete: startShooting
			});
		});
	}

	function updateCurrency() {
		if (changingPriceMotion) return;
		switch (currentCurrencyButton.id.substring(2, 0)) {
			case "ru":
			{
				price.text(Math.round(Number(currentCurrencyRate.RUB) / 2));
				currency.text("RUBLES");
				break;
			}
			case "by":
			{
				price.text(Math.round(Number(currentCurrencyRate.BYR) / 2));
				currency.text("RUBLES");
				break;
			}
			case "ua":
			{
				price.text(Math.round(Number(currentCurrencyRate.UAH) / 2));
				currency.text("HRIVNAS");
				break;
			}
		}
	}

	function onCurrencyResponse(event) {
		currentCurrencyRate = event.detail.results();
		updateCurrency();
		if (!main.is(":visible")) {
			main.show(1000);
		}
		alignItems();
	}

	function alignItems() {
		header.css({left: Math.round((stage.width() - header.width()) / 2)});

		if (price.text().length === 2) {
			price.css({
				fontSize: "150pt",
				top: 65
			});
			bulletsHolder.css({top:115});
			currency.css({top: price.position().top + price.height() - 37});

		} else if (price.text().length === 3) {

		} else if (price.text().length === 4) {
			bulletsMargin = 30;
			price.css({
				fontSize: "75pt",
				top: 130});
			bulletsHolder.css({top:130});
			currency.css({top: price.position().top + price.height() - 15});
		}

		trash.css({top: price.position().top + 46});
		trash.hide();

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

	currencyConverter = new CurrencyConverter("BYR", "RUB", "UAH", "GPB", "NOK", "SWE", "CHF", "RON", "HUF", "CAD", "AUD", "MXN", "ARS", "BRL", "JPY", "CNY", "VND", "THB");
	document.addEventListener("CURRENCY_EXCHANGED", onCurrencyResponse);


	function startShooting() {
		var time = 150;
		var shoots = MathUtil.getRandomInt(4, 6);
		var delay = MathUtil.getRandomInt(100, 650);;

		for (var i = 0; i < shoots; i++) {
			setTimeout(makeShot, time);
			time += delay;
		}
	}

	function makeShot() {
		var bullet = bullets.getBullet();
		bullet.css({
			top: MathUtil.getRandomInt(0, currency.position().top + currency.height() - 100),
			left: MathUtil.getRandomInt(20, price.height() - 100)
		});
		bulletsHolder.append(bullet);
		soundController.playSound(SoundController.SHOT);
	}

});
