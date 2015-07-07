/**
 * Created by sergeykrivtsov on 6/1/15.
 * @version 0.01
 * @contacts flashgangsta@gmail.com | https://bitbucket.org/flashgangsta/flashgangsta-js
 */

function MathUtil() {
	throw new Error("Date converter is static class and has now be initiliazed");
}

MathUtil.getRandomInt = function(min, max) {
	min = parseInt(min);
	max = parseInt(max);
	return parseInt(min + (max - min + 1) * Math.random());
}