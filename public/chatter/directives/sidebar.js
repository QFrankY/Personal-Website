define(function () {
	'use strict';

	return [
		'$mdDialog',
		'$q',
		'chatterSvc',
		'errorSvc',
		function ($mdDialog, $q, chatterSvc, errorSvc) {
			return {
				restrict    : 'E',
				templateUrl : '/directive/chatter/sidebar',

				scope: {
					model: '='
				},

				link: {
					pre: function (scope, elem, attrs) {
						var model = scope.model;

						scope.selectedTab = 0;
						
						var usersDeferred;

						model.setTab = function (tab) {
							scope.tab         = tab;
							usersDeferred     = $q.defer();
							scope.selectedTab = 1;

							fetchUsers();
						};

						model.addUser = function (user) {
							usersDeferred.promise.then(function () {
								var userFound = false;

								for (var i = 0; i < scope.currentRoomUsers.length; i++) {
									if (scope.currentRoomUsers[i].id === user.id) {
										userFound = true;
										break;
									}
								}

								if (!userFound) {
									scope.currentRoomUsers.push({
										name  : user.name,
										image : chatterSvc.formatImageUrl(user.imageNum),
										id    : user.id
									});
								}
							});
						}

						chatterSvc.getRooms().then(function (rooms) {
							model.rooms = rooms;
						});

						chatterSvc.getUser().then(function (user) {
							if (!user) {
								var userNameDialog = $mdDialog.prompt()
									.title('Choose a display name')
									.textContent('Enter a display name or one will be randomly choosen for you')
									.placeholder('display name')
									.ok('Okay!')
									.cancel('Random name');

								$mdDialog.show(userNameDialog).then(function(result) {
									chatterSvc.postUser(result).then(function (user) {
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
								chatterSvc.postRoom(room, id).then(function (_room) {
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

						var fetchUsers = function (switchingTabs) {
							scope.currentRoomUsers = null;

							chatterSvc.getRoomUsers(scope.tab.id).then(function (users) {
								/** Removing duplicates */
								var tempArr = [];
								var hashTable = {};

								for (var i = 0; i < users.length; i++) {
									if (!hashTable[users[i].id]) {
										users[i].image = chatterSvc.formatImageUrl(users[i].imageNum);
										tempArr.push(users[i]);
										hashTable[users[i].id] = true;
									}
								}

								scope.currentRoomUsers = tempArr;
								usersDeferred.resolve();
							});
						};
					}
				}
			};
		}
	];
});