/**
 * @fileOverview Main controller for Chatter project
 */
define([
	'angular'
], function (ng) {
	'use strict';

	return [
		'$http',
		'$log',
		'$mdDialog',
		'$q',
		'$rootScope',
		'$scope',
		'chatterSvc',
		'errorSvc',
		'socketSvc',
		function ($http, $log, $mdDialog, $q, $rootScope, $scope, chatterSvc, errorSvc, socketSvc) {
			$rootScope.siteBannerTitle = 'Projects / Chatter';

			/** SCOPE VARIABLES */
			var tabs = $scope.tabs = [];
			$scope.welcomeMsgOpen = true;
			$scope.closeWelcomeMsg = function () {
				$scope.welcomeMsgOpen = false;
			};
			$scope.selectTab = function (tab) {
				$scope.selectedTab = tab;
			};

			/** DIRECTIVE MODELS */
			$scope.sidebar = {
				newTab: function (room) {
					tabs.push({
						name     : room.name,
						id       : room.id,
						messages : [],
						users    : []
					});
				},
				getTabs: function () {
					return tabs;
				}
			};
			$scope.messenger = {
				getActiveTab: function () {
					return $scope.selectedTab;
				}
			};

			/** SOCKETS */
			var socket = socketSvc.getSocket('/chatter');
			var socketFetched = $q.defer();

			/** Attaching socket id to requests */
			socket.on('/chatter', function (socketId) {
				$http.defaults.headers.common['socket-id'] = socketId;
				socketFetched.resolve(socketId);
			});

			/** Socket event for refreshing list of rooms */
			socket.on('rooms', function (rooms) {
				$scope.sidebar.rooms = rooms;
			});

			socket.on('newRoom', function (room) {
				$scope.sidebar.rooms.push(room);
			});

			/** Socket event for new message */
			socket.on('message', function (message) {
				for (var i = 0; i < tabs.length; i++) {
					if (message.roomId === tabs[i].id) {
						tabs[i].messages.push({
							username : message.username,
							imageUrl : chatterSvc.formatImageUrl(message.imageNum),
							text     : message.text
						});
						break;
					}
				}
			});

			socketFetched.promise.then(function (socketId) {
				$scope.sidebar.socketId   = socketId;
				$scope.messenger.socketId = socketId;
				$scope.socketFetched      = true;
			});
		}
	];
});