var app = angular.module('JobApp', []);

// Controller to add new user job
app.controller('GetAllJobController', function($scope,$http) {
    $scope.itemsPerPage = 5;
    $scope.currentPage = 0;
    $scope.AllJobs = {};
    $scope.hideJobOffers = true;
    $scope.divider = true;
    $scope.item = 0;
    $scope.isDivider = function() {
        if($scope.item%2==1) {
            $scope.divider = !$scope.divider;
        }
        $scope.item++;
        return $scope.divider;
    };

    $http.get('/Job/GetAllJobs').then(function (resp) {
        $scope.AllJobs = resp.data;
        if($scope.AllJobs.length == 0)
            $scope.hideJobOffers = false;
    }, function (err) {
        //display error
        console.error('ERR', err);
    });

    $scope.SubmitViewMore = function(job) {
        $http.post('/Job/ViewMore', job);
    };

    $scope.range = function() {
        var rangeSize = 5;
        var ps = [];
        var start = $scope.currentPage;
        if ( start > $scope.pageCount()-rangeSize ) {
            start = $scope.pageCount()-rangeSize+1;
        }
        var begin = (start >= 0 ) ? start : 0;
        for (var i=begin; i<start+rangeSize; i++) {
            ps.push(i);
        }
        return ps;
    };

    $scope.prevPage = function() {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.DisablePrevPage = function() {
        return $scope.currentPage === 0 ? "disabled" : "";
    };

    $scope.pageCount = function() {
        return Math.ceil($scope.AllJobs.length/$scope.itemsPerPage)-1;
    };

    $scope.nextPage = function() {
        if ($scope.currentPage < $scope.pageCount()) {
            $scope.currentPage++;
        }
    };

    $scope.DisableNextPage = function() {
        return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
    };

    $scope.setPage = function(n) {
        $scope.currentPage = n;
    };
});

// Controller to add new user job
app.controller('UserCreateJobController', function($scope,$http) {
    $scope.position;
    $scope.submitForm = false;
    $scope.PostNewJob = {};
    $scope.categoryData = {};
    $scope.subCategoryData = {};
    $scope.pAddress = false;

    $scope.cityData = [
        {name: 'San Diego'},
        {name: 'San Jose'},
        {name: 'Milpitas'}
    ];

    $scope.geocoder = new google.maps.Geocoder();
//, ng-change="updateCategory(categoryData.indexOf(PostNewJob.category))"
    $http.get('/Job/GetAllCategory').then(function (resp) {
        //alert(JSON.stringify(resp.data));
        $scope.categoryData = resp.data;
        //$scope.subCategoryData = $scope.categoryData[$scope.position].SubCategories;
        //$scope.SelectCategory(2);
        for(var index = 0; index < $scope.categoryData.length; index++){
            //do something with obj[i]s
            if(($scope.categoryData[index]["_id"].localeCompare($scope.position) == 0))
            {
                $scope.PostNewJob.category = $scope.categoryData[index];
                break;
            }
        }
        //if(found == -1) found = $scope.position;
        //$scope.PostNewJob.category = $scope.categoryData[found];
        //alert($scope.position);
    }, function (err) {
        //display error
        console.error('ERR', err);
    });
    /*$scope.cityData = {
        'San Diego': 'San Diego',
        'San Jose': 'San Jose',
        'Milpitas': 'Milpitas'
    };*/

    /*$http.post('/Job/GetJobFromID/'+window.location.pathname.split('/')[3]).success(function (resp) {
        PostNewJob = resp[0];
    };*/
    $scope.updateCategory = function (pos) {
        //alert(pos);
        $scope.position = pos;
    };

    $scope.GetAddress = function(){
        $http.get('/GetUserInfo').then(function (resp) {
            $scope.PostNewJob.street = resp.data.local.address.address1;
            $scope.PostNewJob.zipCode = resp.data.local.address.zipcode;
            $scope.PostNewJob.state = resp.data.local.address.state;
            var index;
            for(index = 0; index < $scope.cityData.length; index++) {
                if ($scope.cityData[index].name == resp.data.local.address.city) break;
            }
            $scope.PostNewJob.city = $scope.cityData[index];//resp.data.local.address.city;
            $scope.PostNewJob.country = resp.data.local.address.country;
        }, function (err) {
            //display error
            $scope.pAddress = false;
            alert("Please Sign in to use Primary Address");
            //console.error('ERR', err);
        });
    };

    $scope.SubmitUserJob = function() {
        var address = $scope.PostNewJob.street + ", " + $scope.PostNewJob.city + ", " + $scope.PostNewJob.state + ", " + $scope.PostNewJob.country + " "+ $scope.PostNewJob.zipCode;
        $scope.geocoder.geocode({'address': address}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                $scope.submitForm = true;
                $scope.PostNewJob.latitude = results[0].geometry.location.lat();
                $scope.PostNewJob.longitude = results[0].geometry.location.lng();
                $scope.PostNewJob.startDate = document.getElementById("startDate").value;
                $scope.PostNewJob.endDate = document.getElementById("endDate").value;
                if(document.getElementById("application_email").value === ""){
                    $http.get('/GetUserInfo').then(function (resp) {
                        //alert(resp.data.local.email);
                        $scope.PostNewJob.email = resp.data.local.email;
                        //document.getElementById("application_email").value = resp.data.local.email;
                        //alert($scope.PostNewJob.email + resp.data.local.email);
                    }, function (err) {
                        console.error('ERR', err);
                    });
                }
                if($scope.PostNewJob.jobID === "") {
                    //alert(JSON.stringify($scope.PostNewJob));
                    $http.post('/Job/CreateUserJob', $scope.PostNewJob).success(function (resp) {
                        if(resp.retStatus === 'Success') {
                            if (resp.redirectTo && resp.msg == 'Just go there please') {
                                //alert("location: "+window.location.hostname+"pathname: "+window.location.pathname+"\nhref: "+window.location.href);
                                window.location.href = resp.redirectTo;
                                //window.location.href = window.location.href.replace(window.location.pathname, resp.redirectTo);
                                //window.location = "http://"+window.location.hostname + resp.redirectTo;
                            }
                        }
                    }, function (err) {
                        //display error
                        console.error('ERR', err);
                    });
                }
                 else{
                     $http.post('/Job/UpdateUserJob', $scope.PostNewJob).success(function (resp) {
                         if(resp.retStatus === 'Success') {
                             if (resp.redirectTo && resp.msg == 'Just go there please') {
                                 //alert("location: "+window.location.hostname+"pathname: "+window.location.pathname+"\nhref: "+window.location.href);
                                 window.location.href = resp.redirectTo;
                                 //window.location.href = window.location.href.replace(window.location.pathname, resp.redirectTo);
                                 //window.location = "http://"+window.location.hostname + resp.redirectTo;
                             }
                         }
                     }, function (err) {
                     //display error
                     console.error('ERR', err);
                     });
                 }
            }
            else {
                $scope.submitForm = false;
                alert("Enter a valid address!");
            }
        });
    };

    $scope.SubmitUserJobSession = function() {
        var address = $scope.PostNewJob.street + ", " + $scope.PostNewJob.city + ", " + $scope.PostNewJob.state + ", " + $scope.PostNewJob.country + " "+ $scope.PostNewJob.zipCode;
        $scope.geocoder.geocode({'address': address}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                $scope.submitForm = true;
                $scope.PostNewJob.latitude = results[0].geometry.location.lat();
                $scope.PostNewJob.longitude = results[0].geometry.location.lng();
                $scope.PostNewJob.startDate = document.getElementById("startDate").value;
                $scope.PostNewJob.endDate = document.getElementById("endDate").value;
                if(document.getElementById("application_email").value === ""){
                    $http.get('/GetUserInfo').then(function (resp) {
                        $scope.PostNewJob.email = resp.data.local.email;
                    }, function (err) {
                        console.error('ERR', err);
                    });
                }
                $http.post('/Job/PostJobLogin', $scope.PostNewJob).success(function (resp) {
                }, function (err) {
                    //display error
                    $scope.submitForm = false;
                    alert("Enter a valid address!");
                });
            }
        });
    };
});

