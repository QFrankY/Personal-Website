require([
	'angular',
	'angular-route',

], function (ng) {
	'use strict';

	return ng.module('allControllers', [])
		.controller('MainCtrl', [
			'$scope',
			'$mdSidenav',
			function ($scope, $mdSidenav) {
				$scope.openLeftMenu = function() {
					$mdSidenav('left').toggle();
				};

				$scope.sideBar = {
					menu : [
						{
							link  : '/',
							title : 'Home',
							icon  : 'home'
						},
						{
							link  : '',
							title : 'Portfolio',
							icon  : 'dashboard'
						}
					],

					projects : [
						{
							link  : '',
							title : 'Chatter',
							icon  : 'messages'
						}
					],

					additional: [
						{
							link  : 'https://github.com/QFrankY',
							title : 'Github',
							icon  : 'code'
						},
						{
							link  : 'http://frank-yu.com/old/',
							title : 'Old Website',
							icon  : 'web'
						}
					]
				};
			}
		]);
});