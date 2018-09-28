/**
 * Created by Larry Huynh on 12/29/15.
 */
angular.module('JobOfferListController',['ngCookies'])
    .controller('JobOfferListController', ['$scope','$http','$cookieStore','JobOfferList', function($scope,$http,$cookieStore,JobOfferList) {
        $scope.JobOfferDataList = {};

        JobOfferList.GetJobOfferListFromDB()
            .success(function (response){
                $scope.JobOfferDataList = response;
            })
            .error(function (response, status) {
                alert("Can Not Retrieve Company Info, Please Contact Admin")
            })
    }])


