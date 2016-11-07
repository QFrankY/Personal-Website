define(function () {
	'use strict';

	return [
		'$http',
		'$mdDialog',
		'chatterSvc',
		'errorSvc',
		function ($http, $mdDialog, chatterSvc, errorSvc) {
			return {
				restrict    : 'E',
				templateUrl : '/directive/chatter/sidebar',

				scope: {
					model: '='
				},

				link: {
					pre: function (scope, elem, attrs) {
						var model = scope.model;

						$http.defaults.headers.common['socket-id'] = model.socketId;

						chatterSvc.getRooms($http).then(function (rooms) {
							model.rooms = rooms;
						});

						chatterSvc.getUser($http).then(function (user) {
							if (!user) {
								var userNameDialog = $mdDialog.prompt()
									.title('Choose a display name')
									.textContent('Enter a display name or one will be randomly choosen for you')
									.placeholder('display name')
									.ok('Okay!')
									.cancel('Random name');

								$mdDialog.show(userNameDialog).then(function(result) {
									chatterSvc.postUser($http, result).then(function (user) {
										model.user = user;
									});
								});
							} else {
								model.user = user;
							}
						});

						var joinRoom = scope.joinRoom = function (room, id) {
							var validJoin = true;

							if (id) {
								var tabs = model.getTabs();

								for (var i = 0; i < tabs.length; i++) {
									if (tabs[i].id === id) {
										validJoin = false;
										break;
									}
								}
							}

							if (validJoin) {
								chatterSvc.postRoom($http, room, id).then(function (_room) {
									model.newTab(_room);
								});
							} else {
								errorSvc.prompt('You are already in this room');
							}
						};

						var createRoom = scope.createRoom = function () {
							var dialog = $mdDialog.prompt()
								.title('Create a new chat room')
								.textContent('Enter a chat room name or one will be randomly chosen')
								.placeholder('chat room name')
								.ok('Okay!')
								.cancel('Cancel');

							$mdDialog.show(dialog).then(function (result) {
								joinRoom(result);
							});	
						}
					}
				} 
			};
		}
	];
});