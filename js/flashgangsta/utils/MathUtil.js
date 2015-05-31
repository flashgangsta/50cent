/**
 * Created by sergeykrivtsov on 6/1/15.
 * @version 0.01
 * @contacts flashgangsta@gmail.com | https://bitbucket.org/flashgangsta
 */

function MathUtil() {

}

MathUtil.getRandomInt = function(min, max) {
	min = parseInt(min);
	max = parseInt(max);
	return parseInt(min + (max - min + 1) * Math.random());
}