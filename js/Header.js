/**
 * Created by sergeykrivtsov on 7/5/15.
 */

function Header() {
	var stage = $(window);
	var logo = $("#headerLogo");
	var headerLogoPrefix = $("#headerLogoPrefix");
	var headerCurrencySelectorBlock = $("#headerCurrencySelectorBlock");
	var margin = 15;
	var logoTopMargin = 35;

	stage.resize(onWindowResized);

	function onWindowResized(event) {
		alignHeaderItems();
	}

	function alignHeaderItems() {
		var stageWidth = stage.width();
		var stageHeight = stage.height();
		var logoWidth = logo.width();

		logo.offset({
			top: logoTopMargin
		});

		MappingManager.alignCenterX(logo, stage);

		headerLogoPrefix.offset({
			left: Math.round(logo.position().left - headerLogoPrefix.width() - margin)
		});

		headerCurrencySelectorBlock.offset({
			left: MappingManager.getRight(logo) + margin
		});

		MappingManager.alignCenterY(headerLogoPrefix, logo);
		MappingManager.alignCenterY(headerCurrencySelectorBlock, logo);



	}

	alignHeaderItems();


	function onResizeHandler() {
		alignHeaderItems();
	}


}