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

	this.onStageResized = function(event) {
		alignAndScaleLayout();
	}


	layoutHTML.width = layoutOriginalWidth + rectThickness;
	layoutHTML.height = layoutOriginalHeight + rectThickness;


	function drawCanvas() {
		layoutContext.strokeStyle = "#FFFFFF";
		layoutContext.lineWidth = 20;
		/*layoutContext.translate(100, 100);*/
		layoutContext.strokeRect(rectThickness / 2, rectThickness / 2, layoutOriginalWidth, layoutOriginalHeight);

		layoutContext.font = "290px Impact";
		layoutContext.fillStyle = "#FFFFFF";
		layoutContext.textAlign = "center";
		layoutContext.textBaseline = "top";
		layoutContext.fillText("88", layoutHTML.width / 2, 5);

		layoutContext.font = "91px Impact";
		layoutContext.fillStyle = "#FFFFFF";
		layoutContext.textAlign = "center";
		layoutContext.textBaseline = "top";
		layoutContext.fillText("FORINT", layoutHTML.width / 2, 320);
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
	
	this.headerLogoLoaded = function (event) {
		console.log("header logo loaded captured")
		console.log(event);
		alignAndScaleLayout();
	};
	
	alignAndScaleLayout();
	drawCanvas();
}