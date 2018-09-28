/**
 * Created by michael.baqadi on 12/18/15.
 */
angular.module('JobOfferListService',[])
    .factory('JobOfferList', ['$http',function($http) {
        return {
            GetJobOfferListFromDB : function(){
                return $http.get("/jobs/getmyjobsoffers");
            }
        }
    }]);