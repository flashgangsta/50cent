/**
 * Created by sergeykrivtsov on 26/08/15.
 * @version 0.01
 * @contacts flashgangsta@gmail.com | https://bitbucket.org/flashgangsta/flashgangsta-js
 */

function Drawing() {
	throw new Error("Drawing is static class and has now be initiliazed");
}

/**
 *
 * @param r
 * @param g
 * @param b
 * @returns {string}
 */

Drawing.rgbToHex = function rgbToHex(r, g, b) {
	if (r > 255 || g > 255 || b > 255) {
		throw "Invalid color component";
	}
	return ((r << 16) | (g << 8) | b).toString(16);
};