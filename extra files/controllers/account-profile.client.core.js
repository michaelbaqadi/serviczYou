angular.module('UserAccount', ['ProfileSummaryController','ProfileSummaryService', 'AccountProfileLabelsService',
    'ReviewsController','ReviewsService',
    'ActiveJobsController','ActiveJobsService',
    'ngAnimate', 'ui.bootstrap','bootstrap-tagsinput']);
angular.module('UserAccount').controller('TabsDemoCtrl', function ($scope, $window) {
    $scope.tabs = [
        { title:'Dynamic Title 1', content:'Dynamic content 1' },
        { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
    ];

    $scope.alertMe = function() {
        setTimeout(function() {
            $window.alert('You\'ve selected the alert tab!');
        });
    };
});

angular.module('UserAccount').controller('LabelCtrl', ['$scope','$http','AccountProfileLabels', function ($scope,$http,AccountProfileLabels) {
    $scope.job = {};

    $scope.addLabel = function() {
        AccountProfileLabels.updateLabel($scope.job);
    };
}]);