/**
 * @fileOverview Development logger.
 */

const colors = require('colors/safe');
const util   = require('util');

const inspect  = util.inspect;
const isObject = util.isObject; // Returns true for arrays and objects.

const inDevMode   = (process.env.NODE_ENV === 'development');
const isLocalHost = process.env.IS_LOCAL_HOST && JSON.parse(process.env.IS_LOCAL_HOST);

var Dev = function (context) {
	this.context = context;
};

var NoopDev = function () {}; // Noop class.

var queue    = [];
var useQueue = false;
var now      = null;
var devSvc   = null;

/** Methods */

var addTimeStamp = null;

if (isLocalHost) {
	addTimeStamp = function (text) {
		return text;
	};
} else {
	addTimeStamp = function (text) {
		var now = (new Date()).toISOString();

		return '[' + now + ']' + text;
	};
}

var getLogger = function (colorName, allowObjects) {
	var color     = colors[colorName];
	var formatStr = null;

	if (allowObjects) {
		formatStr = function (str) {
			return isObject(str) ? inspect(str) : str;
		};
	} else {
		formatStr = function (str) {
			return str;
		};
	}

	return function (str) {
		var text = '[' + this.context + '] ' + formatStr(str);

		text = addTimeStamp(text);

		console.log(color(text));

		if (useQueue) {
			queue.push({
				color : colorName,
				text  : text
			});
		}
	};
};

var noop = function () {};

Dev.prototype.log   = getLogger('green');
Dev.prototype.prog  = getLogger('yellow');
Dev.prototype.err   = getLogger('red');
Dev.prototype.debug = getLogger('cyan', true);

/** Executes callback in dev mode. */
Dev.prototype.exec = function (callback) {
	callback();
};

/** End of Methods */

NoopDev.prototype.log   = noop;
NoopDev.prototype.prog  = noop;
NoopDev.prototype.err   = noop;
NoopDev.prototype.debug = noop;
NoopDev.prototype.exec  = noop;

if (inDevMode) {
	/** Export as a service. */
	devSvc = function (context) {
		return new Dev(context);
	};
} else {
	devSvc = function () { return new NoopDev(); };
}

/** Statics */

devSvc.enabled = inDevMode;

devSvc.useQueue = function (flag) {
	queue    = []; // Clear queue.
	useQueue = flag; // Start/stop queuing.
};

devSvc.getQueue = function () {
	var ret = null;

	if (queue.length) {
		ret   = queue;
		queue = []; // Clear queue.
	}

	return ret;
};

/** End of Statics */

module.exports = devSvc;