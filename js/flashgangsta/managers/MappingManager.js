/**
 * Created by sergeykrivtsov on 07/07/15.
 * @version 0.02
 * @contacts flashgangsta@gmail.com | https://bitbucket.org/flashgangsta/flashgangsta-js
 */

function MappingManager() {

}

/**
 *
 * @param	target
 * @param	area
 * @param	notRoundPosition
 */

MappingManager.alignCenterX = function(target, area, notRoundPosition) {
	target = $(target);
	area = $(area);

	var targetBounds = new Rectangle().getElementBounds(target);
	var areaBounds = MappingManager.getAreaBounds(area);

	target.offset({
		left: areaBounds.x + ((areaBounds.width - targetBounds.width) / 2)
	});


	if (!notRoundPosition) {
		target.offset({
			left: Math.round(target.position().left)
		});
	}
}

/**
 *
 * @param	target
 * @param	area
 * @param	notRoundPosition
 */

MappingManager.alignCenterY = function(target, area, notRoundPosition) {
	target = $(target);
	area = $(area);

	var targetBounds = new Rectangle().getElementBounds(target);
	var areaBounds = MappingManager.getAreaBounds(area);

	target.offset({
		top: areaBounds.y + ((areaBounds.height - targetBounds.height) / 2)
	});

	if (!notRoundPosition) {
		target.offset({
			top: Math.round(target.position().top)
		});
	}
}

/**
 * Возвращает y координату нижней граници объекта
 * @param	target
 * @return
 */

MappingManager.getBottom = function(target) {
	target = $(target);
	return Math.ceil(target.position().top + target.height());
}

/**
 *
 * @param	target
 * @return
 */

MappingManager.getRight = function(target) {
	target = $(target);
	return Math.ceil(target.position().left + target.width());
}


/**
 *
 * @param area
 */

MappingManager.getAreaBounds = function(area) {
	area = $(area);
	var areaBounds;
	if(area.length && area[0].hasOwnProperty('window')) {
		areaBounds = new Rectangle(0, 0, area.width(), area.height());
	} else {
		areaBounds = new Rectangle().getElementBounds(area);
	}
	return areaBounds;
}
