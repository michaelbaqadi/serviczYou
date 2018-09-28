/**
 * Created by michael.baqadi on 11/27/15.
 */
angular.module('ProfileSummaryController', [])
    .controller('ProfileSummaryController', ['$scope','$http','ProfileSummary', function($scope,$http,ProfileSummary) {
        $scope.ProfileSummary = {};
        $scope.CreateProfileSummary = function(){
            alert("inside summary controller: " + JSON.stringify($scope.ProfileSummary));
            ProfileSummary.CreateProfileSummary($scope.ProfileSummary)
        }
        ProfileSummary.getProfileSummaryInfo()
                .success(function (response) {
                    if (response) {
                        $scope.ProfileSummary = response[0];
                    }
                })
                .error(function (response, status) {
                    console.error('Repos error', status, data);
                })
    }])

