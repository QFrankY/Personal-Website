/**
 * Socket service
 */

define(function () {
	'use strict';

	return [
		'$log',
		'$mdDialog',
		function ($log, $mdDialog) {

			const prompt = function (msg, refresh) {
				return $mdDialog.show(
					$mdDialog.alert()
						.clickOutsideToClose(true)
						.title('Error!')
						.textContent(msg)
						.ariaLabel('Error prompt')
						.ok('Got it!')
				).then(function () {
					if (refresh) {
						location.reload(true);
					}
				});
			};

			const promptHandler = function (deferred) {
				return function (err) {
					var msg     = 'Something went wrong.';
					var refresh = false;

					if (err && err.data) {
						msg = err.data.msg;
						refresh = err.data.refresh;
					}

					$log.debug('Error: ' + msg);

					prompt(msg, refresh);

					if (deferred) {
						deferred.reject();
					}
				}
			};

			return {
				prompt        : prompt,
				promptHandler : promptHandler
			};
		}
	];
});