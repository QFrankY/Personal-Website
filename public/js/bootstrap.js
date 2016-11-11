/**
 * Bootstrap angular application to window.document
 */

define([
	'require',
	'angular',
	'angular-material',
	'app'
], function (require, ng) {
	'use strict';

	require(['domReady!'], function (document) {
		ng.bootstrap(document, ['app']);
	});
});