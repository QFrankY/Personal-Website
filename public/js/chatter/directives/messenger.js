define(function () {
	'use strict';

	return [
		'$timeout',
		'chatterSvc',
		function ($timeout, chatterSvc) {

			return {
				restrict    : 'E',
				templateUrl : '/directive/chatter/messenger',

				scope: {
					model: '='
				},

				link: {
					pre: function (scope, elem, attr) {
						var model     = scope.model;
						var messenger = document.getElementById('messenger');

						var sendMessage = scope.sendMessage = function () {
							scope.loading = true;
							var tab = model.getActiveTab();

							chatterSvc.postMessage(model.input, tab.name, tab.id).then(function () {
								model.input   = null;
								scope.loading = false;
								$timeout(function() {
									messenger.focus(); 
								});
							}, function () {
								scope.loading = false;
								$timeout(function() {
									messenger.focus(); 
								});
							});
						};

						messenger.addEventListener('keypress', function (e) {
							var key = e.which || e.keyCode;

							if (key === 13 && model.input) {
								sendMessage();
							}
						});
					}
				}
			};
		}
	];
});