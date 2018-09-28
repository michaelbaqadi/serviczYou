/**
 * Created by Larry Huynh on 11/06/15.
 */

angular.module('JobInfoQAService', [])
    .factory('QA', ['$http',function($http) {
        return {

            getDBQA : function(){
                return $http.get('/jobInfo/qa');
            },
            updateDBQA : function(qas) {
                return $http.post('/jobInfo/qa',qas);
            }

        }
    }]);
