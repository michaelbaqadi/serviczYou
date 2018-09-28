/**
 * Created by michael.baqadi on 12/18/15.
 */
angular.module('HomeCustomerService',[])
    .factory('HomeCustomerGeoLocation', ['$http',function($http) {
        return {
            GetGeoLocation : function(){
                return $http.get("/GetGeoLocation");
            }
        }
    }])
    .factory('HomeCustomerJobHistory', ['$http',function($http) {
        return {
            GetJobHistory : function(){
                return $http.get("/users/GetJobHistory");
            }
        }
    }]);
