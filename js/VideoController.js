/**
 * Created by sergeykrivtsov on 8/20/15.
 */

function VideoController() {
	var backgroundVideo = $("#bgVideoHolder")[0];

	function setStyle() {
		var style = backgroundVideo.style;
		style.position = "absolute";
		style.zIndex = 0;
	}

	function scaleAndAlignVideo() {
		MappingManager.setScaleFillArea(backgroundVideo, window);
		MappingManager.alignToCenter(backgroundVideo, window);
	}

	setStyle();
	scaleAndAlignVideo();

	/*video#bgVideoHolder {
		position: fixed;
		top: 50%;
		left: 50%;
		min-width: 100%;
		min-height: 100%;
		width: auto;
		height: auto;
		z-index: -100;
		-webkit-transform: translateX(-50%) translateY(-50%);
		transform: translateX(-50%) translateY(-50%);
		background-size: cover;
	}*/

	this.playBackgroundVideo = function() {
		backgroundVideo.play();
	}

	this.onStageResized = function (event) {
		trace("onStageResized");
		scaleAndAlignVideo();
	}
}