/**
 * Socket service
 */

define([
	'socket'
], function (io) {
	'use strict';

	window.io = io;

	return [
		'socketFactory',
		function (socketFactory) {
			return {
				getSocket : function (namespace) {
					return socketFactory({
						ioSocket: io.connect(namespace)
					});
				}
			};
		}
	];
});