/**
 * @fileOverview Main controller for Chatter project
 */
define([
	'angular'
], function (ng) {
	'use strict';

	return [
		'$rootScope',
		'$sce',
		'$scope',
		'homeSvc',
		function ($rootScope, $sce, $scope, homeSvc) {
			$rootScope.siteBannerTitle = 'Loading...';
			$rootScope.lockLeftMenu(true);

            var projectId = window.location.pathname.split("/").pop();

            homeSvc.getProjectUpdates(projectId).then(function (data) {
                $scope.project = data.project;
                $rootScope.siteBannerTitle = "Project Updates / " + $scope.project.name
                
                var updates = data.updates;
                for (var i = 0; i < updates.length; i++) {
                    updates[i].content =  $sce.trustAsHtml(updates[i].content);

                    if (updates[i].type === 'video') {
                        updates[i].link = $sce.trustAsHtml(updates[i].link);
                    }
                }

                $scope.updates = updates;
            }).catch(function (err) {
                $rootScope.siteBannerTitle = "Project not found!";
                $scope.updates = [];
            });
		}
	];
});