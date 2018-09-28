/**
 * Created by michael.baqadi on 11/27/15.
 */
angular.module('ProfileSummaryService', [])
    .factory('ProfileSummary', ['$http',function($http) {
        return {
                CreateProfileSummary : function (param) {
                    return $http.post('/account/createprofilesummary',param);
                },
                getProfileSummaryInfo : function () {
                    return $http.get('/account/usersummary');
            }
        }
    }]);