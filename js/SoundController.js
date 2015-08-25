/**
 * Created by sergeykrivtsov on 5/27/15.
 */
function SoundController() {
	var musicSwitcher = $("#musicSwitcher");
	var shootingSwitcher = $("#shootingSwitcher");
	var musicToggle = localStorage.musicToggle || "on";
	var shootingToggle = localStorage.shootingToggle || "on";
	var SOUND_SHOOT = "ID_SHOOT";
	var SOUND_RELOAD = "ID_RELOAD";
	var TOGGLE_ON = "on";
	var TOGGLE_OFF = "off";
	var instance = this;
	var assets = Assets.getInstance();
	var bgMusic = assets.getAssetByName("bgmusic");
	var shootSounds = assets.getAssetByName("shoot");
	var reloadSounds = assets.getAssetByName("reload");
	bgMusic.loop = true;


	this.playShoot = function() {
		playSound(SOUND_SHOOT);
	};

	this.playReload = function() {
		playSound(SOUND_RELOAD)
	};

	this.playBackgroundMusic = function() {
		if(musicToggle === TOGGLE_ON) {
			bgMusic.play();
		}
	};

	function playSound(soundID) {
		var soundsList;

		if(shootingToggle === TOGGLE_OFF) {
			return;
		} else if(soundID === SOUND_SHOOT) {
			soundsList = shootSounds;
		} else if(soundID === SOUND_RELOAD) {
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

	function onSoundEnded() {
		var audio = event.target;
		audio.removeEventListener('ended', onSoundEnded);
	}

	musicSwitcher.on("click", toggleMusicSwitcher);
	shootingSwitcher.on("click", toggleShootingSwitcher);

	/**
	 *
	 * @param event
	 */

	function toggleMusicSwitcher(event) {
		event.preventDefault();
		if(musicToggle === TOGGLE_ON) {
			musicToggle = TOGGLE_OFF;
			bgMusic.pause();
		} else {
			musicToggle = TOGGLE_ON;
			bgMusic.play();
		}

		localStorage.musicToggle = musicToggle;
		setSoundControllers();
	}

	function toggleShootingSwitcher(event) {
		event.preventDefault();
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
