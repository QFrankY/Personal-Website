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
										scope.currentRoomUsers[i].numConnections++;
										break;
									}
								}

								if (!userFound) {
									scope.currentRoomUsers.push({
										name           : user.name,
										image          : chatterSvc.formatImageUrl(user.imageNum),
										id             : user.id,
										numConnections : 1
									});
								}
							});
						};

						model.removeUser = function (user, allRooms) {
							if (scope.tab && (allRooms || scope.tab.id === user.roomId)) {
								usersDeferred.promise.then(function () {
									for (var i = 0; i < scope.currentRoomUsers.length; i++) {
										if (scope.currentRoomUsers[i].id === user.id) {
											scope.currentRoomUsers[i].numConnections--;
											if (scope.currentRoomUsers[i].numConnections <= 0) {
												scope.currentRoomUsers.splice(i,1);
											}
											break;
										}
									}
								});
							}

							for (var i = 0; i < model.rooms.length; i++) {
								if (model.rooms[i].id === user.roomId || user.rooms[model.rooms[i].id]) {
									model.rooms[i].numConnections--;
									if (model.rooms[i].numConnections === 0) {
										model.rooms.splice(i,1);
										i--;
									}
									if (!allRooms) {
										break;
									}
								}
							}
						};

						model.resetCurrent = function () {
							scope.currentRoomUsers = null;
							scope.tab = null;
						};

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
								}, function () {
									chatterSvc.postUser().then(function (user) {
										model.user = user;
									});
								});
							} else {
								model.user = user;
							}
						});

						var joinRoom = scope.joinRoom = function (room) {
							var validJoin = true;

							if (room.id) {
								var tabs = model.getTabs();

								for (var i = 0; i < tabs.length; i++) {
									if (tabs[i].id === room.id) {
										validJoin = false;
										break;
									}
								}
							}

							if (validJoin) {
								chatterSvc.joinRoom(room.name, room.id).then(function (_room) {
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
								joinRoom({ name: result });
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
										hashTable[users[i].id] = 1;
									} else {
										hashTable[users[i].id]++;
									}
								}

								for (var i = 0; i < tempArr.length; i++) {
									tempArr[i].numConnections = hashTable[tempArr[i].id];
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