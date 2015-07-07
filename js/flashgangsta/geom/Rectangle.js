/**
 * Created by sergeykrivtsov on 07/07/15.
 * @version 0.02
 * @contacts flashgangsta@gmail.com | https://bitbucket.org/flashgangsta/flashgangsta-js
 */

function Rectangle(x, y, width, height) {
	this.x = x || 0;
	this.y = y || 0;
	this.width = width || 0;
	this.height = height || 0;


	/**
	 *
	 * @param target
	 * @returns {Rectangle}
	 */

	this.getElementBounds = function(target) {
		target = $(target);
		var position = target.position();
		return new Rectangle(position.left, position.top, target.width(), target.height());

	}
}

Rectangle.prototype.toString = function() {
	return ("(x=" + this.x + ", y=" + this.y + ", w=" + this.width + ", h=" + this.height + ")");
}