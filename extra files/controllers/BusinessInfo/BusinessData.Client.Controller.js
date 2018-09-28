/**
 * Created by michael.baqadi on 12/18/15.
 */
angular.module('BusinessDataController',['ngCookies'])
    .controller('BusinessInfoController', ['$scope','$http','$cookieStore','BusinessInfo', function($scope,$http,$cookieStore,BusinessInfo) {
        $scope.BusinessInfoData = {};
        $scope.BusinessID = "test";
        $scope.EditProfile = {display : true}
        $scope.ListJobsMatchesCompany = {};

        $scope.goToJobOfferPage = function(Job){
            //$cookieStore.put('jobID',Job._id);
            //var value = $cookieStore.get('jobID');
            //alert("job id value is " + value);
            BusinessInfo.goToJobViewOfferService(Job)
                .success(function(response){
                    if (response.redirectTo && response.msg == 'Just go there please') {
                        window.location = response.redirectTo;
                    }
                })
        }

        $scope.InsertBusinessInfoData = function(){
            BusinessInfo.InsertBusinessInfoDB($scope.BusinessInfoData);
        }
       $scope.moveToJobPage = function(jobID) {
            JobsSearch.getJobIDAndRouteToJobPage({"jobID" : jobID})
                .success(function (response) {
                    if(response.retStatus === 'Success') {
                        // not sure what did you mean by ('/team' && '/team' !== "")
                        // if('/team' && '/team' !== "") {
                        if (response.redirectTo && response.msg == 'Just go there please') {
                            window.location = response.redirectTo;
                        }
                    }
                    alert("success");
                })
                .error(function (response, status) {
                    console.error('Repos error', status, data);
                    alert("error");
                })
        }
        BusinessInfo.GetBusinessInfoFromDB($scope.BusinessID)
            .success(function (response){
                $scope.BusinessInfoData = response[0];
            })
            .error(function (response, status) {
                alert("Can Not Retrieve Company Info, Please Contact Admin")
            })
        BusinessInfo.GetListOfJobsMatchingBusinessSpecifications()
            .success(function (response){
                //alert(JSON.stringify(response));
                $scope.ListJobsMatchesCompany = response;
            })
            .error(function (response, status) {
                alert("Can Not Retrieve Company Info, Please Contact Admin")
            })
    }])


