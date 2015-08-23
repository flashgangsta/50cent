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
	var CURRENCY_NAME_Y = 320;
	var separator = " ";

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
		var rect = new Rectangle(rectThickness, rectThickness, layoutOriginalWidth - rectThickness);
		rect.height = name ? layoutOriginalHeight - rectThickness : CURRENCY_NAME_Y;
		layoutContext.clearRect(rect.x, rect.y, rect.width, rect.height);
		drawCurrencyValue(value);
		if(name) drawCurrencyName(name);
	};

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
		value = value.toString();

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

		layoutContext.font = fontSize + "px Impact";
		layoutContext.fillStyle = "#FFFFFF";
		layoutContext.textAlign = "center";
		layoutContext.textBaseline = "top";
		layoutContext.fillText(value, layoutHTML.width / 2, fontY);
	}

	/**
	 *
	 * @param value
	 */

	function drawCurrencyName(value) {
		layoutContext.font = "91px Impact";
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
		var layoutScale;
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


	layoutHTML.width = layoutOriginalWidth + rectThickness;
	layoutHTML.height = layoutOriginalHeight + rectThickness;

	drawCanvas();
	alignAndScaleLayout();
}