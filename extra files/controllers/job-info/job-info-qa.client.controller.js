/**
 * Created by Larry Huynh on 11/06/15.
 */

angular.module('JobInfoQAController', [])
    .controller('JobInfoQAController', ['$scope','$http','QA', function($scope,$http,QA) {
        //$scope= [];
        //$scope.val = '';
        $scope.QAData = {};
        $scope.QADataList = {};

        $scope.submitQuestion = function () {
            //console.log("lol");
            //console.log(JSON.stringify($scope.testDict));
            if ($scope.QAData) {
                $scope.QADataList.push(this.QAData);
                //$scope.val = this.ReviewsData.Stars;
                QA.updateDBQA($scope.QAData);
            }

        }

        QA.getDBQA()
            .success(function(response) {
                if(response){
                    $scope.QADataList = response;
                }
            })
            .error(function(response, status) {
                console.error('Repos error', status, data);
            })

    }])
