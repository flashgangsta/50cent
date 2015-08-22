/**
 * Created by sergeykrivtsov on 8/13/15.
 */
(function() {
	$(document).ready(function () {
		var app;
		if (!app) {
			console.log("DOCUMENT READY", "navigator.userAgent:", BrowserDetection.getBrowser(), BrowserDetection.getBrowserVersion(), BrowserDetection.getBrowser(), BrowserDetection.getBrowserVersion());
			app = new App();
		}
	});
})();