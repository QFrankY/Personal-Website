define(function () {
	'use strict';

	return [
		'$http',
		'chatterSvc',
		function ($http, chatterSvc) {

			return {
				restrict    : 'E',
				templateUrl : '/directive/chatter/messenger',

				scope: {
					model: '='
				},

				link: {
					pre: function (scope, elem, attr) {
						var model = scope.model;

						$http.defaults.headers.common['socket-id'] = model.socketId;

						var sendMessage = model.sendMessage = function () {
							model.loading = true;
							var tab = model.getActiveTab();

							chatterSvc.postMessage($http, model.input, tab.name, tab.id).then(function () {
								model.input   = null;
								model.loading = false;
							});
						};

						document.getElementById('messenger').addEventListener('keypress', function (e) {
							var key = e.which || e.keyCode;

							if (key === 13 && model.input) {
								sendMessage();
							}
						});
					},

					post: function (scope, elem, attr) {
					}
				}
			};
		}
	];
});