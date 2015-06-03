/**
 * Created by sergeykrivtsov on 5/27/15.
 */
function SoundController() {
	var shootSounds = [];
	var reloadSounds = [];
	var shootPaths = ["gun01", 'gun02', 'gun03', 'gun04'];
	var reloadPaths = ["reload01", 'reload02'];

	SoundController.SHOT = "shot";
	SoundController.RELOAD = "reload";

	this.playSound = function(soundID) {
		var soundsList = soundID === SoundController.SHOT ? shootSounds : reloadSounds;
		var index = MathUtil.getRandomInt(0, soundsList.length - 1);
		var audio = soundsList[index].cloneNode();
		audio.addEventListener('ended', onSoundEnded);
		audio.play();
	}

	this.playReload = function() {
		var index = MathUtil.getRandomInt(0, reloadSounds.length - 1);
		var audio = shootSounds[index].cloneNode();
		audio.addEventListener('ended', onSoundEnded);
		audio.play();
	}

	function loadSounds(paths, list) {
		for(var i = 0; i < paths.length; i++) {
			var audio = document.createElement('audio');
			var path = 'assets/sounds/' + paths[i] + '.mp3';
			audio.autoplay = false;
			audio.src = path;
			audio.addEventListener("canplay", function(event) {
				audio = event.target;
				audio.removeEventListener("canplay", event.callee);
				list.push(audio);
			});
			audio.load();
		}
	}

	function onSoundEnded() {
		var audio = event.target;
		audio.removeEventListener('ended', onSoundEnded);
	}

	loadSounds(shootPaths, shootSounds);
	loadSounds(reloadPaths, reloadSounds);
}
