/**
 * Created by sergeykrivtsov on 8/17/15.
 */

Assets.getInstance = function(){return null};

function Assets() {
	console.log("new Assets()");
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

	if(App.getRatio() === 1) {
		queue.push(loadImage, imagesFolder + "bullet_x1_01.png");
		queue.push(loadImage, imagesFolder + "bullet_x1_02.png");
		queue.push(loadImage, imagesFolder + "bullet_x1_03.png");
		queue.push(loadImage, imagesFolder + "logo_x1_.png");
		queue.push(loadImage, imagesFolder + "popupCloseCross_x1_.png");
	} else {
		queue.push(loadImage, imagesFolder + "bullet_x2_01.png");
		queue.push(loadImage, imagesFolder + "bullet_x2_02.png");
		queue.push(loadImage, imagesFolder + "bullet_x2_03.png");
		queue.push(loadImage, imagesFolder + "logo_x2_.png");
		queue.push(loadImage, imagesFolder + "popupCloseCross_x2_.png");
	}
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
		console.log("loadSound", path);
		var audio = new Audio();
		var loadStarted = false;
		var progressTimestamp = getTimestamp();
		var checkProgressInterval;

		function onProgress(event) {
			console.log("progress", event);
			progressTimestamp = getTimestamp();
		}

		function onCanPlayThrough(event) {
			console.log("audioLoaded", path);
			audio = event.target;
			rememberElement(audio, path);
			audio.removeEventListener("progress", onProgress);
			audio.removeEventListener("canplaythrough", onCanPlayThrough);
			if(checkProgressInterval) clearInterval(checkProgressInterval);
			$(instance).trigger(CustomEvent.ON_ASSET_ELEMENT_LOADED);
		}

		function onLoadStart(event) {
			audio.removeEventListener("loadstart", onLoadStart);
			console.log(path, "load started");
			progressTimestamp = getTimestamp();
			console.log(">>>>>>>>>>>setInterval", path);
			checkProgressInterval = setInterval(function() {
				console.log("checkProgressInterval", path, checkProgressInterval);
				if(getTimestamp() - progressTimestamp > 2000) {
					clearInterval(checkProgressInterval);
					audio.removeEventListener("progress", onProgress);
					audio.removeEventListener("canplaythrough", onCanPlayThrough);
					$(audio).remove();
					delete audio;
					console.log("!!!!!!!	reload", path);
					loadSound(path);
				}
			}, 300);
			loadStarted = true;
		}

		function onError(event) {
			audio.removeEventListener("error", onError);
			audio.removeEventListener("loadstart", onLoadStart);
			audio.removeEventListener("progress", onProgress);
			audio.removeEventListener("canplaythrough", onCanPlayThrough);
			console.log(path, "error", event);
			loadSound(path);
		}

		audio.addEventListener("loadstart", onLoadStart);
		audio.addEventListener("progress", onProgress);
		audio.addEventListener("canplaythrough", onCanPlayThrough);
		audio.addEventListener("error", onError);

		audio.autoplay = false;
		audio.src = path;

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

	function getTimestamp() {
		return new Date().getTime();
	}
}