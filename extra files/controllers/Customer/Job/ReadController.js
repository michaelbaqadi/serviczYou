angular.module('HomeCustomerJobHistoryController',[])
    .controller('HomeCustomerJobHistoryController', ['$scope','$http','CustomerJobHistory', function($scope,$http,CustomerJobHistory) {
        $scope.MyJobHistory = {};

        CustomerJobHistory.GetJobHistory()
            .success(function (response){
                $scope.MyJobHistory = response;
            })
            .error(function (response, status) {
                alert("Can Not Retrieve Job History, Please Contact Admin")
            })
    }])