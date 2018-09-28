/**
 * Created by michael.baqadi on 1/16/16.
 */
angular.module('BusinessDataService',[])
    .factory('BusinessInfo', ['$http',function($http) {
        return {
            GetListOfJobsMatchingBusinessSpecifications : function(){
                return $http.get("/Business/GetJobMatchesCompany");
            },
            GoToJobViewOfferService : function(job){
                return $http.post('/Business/ViewJob',job);
            },
            getJobData : function(){
                return $http.get('/Business/JobInfoForOffer/'+window.location.search.substring(4));
            },
            CreateNewJobOffer : function (JobOfferData){
                alert(JSON.stringify(JobOfferData));
                return $http.post('/Business/CreateNewJobOffer/'+window.location.search.substring(4), JobOfferData);
            },
            GetJobOffersForCurrentBusiness : function(){
                return $http.get('/Business/OffersForMyBusiness');
            },
            GetJobsMatchesBusinessAlert : function(){
                return $http.get("/Business/GetJobsMatchesMyBusinessAlert");
            },
            GetAlertForCurrentBusiness : function(){
                return $http.get("/Business/GetCurrentBusinessAlert");
            }
        }
    }]);