/**
 * Created by sergeykrivtsov on 8/17/15.
 */

function Assets() {
	var bgMusicPath = "assets/music/bgmusic.ogg";
	var gunsAudioFolder = "assets/sounds/";
	var shootsAudioLenght = 4;
	var reloadAudioLength = 2;
	var shootAudioPrefix = "shoot";
	var shootAudioFormat = "mp3";
	var reloadAudioPrefix = "reload";
	var reloadAudioFormat = "mp3";
	var bgMusicAudio;
	var shootAudioList = [];
	var reloadAudioList = [];
	var instance = this;
	var i;

	var queue = new Queue();


	function loadSound(path, placeTo) {
		var audio = document.createElement('audio');
		audio.autoplay = false;
		audio.src = path;
		audio.addEventListener("canplay", function(event) {
			audio = event.target;
			audio.removeEventListener("canplay", event.callee);
			if(Array.isArray(placeTo)) {
				placeTo.push(audio);
			} else {
				placeTo = audio;
			}
			$(instance).trigger(CustomEvent.ON_ASSET_ELEMENT_LOADED);
		});
		audio.load();
	}
	
	this.loadNextAsset = function () {
		queue.applyFirst();
	};

	this.getAssetsLength = function() {
		return queue.getLength();
	};

	/**
	 *
	 */

	queue.push(loadSound, bgMusicPath, bgMusicAudio);

	for(i = 1; i <= shootsAudioLenght; i++) {
		queue.push(loadSound, gunsAudioFolder + shootAudioPrefix + StringUtil.getTwoDigitNumber(i) + "." + shootAudioFormat , shootAudioList);
	}

	for(i = 1; i <= reloadAudioLength; i++) {
		queue.push(loadSound, gunsAudioFolder + reloadAudioPrefix + StringUtil.getTwoDigitNumber(i) + "." + reloadAudioFormat , reloadAudioList);
	}
}