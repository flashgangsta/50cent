/**
 * Created by sergeykrivtsov on 22/08/15.
 * @version 0.04
 * @contacts flashgangsta@gmail.com | https://bitbucket.org/flashgangsta/flashgangsta-js
 */

function MappingManager() {
	throw new Error("MathUtil is static class and has now be initiliazed");
}

/**
 *
 * @param target
 * @param area
 * @param notRoundPosition
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
 * @param target
 * @param area
 * @param notRoundPosition
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
 * Устанавливает объект в центр указанной зоны
 * @param target
 * @param area
 * @param notRoundPosition
 */

MappingManager.alignToCenter = function(target, area, notRoundPosition) {
	target = $(target);
	area = $(area);

	MappingManager.alignCenterX(target, area, notRoundPosition);
	MappingManager.alignCenterY(target, area, notRoundPosition);

	if (!notRoundPosition) {
		MappingManager.roundPositionPoint(target);
	}
}

/**
 * Возвращает y координату нижней граници объекта
 * @param target
 * @returns {number}
 */

MappingManager.getBottom = function(target) {
	target = $(target);
	return Math.ceil(target.position().top + target.height());
}

/**
 *
 * @param target
 * @returns {number}
 */

MappingManager.getRight = function(target) {
	target = $(target);
	return Math.ceil(target.position().left + target.width());
}


/**
 *
 * @param area
 * @returns {Rectangle}
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

/**
 *
 * @returns {Rectangle}
 */

MappingManager.getStageRect = function() {
	var stage = $(window);
	return new Rectangle(0, 0, stage.width(), stage.height());
}

/**
 *
 * @param target
 * @param methond
 */

MappingManager.roundPositionPoint = function(target, method) {
	target = $(target);
	method = method || Math.round;
	if(method !== Math.round && method !== Math.ceil && method !== Math.floor) {
		throw new Error("Rounding method must be equals only null, Math.round, Math.ceil or Math.floor");
	}

	var targetPosition = target.position();
	target.offset({
		left: method(targetPosition.left),
		top: method(target.top)
	});
};

/**
 *
 * @param target
 * @param area
 */

MappingManager.setScaleFillArea = function(target, area) {
	target = $(target);
	area = $(area);

	var scaleX = area.width() / target.width();
	var scaleY = area.height() / target.height();

	if(scaleX >= scaleY) {
		target.width(Math.ceil(area.width()));
		target.height(Math.ceil(target.height() * scaleX));
	} else {
		target.height(Math.ceil(area.height()));
		target.width(Math.ceil(target.width() * scaleY));
	}
};
