/**
 * Created by michael.baqadi on 12/18/15.
 */
angular.module('UserService',[])
    .factory('UserJobHistory', ['$http',function($http) {
        return {
            GetJobHistory : function(){
                //alert("hello");
                return $http.get("/User/GetJobHistory");
            }
        }
    }]);