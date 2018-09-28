/**
 * Created by michael.baqadi on 12/18/15.
 */
angular.module('BusinessDataService',[])
    .factory('BusinessInfo', ['$http',function($http) {
        return {
            InsertBusinessInfoDB : function(BusinessInfoData){
                return $http.post('/Company/CreateCompanyAccount',BusinessInfoData);
            },
            GetBusinessInfoFromDB : function(ID){
                return $http.post("/Company/GetCompanyProfileInfo",{"ID" : ID});
            },
            GetListOfJobsMatchingBusinessSpecifications : function(){
                return $http.get("/company/getjobsmatchescompanyspecifications");
            },
            goToJobViewOfferService : function(job){
                return $http.post('/jobs/viewJob',job);
            }
        }
    }]);