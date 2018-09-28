
angular.module('RegisterAccountController', [])
    .controller('RegisterAccountController', ['$scope', '$http','HomeCustomerAccountFactory', function($scope, $http,HomeCustomerAccountFactory) {

        alert("HEYLLL");
        $scope.user = {};

        HomeCustomerAccountFactory.CreateAccount()
            .success(function (response){
                alert("Something went right");
            })
            .error(function (response, status) {
                alert("Something is wrong");
            })

        $scope.createAccount = function(){
            HomeCustomerAccountFactory.CreateAccount($scope.user);
        }



    }]);