angular.module('BusinessInfoService',[])
    .factory('BusinessInfoData', ['$http',function($http) {
        return {
            InsertAddressData : function(BusinessData){
                //alert("Address Info inside services " + JSON.stringify(BusinessData));
                return $http.post("/Business/CreateEditBusinessAddress",BusinessData);
            },
            GetBusinessProfileInfo : function(){
              return $http.get("/Business/GetBusinessProfileInfo/"+window.location.pathname.split('/')[3]);
            },
            GetBusinessAccountInfo : function(){
                return $http.get("/Business/GetBusinessAccountInfo");
            }
        }
    }]);