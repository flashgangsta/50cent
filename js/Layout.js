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

	this.onStageResized = function(event) {
		alignAndScaleLayout();
	}

	this.setCurrency = function(value, name) {
		var rect = new Rectangle(rectThickness, rectThickness, layoutOriginalWidth - rectThickness);
		rect.height = name ? layoutOriginalHeight - rectThickness : CURRENCY_NAME_Y;
		layoutContext.clearRect(rect.x, rect.y, rect.width, rect.height);
		drawCurrencyValue(value);
		if(name) drawCurrencyName(name);
	}


	layoutHTML.width = layoutOriginalWidth + rectThickness;
	layoutHTML.height = layoutOriginalHeight + rectThickness;


	function drawCanvas() {
		layoutContext.strokeStyle = "#FFFFFF";
		layoutContext.lineWidth = 20;
		layoutContext.strokeRect(rectThickness / 2, rectThickness / 2, layoutOriginalWidth, layoutOriginalHeight);
	}

	function drawCurrencyValue(value) {
		layoutContext.font = "290px Impact";
		layoutContext.fillStyle = "#FFFFFF";
		layoutContext.textAlign = "center";
		layoutContext.textBaseline = "top";
		layoutContext.fillText(value, layoutHTML.width / 2, 5);
	}

	function drawCurrencyName(value) {
		layoutContext.font = "91px Impact";
		layoutContext.fillStyle = "#FFFFFF";
		layoutContext.textAlign = "center";
		layoutContext.textBaseline = "top";
		layoutContext.fillText(value.toUpperCase(), layoutHTML.width / 2, CURRENCY_NAME_Y);
	}

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
	
	drawCanvas();
	alignAndScaleLayout();
}