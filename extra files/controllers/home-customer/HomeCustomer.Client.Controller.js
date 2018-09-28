/**
 * Created by Larry Huynh on 12/29/15.
 */
angular.module('HomeCustomerGeoLocationController',['ngCookies'])
    .controller('HomeCustomerGeoLocationController', ['$scope','$http','$cookieStore','HomeCustomerGeoLocation', function($scope,$http,$cookieStore,HomeCustomerGeoLocation) {
        //data-latitude='40.714398', data-longitude='-74.005279'
        $scope.lat = '40.714398';
        $scope.long = '-74.005279';
        $scope.MyGeoLocation = {lat: '40.714398', long: '-74.005279'};

        HomeCustomerGeoLocation.GetGeoLocation()
            .success(function (response){
                //$scope.MyGeoLocation = response;
            })
            .error(function (response, status) {
                alert("Can Not Retrieve GeoLocation, Please Contact Admin")
            })
    }])

angular.module('HomeCustomerJobHistoryController',['ngCookies'])
    .controller('HomeCustomerJobHistoryController', ['$scope','$http','$cookieStore','HomeCustomerJobHistory', function($scope,$http,$cookieStore,HomeCustomerJobHistory) {
        $scope.MyJobHistory = {};

        HomeCustomerJobHistory.GetJobHistory()
            .success(function (response){
                $scope.MyJobHistory = response;
                //alert(JSON.stringify($scope.MyJobHistory));
            })
            .error(function (response, status) {
                alert("Can Not Retrieve Job History, Please Contact Admin")
            })
    }])








