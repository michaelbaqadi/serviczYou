var app = angular.module('myApp', []);

//These variables check if something is wrong with the 
//username and variable. If either is wrong, the submit
//button is disabled.
var usernameCheck = false;
var passwordCheck = false;
var emailCheck = false;

//This controller validates login.
app.controller('loginCtrl', function($scope, $http) {

  //The usernameCheck grabs information from the radiobutton on login.html
  $scope.usernameCheck = function() {
    //If user selects New User(value=0) radio button
    if($scope.group1 == 0)
    {
      //Post json to the login route to the /usernameCheck
      $http.post('/login/usernameCheck', {username:$scope.username, radio: $scope.group1}).then(function(resp) {
        //If username is not in database, then display nothing
        if((resp.data == true) || ($scope.username.length == 0))
        {
          $scope.usernameTaken = "";
          usernameCheck = false; 
        }
        else  //else it is in database and it is taken
        {
          $scope.usernameTaken = "Username is Taken";
          usernameCheck = true;
        } 
        //Submit disabled or enabled depending on if one
        //of these variables are true
        $scope.submit = usernameCheck || passwordCheck || emailCheck;
        }, 
        function(err) 
        {
          //display error
          console.error('ERR', err);
        }
      );
    }    
  };

  //The passwordCheck grabs information from the radiobutton on login.html
  $scope.passwordCheck = function() {
    //If user selects New User(value=0) radio button
    if($scope.group1 == 0)
    {
      //Password Strength Check
      var pwdValidLength = ($scope.password.length && $scope.password.length >= 8 ? true : false);
      var pwdHasLetter = ($scope.password && /[A-z]/.test($scope.password)) ? true : false;
      var pwdHasNumber = ($scope.password && /\d/.test($scope.password)) ? true : false;

      //Must meet conditions to be valid password
      if( (pwdValidLength && pwdHasLetter && pwdHasNumber) || $scope.password.length == 0 )
      {
        $scope.passwordStrength = "";
        passwordCheck = false; 
      } 
      else  //else it is an unacceptable password
      {
        $scope.passwordStrength = "Letter, Number, and At Least 8 Characters";
        passwordCheck = true;            
      }
      //Submit disabled or enabled depending on if one
      //of these variables are true
      $scope.submit = usernameCheck || passwordCheck || emailCheck;
    }
  }; 


  //The usernameCheck grabs information from the radiobutton on login.html
  $scope.emailCheck = function() {
    //If user selects New User(value=0) radio button
    if($scope.group1 == 0)
    {
      //Post json to the login route to the /usernameCheck
      $http.post('/login/emailCheck', {email:$scope.email}).then(function(resp) {
        //If username is not in database, then display nothing
        if((resp.data == true) || ($scope.email.length == 0))
        {
          $scope.emailTaken = "";
          emailCheck = false; 
        }
        else  //else it is in database and it is taken
        {
          $scope.emailTaken = "Email is Taken";
          emailCheck = true;
        } 
        //Submit disabled or enabled depending on if one
        //of these variables are true
        $scope.submit = usernameCheck || passwordCheck || emailCheck;
        }, 
        function(err) 
        {
          //display error
          console.error('ERR', err);
        }
      );
    }    
  };
    
    /*
    $scope.phoneCheck = function() {
    	    //$scope.username = "CMOMOM";
    	$http.post('/phoneCheck', {msg:$scope.phoneTaken}).then(function(resp) {
	    		$scope.phone = resp.data;
	    		//$scope.conditions = resp.data.conditions;
	  		}, function(err) 
	  		{
	    		console.error('ERR', err);
	    	// err.status will contain the status code
	 		}
 		);
    };
    */
});