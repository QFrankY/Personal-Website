/** 
 * Site wide services
 */

define([
	'angular',
	'./error-svc',
	'./socket-svc',
	'../chatter/chatter-svc',

	'angular-socket'
], function (ng, errorSvc, socketSvc, chatterSvc) {
	'use strict';

	return ng.module('services', ['btford.socket-io'])
		.factory('errorSvc', errorSvc)
		.factory('socketSvc', socketSvc)
		.factory('chatterSvc', chatterSvc)
		.run(['$log', function ($log) {
			$log.debug("services loaded");
		}]);
});