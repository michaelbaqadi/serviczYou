/**
 * Created by michael.baqadi on 12/5/15.
 */
angular.module('JobOfferController', [])
    .controller('jobOfferController', ['$scope','$http', 'JobOffer', function($scope,$http,JobOffer) {
            $scope.jobDescription = {};
            $scope.jobOfferData = {};

            JobOffer.getJobDescription()
                .success(function (response){
                    $scope.jobDescription = response[0];
                    console.log(JSON.stringify($scope.jobDescription));
                })
                .error(function (response, status) {
                    alert("Can Not Retrieve Company Info, Please Contact Admin")
                })

            $scope.createJobOffer = function(){
                alert(JSON.stringify($scope.jobDescription));
                JobOffer.createNewJobOffer($scope.jobOfferData);
            }
    }])