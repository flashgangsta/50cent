/**
 * Created by sergeykrivtsov on 8/13/15.
 */

function Preloader() {
	var assets = new Assets();
	var instance = this;
	var ratio = App.getRatio();
	var loaderRect = new Rectangle(0, 0, 365 / ratio, 450 / ratio);
	var stroke = 20 / ratio;
	var canvasRect = new Rectangle(0, 0, loaderRect.width + stroke, loaderRect.height + stroke);
	var canvas = $("#preloaderCanvas");
	var canvasHTML = canvas[0];
	var canvasContext = canvas[0].getContext("2d");
	var precentTextSize = Math.round(73 / ratio);
	var percentValueTextSize = Math.round(200 / ratio);
	var percentValueTextRect = new Rectangle(stroke, Math.round(60 / ratio), Math.round(325 / ratio), percentValueTextSize);
	var rectStrokeLenght = (canvasRect.width * 2) + (canvasRect.height * 2);
	var verticalPercent = canvasRect.height / rectStrokeLenght * 100;
	var horizontalPercent = canvasRect.width / rectStrokeLenght * 100;
	var strokeBeginPoint = stroke / 2;
	var strokePhysicalSize = 0;
	var sidePrecentTwo = horizontalPercent + verticalPercent;
	var sidePrecentThree = verticalPercent * 2 + horizontalPercent;
	var loadedFiles = 0;
	var totalFiles = assets.getAssetsLength() + 1;
	var preloaderSidesComplete = 0;

	/**
	 *
	 */

	this.dispose = function() {
		//TODO: dispose all
		$("#preloaderHolder").remove();
	}

	this.onCurrencyRatesProcessed = function() {
		onAssetElementLoaded(null);
	}

	/**
	 *
	 * @param value
	 */

	function drawPercent(value) {
		value = value || 0;
		value = Math.min(value, 100);
		canvasContext.clearRect(percentValueTextRect.x, percentValueTextRect.y, percentValueTextRect.width, percentValueTextRect.height + stroke);
		canvasContext.font = percentValueTextSize + "px Impact";
		canvasContext.fillStyle = "#FFFFFF";
		canvasContext.textAlign = "center";
		canvasContext.textBaseline = "top";
		canvasContext.fillText(Math.floor(value).toString().toUpperCase(), canvasHTML.width / 2, percentValueTextRect.y);

		strokePhysicalSize = Math.round(rectStrokeLenght / 100 * value);

		if(value <= verticalPercent) {
			canvasContext.moveTo(strokeBeginPoint, canvasRect.height);
			canvasContext.lineTo(strokeBeginPoint, canvasRect.height - strokePhysicalSize);
		} else if(value <= sidePrecentTwo) {
			if(!preloaderSidesComplete) {
				preloaderSidesComplete++;
				canvasContext.moveTo(strokeBeginPoint, strokeBeginPoint);
				canvasContext.lineTo(strokeBeginPoint, canvasRect.height);
			}
			canvasContext.moveTo(-strokeBeginPoint, strokeBeginPoint);
			canvasContext.lineTo(strokePhysicalSize - canvasRect.height, strokeBeginPoint);
		} else if(value <= sidePrecentThree) {
			if(preloaderSidesComplete === 1) {
				preloaderSidesComplete++;
				canvasContext.moveTo(-strokeBeginPoint, strokeBeginPoint);
				canvasContext.lineTo(canvasRect.height, strokeBeginPoint);
			}
		 	canvasContext.moveTo(canvasRect.width - strokeBeginPoint, - strokeBeginPoint);
			canvasContext.lineTo(canvasRect.width - strokeBeginPoint, strokePhysicalSize - (canvasRect.height + canvasRect.width));
		} else {
			if(preloaderSidesComplete === 2) {
				preloaderSidesComplete++;
				canvasContext.moveTo(canvasRect.width - strokeBeginPoint, - strokeBeginPoint);
				canvasContext.lineTo(canvasRect.width - strokeBeginPoint, canvasRect.height);
			}
			canvasContext.moveTo(canvasRect.width , canvasRect.height - strokeBeginPoint);
			canvasContext.lineTo((canvasRect.width) - (strokePhysicalSize - (canvasRect.height + canvasRect.height + canvasRect.width)), canvasRect.height - strokeBeginPoint);
		}


		canvasContext.strokeStyle = "#FFFFFF";
		canvasContext.lineWidth = stroke;
		if(Math.floor(value) === 100) {
			canvasContext.strokeRect(stroke / 2, stroke / 2, loaderRect.width, loaderRect.height);
		} else {
			canvasContext.stroke();
		}

	}

	/**
	 *
	 * @param event
	 */

	function onAssetElementLoaded(event) {
		loadedFiles++;
		drawPercent(loadedFiles / totalFiles * 100);
		if(assets.getAssetsLength()) {
			assets.loadNextAsset();
		} else if(loadedFiles === totalFiles) {
			console.log("All loaded");
			drawPercent(100);
			$(instance).trigger(CustomEvent.ON_PRELOADER_COMPLETE);
		} else {
			console.log("All assets loaded");
			$(instance).trigger(CustomEvent.ON_ALL_ASSETS_LOADED);
		}

	}

	/**
	 *
	 * @param event
	 */

	function onStageResized(event) {
		MappingManager.alignCenterY(canvas, window);
	}

	$(window).resize(onStageResized);

	canvasHTML.width = canvasRect.width;
	canvasHTML.height = canvasRect.height;

	canvasContext.strokeStyle = "#333333";
	canvasContext.lineWidth = stroke;
	canvasContext.strokeRect(strokeBeginPoint, strokeBeginPoint, loaderRect.width, loaderRect.height);

	canvasContext.font = precentTextSize + "px Impact";
	canvasContext.fillStyle = "#FFFFFF";
	canvasContext.textAlign = "center";
	canvasContext.textBaseline = "bottom";
	canvasContext.fillText("PERCENT", canvasHTML.width / 2, (canvasHTML.height - (45 / ratio)));

	drawPercent();

	$(assets).on(CustomEvent.ON_ASSET_ELEMENT_LOADED, onAssetElementLoaded);

	assets.loadNextAsset();

	onStageResized(null);
}