/**
 * Created by sergeykrivtsov on 17/08/15.
 * @version 0.01
 * @contacts flashgangsta@gmail.com | https://bitbucket.org/flashgangsta/flashgangsta-js
 */

function StringUtil() {
	throw new Error("StringUtil is static class and has now be initiliazed");
}

StringUtil.getTwoDigitNumber = function(number) {
	number = parseInt(number);
	return number < 10 ? "0" + number : number.toString();
}