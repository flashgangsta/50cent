/**
 * Created by sergeykrivtsov on 7/7/15.
 */

function Layout() {
	var layoutHolder = $("#layoutHolder");
	var layout = $("#layout");
	var layoutHTML = layout[0];
	var stageRect;
	var margins = 55;
	var layoutOriginalWidth = 365;
	var layoutOriginalHeight = 451;
	var layoutContext = layout[0].getContext("2d");
	var rectThickness = 20;
	var CURRENCY_NAME_Y = 310;
	var separator = " ";
	var lastCurrencyValue = 0;
	var bulletsList = Assets.getInstance().getAssetByName("bullet_x" + App.getRatio() + "_");
	var instance = this;
	var layoutScale;

	/**
	 *
	 * @param event
	 */

	this.onStageResized = function(event) {
		alignAndScaleLayout();
	};

	/**
	 *
	 * @param value
	 * @param name
	 */

	this.setCurrency = function(value, name) {
		drawCurrencyValue(value);
		if(name) {
			var rect = new Rectangle(rectThickness, rectThickness + CURRENCY_NAME_Y - 10, layoutOriginalWidth - rectThickness, layoutOriginalHeight - rectThickness - CURRENCY_NAME_Y - 10);
			layoutContext.clearRect(rect.x, rect.y, rect.width, rect.height);
			drawCurrencyName(name);
		}
	};

	/**
	 *
	 */

	this.addBulletHole = function() {
		var point = getShootPoint();
		var random = MathUtil.getRandomInt(0, bulletsList.length - 1);
		var bullet = $(bulletsList[random]).clone();
		layoutContext.drawImage(bullet.clone()[0], Math.round(point.x - 19 * layoutScale), Math.round(point.y - 18 * layoutScale));
	}

	/**
	 *
	 */

	function drawCanvas() {
		layoutContext.strokeStyle = "#FFFFFF";
		layoutContext.lineWidth = 20;
		layoutContext.strokeRect(rectThickness / 2, rectThickness / 2, layoutOriginalWidth, layoutOriginalHeight);
	}

	/**
	 *
	 * @param value
	 */

	function drawCurrencyValue(value) {
		var fontSize;
		var fontY;

		if(value < 1) {
			fontSize = 180;
			fontY = 70;
			value = value.toFixed(2).toString();
		} else {
			value = Math.round(value).toString();

			if(value.length === 3) {
				fontSize = 200;
				fontY = 60;
			} else if(value.length === 4) {
				fontSize = 130;
				fontY = 120;
				value = value.substr(0, 1) + separator + value.substr(1);
			} else if(value.length === 5) {
				fontSize = 110;
				fontY = 140;
				value = value.substr(0, 2) + separator + value.substr(2);
			} else if(value.length === 6) {
				fontSize = 90;
				fontY = 155;
				value = value.substr(0, 3) + separator + value.substr(3);
			} else if(value.length === 7) {
				fontSize = 70;
				fontY = 170;
				value = value.substr(0, 1) + separator + value.substr(1, 3) + separator + value.substr(4);
			} else if(value.length === 8) {
				fontSize = 65;
				fontY = 175;
				value = value.substr(0, 2) + separator + value.substr(2, 3) + separator + value.substr(5);
			} else if(value.length === 9) {
				fontSize = 60;
				fontY = 180;
				value = value.substr(0, 3) + separator + value.substr(3, 3) + separator + value.substr(6);
			} else if(value.length < 3) {
				fontSize = 290;
				fontY = 5;
			}
		}

		if(value === lastCurrencyValue) {
			return;
		}

		lastCurrencyValue = value;

		var rect = new Rectangle(rectThickness, rectThickness, layoutOriginalWidth - rectThickness, CURRENCY_NAME_Y - 10);
		layoutContext.clearRect(rect.x, rect.y, rect.width, rect.height);

		layoutContext.font = fontSize + "px Impact";
		layoutContext.fillStyle = "#FFFFFF";
		layoutContext.textAlign = "center";
		layoutContext.textBaseline = "top";
		layoutContext.fillText(value, layoutHTML.width / 2, fontY);

		$(instance).trigger(CustomEvent.NEW_CURRENCY_VALUE_DRAWN);
	}

	/**
	 *
	 * @param value
	 */

	function drawCurrencyName(value) {
		var fontSize = 91;
		if(value.length >= 7) {
			fontSize = 80;
		}
		layoutContext.font = fontSize + "px Impact";
		layoutContext.fillStyle = "#FFFFFF";
		layoutContext.textAlign = "center";
		layoutContext.textBaseline = "top";
		layoutContext.fillText(value.toUpperCase(), layoutHTML.width / 2, CURRENCY_NAME_Y);
	}

	/**
	 *
	 */

	function alignAndScaleLayout() {
		stageRect = MappingManager.getStageRect();

		var headerLogoBottom = MappingManager.getBottom("#headerLogo");
		var soundControllerPanelTop = $("#soundControllPanel").position().top;
		var layoutMaxHeight
		var margin;

		layoutMaxHeight = Math.round(soundControllerPanelTop - headerLogoBottom);
		layoutScale = Math.min(1, layoutMaxHeight / layoutOriginalHeight);
		margin = margins * layoutScale;
		layoutMaxHeight -= (margin * 2);
		layoutScale = Math.min(1, layoutMaxHeight / layoutOriginalHeight);

		layout.width(Math.round(layoutOriginalWidth * layoutScale));
		layout.height(Math.round(layoutOriginalHeight * layoutScale));

		layoutHolder.offset({
			top: Math.round(headerLogoBottom + margin)
		});
	}

	function getShootPoint() {
		var point = new Point();
		var pointData;
		var hex;
		while(hex !== "ffffff") {
			point.x = MathUtil.getRandomInt(1,layoutOriginalWidth);
			point.y = MathUtil.getRandomInt(1, layoutOriginalHeight);
			console.log(point, layout.width() + "x" + layout.height());
			pointData = layoutContext.getImageData(point.x, point.y, 1, 1).data;
			hex = ("000000" + Drawing.rgbToHex(pointData[0], pointData[1], pointData[2])).slice(-6);
		}
		return point;
	}


	layoutHTML.width = layoutOriginalWidth + rectThickness;
	layoutHTML.height = layoutOriginalHeight + rectThickness;

	drawCanvas();
	alignAndScaleLayout();
}