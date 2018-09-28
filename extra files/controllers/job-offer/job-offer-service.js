/**
 * Created by michael.baqadi on 12/5/15.
 */
angular.module('JobOfferService', [])
    .factory('JobOffer', ['$http',function($http) {
        return {
            createNewJobOffer : function(jobOfferData){
                return $http.post('/jobs/createnewoffer/'+window.location.search.substring(4), jobOfferData);
            },
            getJobDescription : function(){
                return $http.get('/jobs/getmyjobs/'+window.location.search.substring(4));
            }
        }
    }]);
