/**
 * Created by sergeykrivtsov on 8/16/15.
 */
trace = function(rest) {
	var key;
	var message = "";
	for(key in arguments) {
		message += arguments[key] + " ";
	}
	message.substr(0, message.length - 1);
	console.log(message);
}