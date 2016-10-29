/**
 * Chatter services
 */

define(function () {
	'use strict';

	return [
		function (socketFactory) {
			var getUserImageUrl = function(imageNum) {
				return "https://s3-us-west-2.amazonaws.com/frankyu/chatter/profile/img" + imageNum + '.png';
			};

			return {
				getUserImageUrl : getUserImageUrl
			};
		}
	];
});