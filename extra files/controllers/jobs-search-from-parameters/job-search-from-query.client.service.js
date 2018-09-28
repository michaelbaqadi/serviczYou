/**
 * Created by michael.baqadi on 11/6/15.
 */

angular.module('JobsSearchQueryService', [])
    .factory('JobsSearch', ['$http',function($http) {
        return {
            getJobsMatchesParams : function (params) {
               return $http.post('/jobs/searchresults',params);
            },
            getJobIDAndRouteToJobPage : function(jobID){
                return $http.post('/jobs/getjobfromid', jobID);
            },
            getMyJobs : function(){
                return $http.get('/jobs/getmyjobs');
            }

        }
    }]);