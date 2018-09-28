/**
 * Created by michael.baqadi on 1/16/16.
 */
angular.module('BusinessDataController',[])
    .controller('BusinessInfoController', ['$scope','$http','BusinessInfo', function($scope,$http,BusinessInfo) {
        $scope.ListJobsMatchesCompany = {};
        $scope.JobData = {};
        $scope.JobOfferData = {};
        $scope.JobOffersList = {};
        $scope.JobsListForBusinessAlert={};
        $scope.BusinessAlertData ={};

       /* BusinessInfo.GetListOfJobsMatchingBusinessSpecifications()
            .success(function (response){
                $scope.ListJobcsMatchesCompany = response;
            })
            .error(function (response, status) {
                console.log("Can Not Retrieve Company Info, Please Contact Admin")
            }) */

        BusinessInfo.GetJobsMatchesBusinessAlert()
            .success(function (response){
                $scope.ListJobsMatchesCompany = response;
            })
            .error(function (response, status) {
                console.log("Can Not Retrieve Company Info, Please Contact Admin" + response+" "+ status)
            })
        $scope.GoToJobOfferPage = function(Job){
            BusinessInfo.GoToJobViewOfferService(Job)
                .success(function(response){
                    if (response.redirectTo && response.msg == 'Just go there please') {
                        window.location = response.redirectTo;
                    }
                })
            }

        BusinessInfo.getJobData()
            .success(function (response){
                $scope.JobData = response[0];
            })
            .error(function (response, status) {
                console.log("Can Not Retrieve Company Info, Please Contact Admin")
            })

        BusinessInfo.GetJobOffersForCurrentBusiness()
            .success(function(response){
                $scope.JobOffersList = response;
            })
            .error(function(response,status){
               console.log('Can not get job offers for your business, please contact ServizYou team!');
            })
        BusinessInfo.GetAlertForCurrentBusiness()
            .success(function(res){
                $scope.BusinessAlertData = res[0];
            })
            .error(function(res,status){
                console.log("Error get alert info for business: " + status);
            })
    }])


