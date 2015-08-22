/**
 * Created by sergeykrivtsov on 8/17/15.
 */

Assets.getInstance = function(){return null};

function Assets() {
	var queue = new Queue();
	var soundsFolder = "assets/sounds/";
	var imagesFolder = "assets/images/";
	var videosFolder = "assets/videos/";
	var assets = {};
	var instance = this;

	Assets.getInstance = function() {
		return instance;
	}

	queue.push(loadSound, "assets/music/bgmusic.mp3");
	queue.push(loadSound, soundsFolder + "shoot01.mp3");
	queue.push(loadSound, soundsFolder + "shoot02.mp3");
	queue.push(loadSound, soundsFolder + "shoot03.mp3");
	queue.push(loadSound, soundsFolder + "shoot04.mp3");
	queue.push(loadSound, soundsFolder + "reload01.mp3");
	queue.push(loadSound, soundsFolder + "reload02.mp3");
	queue.push(loadImage, imagesFolder + "bullet01.png");
	queue.push(loadImage, imagesFolder + "bullet02.png");
	queue.push(loadImage, imagesFolder + "bullet03.png");
	queue.push(loadVideo, videosFolder + "bgvideo.mp4", "bgVideoHolder", "bgVideoSrc");

	/**
	 *
	 */

	this.loadNextAsset = function () {
		queue.applyFirst();
	};

	/**
	 *
	 */

	this.getAssetsLength = function() {
		return queue.getLength();
	};

	/**
	 *
	 */

	this.getAssetByName = function(name) {
		return assets[name];
	}

	/**
	 *
	 * @param path
	 */

	function loadSound(path) {
		var audio = new Audio();//document.createElement("audio")
		audio.autoplay = false;
		audio.src = path;
		audio.addEventListener("canplaythrough", function(event) {
			audio = event.target;
			rememberElement(audio, path);
			audio.removeEventListener("canplaythrough", arguments.callee);
			$(instance).trigger(CustomEvent.ON_ASSET_ELEMENT_LOADED);
		});
		audio.load();
	}

	/**
	 *
	 * @param path
	 */

	function loadImage(path) {
		var image = new Image();
		image.src = path;
		image.onload = function(event) {
			image = event.target;
			rememberElement(image, path);
			delete image.onload;
			$(instance).trigger(CustomEvent.ON_ASSET_ELEMENT_LOADED);
		}
	}

	/**
	 *
	 * @param path
	 * @param videoHolderID
	 * @param videoSrcID
	 */

	function loadVideo(path, videoHolderID, videoSrcID) {
		var videoHolder = document.getElementById(videoHolderID);
		var video = document.getElementById(videoSrcID);

		video.src = path;
		videoHolder.addEventListener("canplaythrough", function(event) {
			videoHolder.removeEventListener("canplaythrough", arguments.callee);
			videoHolder.pause();
			rememberElement(video, path);
			$(instance).trigger(CustomEvent.ON_ASSET_ELEMENT_LOADED);
		});
		videoHolder.load();
	}

	/**
	 *
	 * @param element
	 * @param path
	 */

	function rememberElement(element, path) {
		var name = path.substr(path.lastIndexOf("/") + 1, path.length);
		name = name.substr(0, name.lastIndexOf("."));

		if(isNaN(name.charAt(name.length - 1))) {
			assets[name] = element;
		} else {

			while(!isNaN(getLastCharNum(name))) {
				name = name.substr(0, name.length - 1);
			}

			if(!assets[name]) {
				assets[name] = [];
			}
			assets[name].push(element);

		}
	}

	/**
	 *
	 * @param value
	 * @returns {number}
	 */

	function getLastCharNum(value) {
		return Number(value.charAt(value.length  - 1));
	}
}