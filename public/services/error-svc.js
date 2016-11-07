/**
 * Socket service
 */

define([
	'angular'
], function (ng) {
	'use strict';

	return [
		'$log',
		'$mdDialog',
		function ($log, $mdDialog) {

			return {
				prompt : function (msg) {
					$log.debug('Error: ' + msg);

					return $mdDialog.show(
						$mdDialog.alert()
							.clickOutsideToClose(true)
							.title('Error!')
							.textContent(msg)
							.ariaLabel('Error prompt')
							.ok('Got it!')
					);
				}
			};
		}
	];
});