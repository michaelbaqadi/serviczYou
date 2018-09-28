/**
 * Created by michael.baqadi on 3/11/16.
 */
angular.module('AdminService',[])
    .factory('Admin', ['$http',function($http) {
        return {
            GetCategories : function(){
                return $http.get("/Admin/Categories");
            }
        }
    }]);