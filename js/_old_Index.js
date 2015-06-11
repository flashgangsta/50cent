/**
 * Created by sergeykrivtsov on 6/12/15.
 */
/**
 * Created by sergeykrivtsov on 4/17/15.
 */

$(document).ready(function () {
	var currencyConverter = new CurrencyConverter();
	var currentCurrencyRate = {};
	var stage = $(window);
	var langDropDown = $("#langDropDown");
	var langDropDownList = $("#langDropDownList");
	var main = $("#container");
	var price = $("#price");
	var currency = $("#currency");
	var header = $("#header");
	var content = $("#content");
	var trash = $("#trash");
	var footer = $("#footer");
	var portrait = $("#portrait");
	var bulletsHolder = $("#bullets");
	var changingPriceMotion = false;
	var soundController = new SoundController();
	var bullets = new Bullets();
	var bulletsMargin;
	var currentCurrency;

	main.hide();

	function buildDropdown() {
		var currenciesList = currencyConverter.getCurrenciesList();
		var currenciesLength = currenciesList.length;
		var currency;
		currentCurrency = currenciesList[0];
		langDropDown.text(currentCurrency);
		for(var i = 0; i < currenciesLength; i++) {
			var li = $("<li role='presentation'>");
			var item = $("<a role='menuitem' href='#'>");
			currency = currenciesList[i];
			item.click(onCurrencyChanged);
			item.attr("tabindex", i);
			item.attr("id", currency);
			item.text(currency);
			li.append(item);
			langDropDownList.append(li);
		}
		$('#' + currenciesList[0]).hide();
	}

	function onCurrencyChanged(event) {
		event.preventDefault();
		var target = $(this);
		currentCurrency = target.text();
		target.hide();
		$('#' + langDropDown.text()).show();
		langDropDown.text(currentCurrency);

		var motionDuration = 200;
		soundController.playSound(SoundController.RELOAD);

		changingPriceMotion = true;

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
		price.text(Math.round(Number(currentCurrencyRate[currentCurrency]) / 2));
		currency.text(currentCurrency);
		alignItems();
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

		switch(price.text().length) {
			case 1:

				break;
			case 2:
				price.css({
					fontSize: "150pt",
					top: 65
				});
				bulletsHolder.css({top:115});
				currency.css({top: price.position().top + price.height() - 37});
				break;
			case 3:

				break;
			case 4:
				bulletsMargin = 30;
				price.css({
					fontSize: "75pt",
					top: 130});
				bulletsHolder.css({top:130});
				currency.css({top: price.position().top + price.height() - 15});
				break;
			case 5:

				break;

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

	buildDropdown();
	window.onresize = alignItems;

	document.addEventListener("CURRENCY_EXCHANGED", onCurrencyResponse);
	currencyConverter.requestRates();

});
