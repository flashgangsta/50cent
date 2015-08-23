/**
 * Created by sergeykrivtsov on 7/5/15.
 */

function Header() {
	var stage = $(window);
	var headerHolder = $("#header");
	var logo;
	var headerLogoPrefix;
	var logoTopMargin = 35;
	var headerCurrencySelectorBlock;
	var margin = 15;
	var logoImage = Assets.getInstance().getAssetByName(App.getRatio() === 1 ? "logo_x1_" : "logo_x2_");

	headerHolder.append('<span id="headerLogoPrefix">they call</span>')
	headerHolder.append($(logoImage));
	headerHolder.append('<span id="headerCurrencySelectorBlock"><span id="currencyButtonPrefix"> in </span><a id="currencySelectorButton" class="customUnderline">%currency%</a> </span>');
	logoImage.id = "headerLogo";
	logo = $("#headerLogo");
	headerLogoPrefix = $("#headerLogoPrefix");
	headerCurrencySelectorBlock = $("#headerCurrencySelectorBlock");

	this.onStageResized = function(event) {
		alignHeaderItems();
	}

	function alignHeaderItems() {
		MappingManager.alignCenterX(logoImage, stage);

		logo.offset({
			top: logoTopMargin
		});

		headerCurrencySelectorBlock.offset({
			left: Math.round(MappingManager.getRight(logo) + margin),
			top: MappingManager.alignCenterY(headerCurrencySelectorBlock, logo)
		});

		headerLogoPrefix.offset({
			left: Math.round(logo.position().left - headerLogoPrefix.width() - margin),
			top: headerCurrencySelectorBlock.position().top

		});
	}

	alignHeaderItems();
}