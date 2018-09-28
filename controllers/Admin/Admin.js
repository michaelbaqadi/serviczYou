/**
 * Created by michael.baqadi on 3/11/16.
 */
var app = angular.module('AdminController',[])
app.controller('AdminController', ['$scope','$http','Admin', function($scope,$http,Admin) {
    $scope.CategoriesList = ['First','Second','Third'];
}])