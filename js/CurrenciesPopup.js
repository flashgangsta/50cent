/**
 * Created by sergeykrivtsov on 7/15/15.
 */

function CurrenciesPopup() {
	var popup = $("#currenciesPopup");
	popup.hide();

	this.onStageResized = function(event) {
		alignItems();
	}

	this.show = function() {
		popup.show();
		alignItems();
	}

	this.hide = function () {
		popup.hide();
	}

	this.onStageResized = function(event) {
		alignItems();
	}

	this.isOpen = function () {
		return popup.is(":visible");
	}

	this.getElementID = function () {
		return popup.attr('id');
	}

	function alignItems() {
		MappingManager.alignCenterX(popup, $(window));
	}
}