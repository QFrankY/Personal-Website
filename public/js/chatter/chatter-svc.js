/**
 * Chatter services
 */

define(function () {
	'use strict';

	return [
		'$http',
		'$q',
		'errorSvc',
		function ($http, $q, errorSvc) {
			const formatImageUrl = function(imageNum) {
				return "https://s3-us-west-2.amazonaws.com/frankyu/chatter/profile/img" + imageNum + '.png';
			};

			const getRooms = function () {
				var deferred = $q.defer();

				$http.get('/api/chatter/rooms').then(function (res) {
					deferred.resolve(res.data.rooms);
				}, errorSvc.promptHandler(deferred));

				return deferred.promise;
			};

			const joinRoom = function (room, id) {
				var deferred = $q.defer();

				var url = '/api/chatter/join/' + room;
				if (id) {
					url += '/' + id;
				}

				$http.get(url).then(function (res) {
					deferred.resolve(res.data);
				}, errorSvc.promptHandler(deferred));

				return deferred.promise;
			};

			const leaveRoom = function (room, id) {
				var deferred = $q.defer();

				$http.get('/api/chatter/leave/' + room + '/' + id).then(function (res) {
					deferred.resolve();
				}, errorSvc.promptHandler(deferred));

				return deferred.promise;
			};

			const getUser = function () {
				var deferred = $q.defer();

				$http.get('/api/chatter/user').then(function (res) {
					var user   = res.data.user;
					if (user) {
						user.image = formatImageUrl(user.imageNum);
					}
					deferred.resolve(res.data.user);
				}, errorSvc.promptHandler(deferred));

				return deferred.promise;
			};

			const getRoomUsers = function (id) {
				var deferred = $q.defer();

				$http.get('/api/chatter/users/' + id).then(function (res) {
					deferred.resolve(res.data.users);
				}, errorSvc.promptHandler(deferred));

				return deferred.promise;
			};

			const postUser = function (name) {
				var deferred = $q.defer();

				$http.post('/api/chatter/user', {
					name: name
				}).then(function (res) {
					var user   = res.data.user;
					user.image = formatImageUrl(user.imageNum);
					deferred.resolve(res.data.user);
				}, errorSvc.promptHandler(deferred));

				return deferred.promise;
			};

			const postMessage = function(text, room, id) {
				var deferred = $q.defer();

				$http.post('/api/chatter/message', {
					text   : text,
					room   : room,
					roomId : id
				}, {
					headers: {
						hideLoading: true
					}
				}).then(function (res) {
					deferred.resolve(res.data.user);
				}, errorSvc.promptHandler(deferred));

				return deferred.promise;
			};

			const reconnect = function (rooms) {
				var deferred = $q.defer();

				$http.post('/api/chatter/room/reconnect', {
					rooms: rooms
				}).then(function (res) {

				}, errorSvc.promptHandler(deferred));

				return deferred.promise;
			};

			return {
				formatImageUrl : formatImageUrl,
				getRooms       : getRooms,
				joinRoom       : joinRoom,
				leaveRoom      : leaveRoom,
				getUser        : getUser,
				getRoomUsers   : getRoomUsers,
				postUser       : postUser,
				postMessage    : postMessage,
				reconnect      : reconnect
			};
		}
	];
});