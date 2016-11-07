/**
 * Chatter services
 */

define(function () {
	'use strict';

	return [
		'$q',
		'errorSvc',
		function ($q, errorSvc) {
			const formatImageUrl = function(imageNum) {
				return "https://s3-us-west-2.amazonaws.com/frankyu/chatter/profile/img" + imageNum + '.png';
			};

			const getRooms = function ($http) {
				var deferred = $q.defer();

				$http.get('/api/chatter/rooms').then(function (res) {
					deferred.resolve(res.data.rooms);
				}, function (err) {
					errorSvc.prompt(err.data.msg);
					deferred.reject();
				});

				return deferred.promise;
			};

			const postRoom = function ($http, room, id) {
				var deferred = $q.defer();

				var url = '/api/chatter/join/' + room;
				if (id) {
					url += '/' + id;
				}

				$http.get(url).then(function (res) {
					deferred.resolve(res.data);
				}, function (err) {
					errorSvc.prompt(err.data.msg);
					deferred.reject();
				});

				return deferred.promise;
			};

			const getUser = function ($http) {
				var deferred = $q.defer();

				$http.get('/api/chatter/user').then(function (res) {
					var user   = res.data.user;
					if (user) {
						user.image = formatImageUrl(user.imageNum);
					}
					deferred.resolve(res.data.user);
				}, function (err) {
					errorSvc.prompt(err.data.msg);
					deferred.reject();
				});

				return deferred.promise;
			};

			const postUser = function ($http, name) {
				var deferred = $q.defer();

				$http.post('/api/chatter/user', {
					name : name
				}).then(function (res) {
					var user   = res.data.user;
					user.image = formatImageUrl(user.imageNum);
					deferred.resolve(res.data.user);
				}, function (err) {
					errorSvc.prompt(err.data.msg);
					deferred.reject();
				});

				return deferred.promise;
			};

			const postMessage = function($http, text, room, id) {
				var deferred = $q.defer();

				$http.post('/api/chatter/message', {
					text   : text,
					room   : room,
					roomId : id
				}).then(function (res) {
					deferred.resolve(res.data.user);
				}, function (err) {
					errorSvc.prompt(err.data.msg);
					deferred.reject();
				});

				return deferred.promise;
			};

			return {
				formatImageUrl : formatImageUrl,
				getRooms       : getRooms,
				postRoom       : postRoom,
				getUser        : getUser,
				postUser       : postUser,
				postMessage    : postMessage
			};
		}
	];
});