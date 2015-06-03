/**
 * Created by sergeykrivtsov on 6/1/15.
 */

function Bullets() {
	var bulletsPaths = ["bullet01", "bullet02", "bullet03"];
	var bullets = [];

	function loadBullets() {
		for(var i = 0; i < bulletsPaths.length; i++) {
			var bullet = new Image();
			bullet.onload = onImageLoaded;
			bullet.src = "assets/" + bulletsPaths[i] + ".png";
			bullet.srcset = "assets/" + bulletsPaths[i] + "_x2.png 2x";
		}
	}

	function onImageLoaded() {
		var bullet = $(this);
		bullet.addClass("bulletHole");
		bullets.push(bullet);
		if(bullets.length === bulletsPaths.length) {
			console.log("AllBulletsLoaded");
		}
	}

	this.getBullet = function() {
		var random = MathUtil.getRandomInt(0, bullets.length - 1);
		return bullets[random].clone();
	}

	loadBullets();
}
