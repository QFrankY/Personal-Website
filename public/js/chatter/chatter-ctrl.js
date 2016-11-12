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
			$scope.welcomeMsgOpen = true;
			$scope.closeWelcomeMsg = function () {
				$scope.welcomeMsgOpen = false;
			};

			/** DIRECTIVE MODELS */
			$scope.sidebar = {
				newTab: function (room) {
					$scope.window.tabs.push({
						name      : room.name,
						id        : room.id,
						messages  : []
					});
				},
				getTabs: function () {
					return $scope.window.tabs;
				},
				getActiveTab: function () {
					return $scope.selectedTab;
				}
			};
			$scope.messenger = {
				getActiveTab: function () {
					return $scope.selectedTab;
				}
			};
			$scope.window = {
				tabs: [],
				selectTab: function (tab) {
					$scope.selectedTab = tab;
					$scope.window.selectedTab = tab;
					$scope.sidebar.setTab(tab);
				},
				resetSidebar: function () {
					$scope.sidebar.resetCurrent();
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
			socket.on('newRoom', function (room) {
				$scope.sidebar.rooms.push(room);
			});

			/** Socket event for new message */
			socket.on('message', function (message) {
				var tabs = $scope.window.tabs;

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

			/** User related socket events */
			socket.on('userJoin', function (user) {
				for (var i = 0; i < $scope.sidebar.rooms.length; i++) {
					if ($scope.sidebar.rooms[i].id === user.roomId) {
						$scope.sidebar.rooms[i].numConnections++;
					}
				}

				if ($scope.selectedTab && $scope.selectedTab.id === user.roomId) {
					$scope.sidebar.addUser(user);
				}
			});

			socket.on('userLeft', function (user) {
				$scope.sidebar.removeUser(user);
			});

			socket.on('userDisconnect', function (user) {
				$scope.sidebar.removeUser(user, true);
			});

			socketFetched.promise.then(function (socketId) {
				$scope.socketFetched = true;
			});
		}
	];
});