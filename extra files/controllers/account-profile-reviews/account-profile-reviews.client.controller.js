/**
 * Created by michael.baqadi on 10/28/15.
 */

angular.module('ReviewsController', [])
    .controller('ReviewsController', ['$scope','$http','Reviews', function($scope,$http,Reviews) {
        $scope.list = [];
        $scope.val = '';
        $scope.ReviewsData = {};
        $scope.ReviewsDataList = {};

        $scope.submitReviews = function () {
            if ($scope.ReviewsData) {
                $scope.list.push(this.ReviewsData.Reviews);
                $scope.val = this.ReviewsData.Stars;
                Reviews.updateDBReviews($scope.ReviewsData);
            }
        }

        Reviews.getDBReviews()
            .success(function(response) {
                if(response){
                    $scope.ReviewsDataList = response;
                }
            })
            .error(function(response, status) {
                console.error('Repos error', status, data);
            })

    }])
