/**
 * Loading service
 */

define(function () {
	'use strict';

	return [
		'$q',
		'$rootScope',
		function ($q, $rootScope) {
			$rootScope.loading = false;
			var loadingQueue = 0;

			return {
				'request': function (config) {
					if (!config.headers.hideLoading) {
						$rootScope.loading = true;
						loadingQueue++;
					}
					return config || $q.when(config);
				},
				'requestError': function (rejection) {
					if (!rejection.config.headers.hideLoading) {
						loadingQueue--;
						if (loadingQueue === 0) {
							$rootScope.loading = false;
						}
					}
					return $q.reject(rejection);
				},
				'response': function (response) {
					if (!response.config.headers.hideLoading) {
						loadingQueue--;
						if (loadingQueue === 0) {
							$rootScope.loading = false;
						}
					}
					return response || $q.when(response);
				},
				'responseError': function (rejection) {
					if (!rejection.config.headers.hideLoading) {
						loadingQueue--;
						if (loadingQueue === 0) {
							$rootScope.loading = false;
						}
					}
					return $q.reject(rejection);
				}
			};
		}
	];
});