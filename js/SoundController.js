/**
 * Created by sergeykrivtsov on 5/27/15.
 */
function SoundController() {
	var shootSounds = [];
	var reloadSounds = [];
	var reloadPaths = ["reload01", 'reload02'];
	var musicSwitcher = $("#musicSwitcher");
	var shootingSwitcher = $("#shootingSwitcher");
	var musicToggle = localStorage.musicToggle || "on";
	var shootingToggle = localStorage.shootingToggle || "on";
	var SOUND_SHOOT = "ID_SHOOT";
	var SOUND_RELOAD = "ID_RELOAD";
	var TOGGLE_ON = "on";
	var TOGGLE_OFF = "off";
	var instance = this;


	this.playShoot = function() {
		//playSound(SOUND_SHOOT);
	};

	this.playReload = function() {
		console.log("playReload();");
		//playSound(SOUND_RELOAD)
	};

	function playSound(soundID) {
		var soundsList;

		console.log("playSound(" + soundID + ");");

		if(shootingToggle === TOGGLE_OFF) {
			return;
		} else if(soundID === SOUND_SHOOT) {
			console.log("soundsList = shootSounds;");
			soundsList = shootSounds;
		} else if(soundID === SOUND_RELOAD) {
			console.log("soundsList = reloadSounds;");
			soundsList = reloadSounds;
		} else {
			return;
		}

		if(!soundsList.length) {
			return;
		}

		var index = MathUtil.getRandomInt(0, soundsList.length - 1);
		var audio = soundsList[index].cloneNode();
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
				if(shootPaths.length === shootSounds.length && reloadPaths.length === reloadSounds.length) {
					$(instance).trigger(CustomEvent.ON_ALL_SOUNDS_LOADED);
				}
			});
			audio.load();
		}
	}

	function onSoundEnded() {
		var audio = event.target;
		audio.removeEventListener('ended', onSoundEnded);
	}

	musicSwitcher.on("click", toggleMusicSwitcherHandler);
	shootingSwitcher.on("click", toggleShootingSwitcher);

	function toggleMusicSwitcherHandler(event) {
		musicToggle = musicToggle === "on" ? "off" : "on";
		localStorage.musicToggle = musicToggle;
		setSoundControllers();
	}

	function toggleShootingSwitcher(event) {
		shootingToggle = shootingToggle === TOGGLE_ON ? TOGGLE_OFF : TOGGLE_ON;
		localStorage.shootingToggle = shootingToggle;
		setSoundControllers();
	}

	function setSoundControllers() {
		musicSwitcher.text("Music " + musicToggle);
		shootingSwitcher.text("Shooting " + shootingToggle);
	}

	setSoundControllers();
}
