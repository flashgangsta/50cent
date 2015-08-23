/**
 * Created by sergeykrivtsov on 22/07/15.
 * @version 0.01
 * @contacts flashgangsta@gmail.com | https://bitbucket.org/flashgangsta/flashgangsta-js
 */


BrowserDetection.getBrowser = function() {
	return new BrowserDetection().browser;
};

BrowserDetection.getBrowserVersion = function() {
	return new BrowserDetection().version;
};

function BrowserDetection() {
	var userAgent = navigator.userAgent;
	var browser;
	var version;
	var dataString;
	var versionSearchString;

	var dataBrowser = [
		{string: userAgent, subString: "Edge", identity: "MS Edge"},
		{string: userAgent, subString: "Chrome", identity: "Chrome"},
		{string: userAgent, subString: "MSIE", identity: "Explorer"},
		{string: userAgent, subString: "Trident", identity: "Explorer"},
		{string: userAgent, subString: "Firefox", identity: "Firefox"},
		{string: userAgent, subString: "Safari", identity: "Safari"},
		{string: userAgent, subString: "Opera", identity: "Opera"}
	];
	var dataBrowsersLength = dataBrowser.length;

	/**
	 *
	 * @param data
	 * @returns {string|string|string|string|string|string}
	 */

	function searchBrowser(data) {
		var currentData;

		for (var i = 0; i < dataBrowsersLength; i++) {
			currentData = data[i];
			dataString = currentData.string;
			versionSearchString = currentData.subString;

			if (dataString.indexOf(currentData.subString) !== -1) {
				return currentData.identity;
				break;
			}
		}
	}

	/**
	 *
	 * @param dataString
	 * @returns {Number}
	 */

	function searchVersion(dataString) {
		var rv;
		var index = dataString.indexOf(versionSearchString);

		if (index === -1) {
			return;
		}

		rv = dataString.indexOf("rv:");

		if (versionSearchString === "Trident" && rv !== -1) {
			return parseFloat(dataString.substring(rv + 3));
		} else {
			return parseFloat(dataString.substring(index + versionSearchString.length + 1));
		}
	};



	browser = searchBrowser(dataBrowser) || "Unknown";
	version = searchVersion(userAgent) || searchVersion(navigator.appVersion) || "Unknown";

	/**
	 *
	 * @returns {string}
	 */

	BrowserDetection.getBrowser = function() {
		return browser;
	};

	/**
	 *
	 * @returns {Number}
	 */

	BrowserDetection.getBrowserVersion = function() {
		return version;
	}

	return {
		browser: browser,
		version: version
	};
}