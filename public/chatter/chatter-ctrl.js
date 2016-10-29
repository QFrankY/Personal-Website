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
		'socketSvc',
		function ($http, $log, $mdDialog, $q, $rootScope, $scope, chatterSvc, socketSvc) {
			$rootScope.siteBannerTitle = 'Projects / Chatter';

			/** SCOPE VARIABLES */
			$scope.rooms = { // Chat rooms
				joined       : [],
				joinedHash   : {},
				joinedLoaded : false,
				all          : [],
				allLoaded    : false
			};
			$scope.user; // App user
			$scope.welcomeMsgOpen = true;
			$scope.closeWelcomeMsg = function () {
				$scope.welcomeMsgOpen = false;
			};
			$scope.messenger = {
				text : '',
				file : ''
			};
			$scope.getUserImageUrl = chatterSvc.getUserImageUrl;

			/** SOCKETS */
			var socket = socketSvc.getSocket('/chatter');
			var socketFetched = $q.defer();

			/** Attaching socket id to requests */
			socket.on('/chatter', function (socketId) {
				$http.defaults.headers.common['socket-id'] = socketId;
				socketFetched.resolve();
			});

			/** New user joins room */
			socket.on('newUser', function (user) {
				console.log(msg)
			});

			socket.on('newRoom', function () {
				getRooms();
			});

			/** New message */
			socket.on('newMsg', function (msg) {
				console.log(msg)
			});

			/** ROOMS */
			/** Getting all available rooms */
			var getRooms = function () {
				var deferred = $q.defer();				

				$http.get('/api/chatter/rooms').then(function (res) {
					$scope.rooms.all       = res.data.rooms;
					$scope.rooms.allLoaded = true;

					deferred.resolve($scope.rooms.all);
				}, function (err) {
					deferred.reject();
				});

				return deferred.promise;
			};

			var joinRoom = $scope.rooms.join = function (room, isNew) {
				var deferred = $q.defer();

				if (!$scope.rooms.joinedHash[room]) {
					socketFetched.promise.then(function () { // Making sure socket id is attached to request
						$http.get('/api/chatter/join/' + room + '/' + isNew).then(function (res) {
							$scope.rooms.joined.push({ // Adding room to joined rooms
								name     : room,
								numUsers : res.data.users
							});

							$scope.rooms.joinedHash[room] = true;

							deferred.resolve();
						}, function (res) {
							deferred.reject();
						});
					});
				} else {
					deferred.reject();
				}

				return deferred.promise;
			};

			var createRoom = $scope.rooms.create = function () {
				var deferred = $q.defer();

				var dialog = $mdDialog.prompt()
					.title('Create a new chat room')
					.textContent('Enter a chat room name or one will be randomly chosen')
					.placeholder('chat room name')
					.ok('Okay!')
					.cancel('Cancel');

				$mdDialog.show(dialog).then(function (result) {
					joinRoom(result, true).then(function () {
						deferred.resolve();
					}, function () {
						deferred.reject();
					});
				});

				return deferred.promise;
			};

			/** USER */
			/** Initializing user */
			var setUser = function (name) {
				var deferred = $q.defer();

				$http.post('/api/chatter/user', {
					name : name	
				}).then(function (res) {
					$scope.user = res.data.user;
					deferred.resolve($scope.user);
				});

				return deferred.promise;
			};

			var openUserDialog = function () {
				var deferred = $q.defer();

				var userNameDialog = $mdDialog.prompt()
					.title('Choose a display name')
					.textContent('Enter a display name or one will be randomly choosen for you')
					.placeholder('display name')
					.ok('Okay!')
					.cancel('Random name');

				$mdDialog.show(userNameDialog).then(function(result) {
					setUser(result).then(function () {
						deferred.resolve();
					}, function () {
						deferred.reject();
					});
				}, function () {
					setUser().then(function () {
						deferred.resolve();
					}, function () {
						deferred.reject();
					});
				});

				return deferred.promise;
			};

			getRooms();

			/** Getting user information */
			socketFetched.promise.then(function () {
				$http.get('/api/chatter/user').then(function (res) {
					if (!res.data) { // no user info set
						openUserDialog();
					} else {
						$scope.user = res.data.user;
					}
				});
			});
		}
	];
});