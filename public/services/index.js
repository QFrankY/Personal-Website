/** 
 * Site wide services
 */

define([
	'angular',
	'./socket-svc',
	'../chatter/chatter-svc',

	'angular-socket'
], function (ng, socketSvc, chatterSvc) {
	'use strict';

	return ng.module('allServices', ['btford.socket-io'])
		.factory('socketSvc', socketSvc)
		.factory('chatterSvc', chatterSvc)
		.run(['$log', function ($log) {
			$log.debug("services loaded");
		}]);
});