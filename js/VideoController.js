/**
 * Created by sergeykrivtsov on 8/20/15.
 */

function VideoController() {
	var backgroundVideo = $("#bgVideoHolder")[0];

	this.playBackgroundVideo = function() {
		backgroundVideo.play();
	}
}