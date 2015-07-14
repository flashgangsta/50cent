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
	var instance = this;

	logo.load(onHeaderLogoLoad);

	this.onStageResized = function(event) {
		alignHeaderItems();
	}

	function alignHeaderItems() {
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

	function onHeaderLogoLoad(event) {
		alignHeaderItems();
		$(instance).trigger(CustomEvent.HEADER_LOGO_LOADED);
	}

	alignHeaderItems();
}