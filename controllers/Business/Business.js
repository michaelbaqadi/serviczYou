var app = angular.module('BusinessInfoController',[])


app.controller('BusinessInfoController', ['$scope','$http','BusinessInfoData', function($scope,$http,BusinessInfoData) {
    $scope.BusinessData = {Categories : []};
    $scope.AddressesData = {};
    $scope.AddressDataForEdit={};
    $scope.InsertOrUpdateAddressData = function() {
        //alert("Address Info inside controller " + JSON.stringify($scope.BusinessData));
        BusinessInfoData.InsertAddressData($scope.BusinessData);
    }
    $scope.MainAccountInfo={};
    // Display business profile info
    BusinessInfoData.GetBusinessProfileInfo()
        .success(function (response){
            $scope.BusinessData  = response[0];
            $scope.AddressesData = response[0].MainAddress;
            $scope.AddressDataForEdit=response[0].MainAddress[0];
        })
        .error(function (response, status) {
            console.log("Can Not Retrieve Company Info, Please Contact Admin")
        })

    BusinessInfoData.GetBusinessAccountInfo()
        .success(function (response){
            $scope.MainAccountInfo= response[0];
        })
        .error(function (response, status) {
            console.log("Can Not Retrieve Company Info, Please Contact Admin")
        })

    $scope.data = {
        singleSelect: null,
        multipleSelect: [],
        option1: 'option-1',
    };
}])

