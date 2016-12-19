define([
	'angular'
], function (ng) {
	'use strict';

	return [
		'$http',
		'$mdDialog',
		'$timeout',
		'chatterSvc',
		'errorSvc',
		function ($http, $mdDialog, $timeout, chatterSvc, errorSvc) {
			return {
				restrict    : 'E',
				templateUrl : '/directive/chatter/window',

				scope: {
					model: '='
				},

				link: {
					pre: function (scope, elem, attrs) {
						var model = scope.model;

						model.menuOpen = false;

						model.updateMessages = function () {
							scope.messages = model.selectedTab.messages;
						};

						scope.$watch('model.menuOpen', function (isOpen) {
							if (isOpen) {
								$timeout(function() {
									scope.tooltipVisible = model.menuOpen;
								}, 200);
							} else {
								scope.tooltipVisible = model.menuOpen;
							}
						});

						scope.$watchCollection('messages', function (newVal) {
							if (newVal) {
								$timeout(function () {
									var element = ng.element(elem[0].getElementsByTagName('md-tab-content'))[scope.selectedTabIndex];
									element.scrollTop = element.scrollHeight;
								});
							}
						});

						scope.leaveRoom = function () {
							var tab = model.tabs[scope.selectedTabIndex];

							chatterSvc.leaveRoom(tab.name, tab.id).then(function () {
								model.tabs.splice(scope.selectedTabIndex, 1);

								if (model.tabs.length === 0) {
									model.resetSidebar();
								}
							});
						};
					}
				} 
			};
		}
	];
});