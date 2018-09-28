/**
 * Created by michael.baqadi on 10/28/15.
 */

angular.module('ActiveJobsService', [])
    .factory('ActiveJobs', ['$http',function($http) {
        return {
            getActiveJobsForProcessingUser : function(getActiveJobs){
                return $http.post('/account/curactivejobs',getActiveJobs);
            },
            createNewJob: function(newJob){
                return $http.post('/account/newjob',newJob);
            }
        }
    }]);

angular.module('AccountProfileLabelsService', [])
    .factory('AccountProfileLabels', ['$http',function($http) {
        return {
            updateLabel: function(labels) {
                return $http.post('/account/updateLabel',labels);
            }
        }
    }]);