/**
 * Created by sergeykrivtsov on 5/27/15.
 */



function SoundController() {

	SoundController.prototype.playGunShot = function() {
		//var index =
		var audio = gunShots[0].cloneNode();
		audio.addEventListener('ended', onSoundEnded);
		audio.play();
	}

	var gunShots = [];
	var soundsPaths = ["gun01.mp3"];

	function getRandomInt(min, max) {
		min = parseInt(min);
		max = parseInt(max);
		return parseInt(min + (max - min + 1) * Math.random());
	}

	function loadSounds() {
		for(var i = 0; i < soundsPaths.length; i++) {
			var audio = document.createElement('audio');
			audio.autoplay = false;
			audio.src = 'assets/' + soundsPaths[i];
			audio.addEventListener("canplay", onLoad);
			audio.load();
		}
	}

	function onLoad(event) {
		var audio = event.target;
		audio.removeEventListener("canplay", onLoad);
		gunShots.push(audio)
	}

	function onSoundEnded() {
		var audio = event.target;
		audio.removeEventListener('ended', onSoundEnded);
	}

	loadSounds();


}
