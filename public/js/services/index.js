/** 
 * Site wide services
 */

define([
	'angular',
	'./http-intercept',

	'./error-svc',
	'./socket-svc',
	
	'../chatter/chatter-svc',
	'../home/home-svc',

	'angular-socket'
], function (ng, httpIntercept, errorSvc, socketSvc, chatterSvc, homeSvc) {
	'use strict';

	return ng.module('services', ['btford.socket-io'])
		.factory('httpIntercept', httpIntercept)
		.factory('errorSvc', errorSvc)
		.factory('socketSvc', socketSvc)
		.factory('chatterSvc', chatterSvc)
		.factory('homeSvc', homeSvc)
		.run(['$log', function ($log) {
			$log.debug("services loaded");
		}]);
});