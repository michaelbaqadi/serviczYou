/**
 * Created by michael.baqadi on 10/28/15.
 */

angular.module('ReviewsService', [])
    .factory('Reviews', ['$http',function($http) {
        return {
            getDBReviews : function(){
                return $http.get('/account/accountreviews');
            },
            updateDBReviews : function(review) {
                return $http.post('/account/review',review);
            }

        }
    }]);