// Controller to get user's job posting
app.controller('UserJobHistoryController', function($scope,$http) {
    $scope.itemsPerPage = 5;
    $scope.currentPage = 0;
    $scope.MyJobHistory = {};
    $scope.hideJobOffers = true;
    $scope.divider = true;
    $scope.item = 0;
    $scope.isDivider = function() {
        if($scope.item%2==1) {
            $scope.divider = !$scope.divider;
        }
        $scope.item++;
        return $scope.divider;
    };

    // Get the job history
    //alert(user.local.username);
    $http.get('/Job/GetJobHistory').then(function(resp) {
        $scope.MyJobHistory = resp.data;
        if($scope.MyJobHistory.length == 0)
            $scope.hideJobOffers = false;
    },function(err)
    {
        //display error
        console.error('ERR', err);
    });

    $scope.range = function() {
        var rangeSize = 5;
        var ps = [];
        var start = $scope.currentPage;
        if ( start > $scope.pageCount()-rangeSize ) {
            start = $scope.pageCount()-rangeSize+1;
        }
        var begin = (start >= 0 ) ? start : 0;
        for (var i=begin; i<start+rangeSize; i++) {
            ps.push(i);
        }
        return ps;
    };

    $scope.prevPage = function() {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.DisablePrevPage = function() {
        return $scope.currentPage === 0 ? "disabled" : "";
    };

    $scope.pageCount = function() {
        return Math.ceil($scope.MyJobHistory.length/$scope.itemsPerPage)-1;
    };

    $scope.nextPage = function() {
        if ($scope.currentPage < $scope.pageCount()) {
            $scope.currentPage++;
        }
    };

    $scope.DisableNextPage = function() {
        return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
    };

    $scope.setPage = function(n) {
        $scope.currentPage = n;
    };
});

// Controller for View More Job Details
app.controller('ViewMoreController', function($scope, $http) {
    $scope.itemsPerPage = 3;
    $scope.currentPage = 0;
    $scope.JobData = {};
    $scope.JobOffers = {};
    $scope.hideJobOffers = true;
    // Get the job history
    $http.get('/Job/GetJobFromID/'+window.location.pathname.split('/')[3]).then(function(resp) {
        /*angular.forEach(data, function(element) {
            $scope.JobData.push(element);
        });*/
        $scope.JobData = resp.data[0];
    },function(err)
    {
        //display error
        console.error('ERR', err);
    });

    $http.get('/Job/GetJobOffers/'+window.location.pathname.split('/')[3]).then(function(resp) {
        /*angular.forEach(data, function(element) {
         $scope.JobData.push(element);
         });*/
        $scope.JobOffers = resp.data;
        if($scope.JobOffers.length == 0)
            $scope.hideJobOffers = false;
    },function(err)
    {
        //display error
        console.error('ERR', err);
    });

    $scope.SubmitEditUserJob = function() {
        $http.get('/Job/EditUserJob/'+window.location.pathname.split('/')[3]).success(function (resp) {
            // The rest of this code assumes you are not using a library.
            // It can be made less wordy if you use one.
            var form = document.createElement("form");
            form.setAttribute("method", "POST");
            form.setAttribute("action", "/postJob");

            for (var key in resp) {
                if (Object.prototype.hasOwnProperty.call(resp, key)) {
                    //var val = resp[key];
                    //alert(key + " : " + resp[key]);
                    var hiddenField = document.createElement("input");
                    hiddenField.setAttribute("type", "hidden");
                    hiddenField.setAttribute("name", key);
                    hiddenField.setAttribute("value", resp[key]);

                    form.appendChild(hiddenField);
                }
            }

            document.body.appendChild(form);
            form.submit();
        }, function (err) {
            //display error
            console.error('ERR', err);
        });
    };

    $scope.SubmitDeleteUserJob = function() {
        $http.post('/Job/DeleteUserJob/'+window.location.pathname.split('/')[3]).success(function (resp) {
            if(resp.retStatus === 'Success') {
                if (resp.redirectTo && resp.msg == 'Just go there please') {
                    //alert("location: "+window.location.hostname+"pathname: "+window.location.pathname+"\nhref: "+window.location.href);
                    window.location.href = resp.redirectTo; 
                    //window.location.href = window.location.href.replace(window.location.pathname, resp.redirectTo);
                    //window.location = "http://"+window.location.hostname + resp.redirectTo;
                }
            }
        }, function (err) {
            //display error
            console.error('ERR', err);
        });
    };

    $scope.range = function() {
        var rangeSize = 5;
        var ps = [];
        var start = $scope.currentPage;
        if ( start > $scope.pageCount()-rangeSize ) {
            start = $scope.pageCount()-rangeSize+1;
        }
        var begin = (start >= 0 ) ? start : 0;
        for (var i=begin; i<start+rangeSize; i++) {
            ps.push(i);
        }
        return ps;
    };

    $scope.prevPage = function() {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.DisablePrevPage = function() {
        return $scope.currentPage === 0 ? "disabled" : "";
    };

    $scope.pageCount = function() {
        return Math.ceil($scope.JobOffers.length/$scope.itemsPerPage)-1;
    };

    $scope.nextPage = function() {
        if ($scope.currentPage < $scope.pageCount()) {
            $scope.currentPage++;
        }
    };

    $scope.DisableNextPage = function() {
        return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
    };

    $scope.setPage = function(n) {
        $scope.currentPage = n;
    };
});

//Filter for page chaning
app.filter('pagination', function()
{
    return function(input, start) {
        if (!input || !input.length) { return; }
        start = parseInt(start, 10);
        return input.slice(start);
    };
});

function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return "";
}