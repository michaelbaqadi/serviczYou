/**
 * Created by michael.baqadi on 10/28/15.
 */

angular.module('ActiveJobsController', [])
    .controller('ActiveJobsController', ['$scope','$http','ActiveJobs', function($scope,$http,ActiveJobs) {
        $scope.jobData= {};
        $scope.ActiveJobsList = {};
        $scope.getActiveJobs = {"curactivejobs" : true};
        $scope.PastJobsList = {};
        $scope.donotGetActiveJobs = {"curactivejobs" : false};

        $scope.activities =
            [
                { id: 1, type: "Work", name: "Writing code" },
                { id: 2, type: "Work", name: "Testing code" },
                { id: 3, type: "Work", name: "Fixing bugs" },
                { id: 4, type: "Play", name: "Dancing" }
            ];
        $scope.createNewJob = function () {

            if ($scope.jobData) {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function(){
                            $scope.jobData.geolocation = position.coords.latitude + ',' + position.coords.longitude;
                            alert($scope.jobData.geolocation);

                        });
                    }
                ActiveJobs.createNewJob($scope.jobData);
            }
        }
        ActiveJobs.getActiveJobsForProcessingUser($scope.getActiveJobs)
           .success(function(response) {
                if(response){
                    $scope.ActiveJobsList = response;
                }

            })
            .error(function(response, status) {
                console.error('Repos error', status);
            })

        ActiveJobs.getActiveJobsForProcessingUser($scope.donotGetActiveJobs)
            .success(function(response) {
                if(response){
                    $scope.PastJobsList = response;
                }

            })
            .error(function(response, status) {
                console.error('Repos error', status);
            })
    }])

