/**
 * Created by michael.baqadi on 11/6/15.
 */
angular.module('JobsSearchQueryController', [])
    .controller('JobsSearchController', ['$scope','$http','JobsSearch', function($scope,$http,JobsSearch) {
        $scope.JobsDataListFromQuery = {};
        $scope.jobParams = {}; // this parameter is used to query all jobs in the database.
        $scope.MyJobsList = {};
        $scope.MyJobsList = {};
        JobsSearch.getMyJobs()
            .success(function (response) {
                if (response) {
                    $scope.MyJobsList = response;
                }
            })
            .error(function (response, status) {
                console.error('Repos error', status, data);
            })
        $scope.moveToSearchPage = function(jobID) {
            JobsSearch.getJobIDAndRouteToJobPage({"jobID" : jobID})
                .success(function (response) {
                    if(response.retStatus === 'Success') {
                        // not sure what did you mean by ('/team' && '/team' !== "")
                        // if('/team' && '/team' !== "") {
                        if (response.redirectTo && response.msg == 'Just go there please') {
                            window.location = response.redirectTo;
                        }
                    }
                    alert("success");
                })
                .error(function (response, status) {
                    console.error('Repos error', status, data);
                    alert("error");
                })
        }
        $scope.getJobsMatchesParams = function() {
            JobsSearch.getJobsMatchesParams($scope.jobParams)
                .success(function (response) {
                    if (response) {
                        $scope.JobsDataListFromQuery= response;
                    }
                })
                .error(function (response, status) {
                    console.error('Repos error', status, data);
                })
        }

    }]);
