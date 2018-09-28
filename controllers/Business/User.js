var app = angular.module('BusinessUserApp',[]);


app.controller('SignUpVerification', function($scope, $http) {

    var businessnameCheck = false;
    var passwordCheck = false;
    var emailCheck = false;
    var passwordConfirmCheck = false;
    var firstNameCheck = false;
    var lastNameCheck = false;
    var agreementCheck = false;


    $scope.userForm = {
    }
    $scope.userForm.buttonDisableState = false;


    businessnameTaken = "";
    emailTaken ="";
    passwordStrength ="";
    passwordRepeat="";
    agreeTermValidation="";
    nameValidation="";
    //Username Check
    var facebookInfo;

    $scope.businessnameCheck = function() {
        changeButtonState();
        var username_string = '' + $scope.userForm.businessname;

        if( $scope.userForm.businessname == null || username_string.length == 0)
        {
            $scope.businessnameTaken = "Please Enter Business Name";
            businessnameCheck = false;
            $scope.userForm.businessnameValidation = 'has-error';
        }
        else {
            $http.post('/Business/businessnameCheck', {businessname: $scope.userForm.businessname}).then(function (resp) {
                    //If username is not in database, then display nothing
                    console.log("USERNAME LENGTH : " + username_string.length);

                    if (resp.data == "false") {
                        //console.log("USERNAME IS TAKEN YO");
                        $scope.businessnameTaken = "Business Name is Taken";
                        businessnameCheck = false;
                        $scope.userForm.businessnameValidation = 'has-error';
                    }
                    else if (resp.data == "true") {
                        //console.log("USERNAME IS FREE");
                        $scope.businessnameTaken = "";
                        businessnameCheck = true;
                        $scope.userForm.businessnameValidation = '';

                    }
                    else {
                        //console.log("USERNAME SOMETHING WRONG");
                        $scope.businessnameTaken = "Something went wrong";
                        businessnameCheck = false;
                    }

                    changeButtonState();

                }, function (err) {
                    //display error
                    console.error('ERR', err);
                }
            );
        }
    };

    //The EmailCheck grabs information from the radiobutton on login.html
    $scope.emailCheck = function() {
        changeButtonState();
        var email_string = '' +$scope.userForm.email;

        if($scope.userForm.email == null || email_string.length == 0)
        {
            $scope.emailTaken = "Please Enter Email";
            emailCheck = false;
            $scope.userForm.emailValidation = 'has-error';
        }
        else {
            $http.post('/Business/emailCheck', {email: $scope.userForm.email}).then(function (resp) {
                //If username is not in database, then display nothing
                console.log("EMAIL LENGTH : " + email_string.length);
                if (resp.data == "false") {
                    console.log("EMAIL IS TAKEN YO");
                    $scope.emailTaken = "Email is Taken";
                    emailCheck = false;
                    $scope.userForm.emailValidation = 'has-error';

                }
                else if (resp.data == "true") {
                    console.log("EMAIL IS FREE");
                    $scope.emailTaken = "";
                    emailCheck = true;
                    $scope.userForm.emailValidation = '';
                    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
                    if (!re.test($scope.userForm.email)) {
                        console.log("INVALID EMAIL");
                        $scope.emailTaken = "Please enter a valid email";
                        emailCheck = false;
                        $scope.userForm.emailValidation = 'has-error';
                    }
                }
                else {
                    //console.log("EMAIL SOMETHING WRONG");
                    $scope.usernameTaken = "Something went wrong with email";
                    emailCheck = false;


                }
                changeButtonState();

            }, function (err) {
                //display error
                console.error('ERR', err);
            });
        }

    };


    //The passwordCheck grabs information from the radiobutton on login.html
    $scope.passwordCheck = function() {
        //If user selects New User(value=0) radio button
        changeButtonState();
        //Password Strength Check
        var pwdValidLength = ($scope.userForm.password.length && $scope.userForm.password.length >= 8 ? true : false);
        var pwdHasLetter = ($scope.userForm.password && /[A-z]/.test($scope.userForm.password)) ? true : false;
        var pwdHasNumber = ($scope.userForm.password && /\d/.test($scope.userForm.password)) ? true : false;

        //Must meet conditions to be valid password
        if( (pwdValidLength && pwdHasLetter && pwdHasNumber) || $scope.userForm.password.length == 0 )
        {
            //console.log("PASSWORD IS VALID");
            $scope.passwordStrength = "";
            passwordCheck = true;
            $scope.userForm.passwordValidation = '';

        }
        else  //else it is an unacceptable password
        {
            //console.log("EMAIL IS FREE");
            $scope.passwordStrength = "Letter, Number, and At Least 8 Characters";
            passwordCheck = false;
            $scope.userForm.passwordValidation = 'has-error';

        }
        changeButtonState();

        //Submit disabled or enabled depending on if one
        //of these variables are true
    };

    $scope.passwordConfirmCheck = function() {
        changeButtonState();
        if (($scope.userForm.passwordconfirm == $scope.userForm.password))
        {
            //console.log("PASSWORD IS THE SAME");
            passwordConfirmCheck = true;
            $scope.passwordRepeat = "";
            $scope.userForm.passwordRepeatValidation = '';
        }
        else
        {
            //console.log("PASSWORD DOESN'T MATCH");
            passwordConfirmCheck = false;
            $scope.passwordRepeat = "Password Doesn't Match";
            $scope.userForm.passwordRepeatValidation = 'has-error';

        }
        changeButtonState();

    };


    $scope.firstNameCheck = function()
    {
        changeButtonState();
        var firstname = '' +$scope.userForm.firstName;
        if (firstname.length > 0 && $scope.userForm.firstName != null)
        {
            $scope.firstNameValidation = "";
            //console.log(" FIRST NAME VALID");
            $scope.userForm.firstNameValidation = '';
            firstNameCheck = true;

        }
        else
        {
            $scope.firstNameValidation = "Enter First Name";
            //console.log(" FIRST NAME INVALID");
            $scope.userForm.firstNameValidation = 'has-error';
            firstNameCheck = false;
        }
        changeButtonState();

    }

    $scope.lastNameCheck = function()
    {
        changeButtonState();
        var lastname = '' +$scope.userForm.lastName;
        if (lastname.length > 0 && $scope.userForm.lastName != null)
        {
            $scope.lastNameValidation = "";
            //console.log(" FIRST NAME VALID");
            $scope.userForm.lastNameValidation = '';
            lastNameCheck = true;
        }
        else
        {
            $scope.lastNameValidation = "Enter Last Name";
            //console.log(" FIRST NAME INVALID");
            $scope.userForm.lastNameValidation = 'has-error';
            lastNameCheck = false;

        }
        changeButtonState();

    }

    $scope.agreeTermCheck = function()
    {
        if(!$scope.userForm.agreeTerm) {
            console.log("AGREE");
            agreementCheck = true;
            $scope.agreeTermValidation = "";

        }
        else {
            console.log("DISAGREE");
            $scope.agreeTermValidation = "Please agree the terms";
            agreementCheck = false;
        }
        changeButtonState();
    }

    function changeButtonState() {
        //console.log("USERNAME CHECK: " + businessnameCheck);
        //console.log("EMAIL CHECK: " + emailCheck);
        //console.log("PASSWORD CHECK : " + passwordCheck);
        //console.log("PASSWORD CONFIRM CHECK: " + passwordConfirmCheck);
        //console.log("FIRSTNAME CHECK: " + firstNameCheck);
        //console.log("LASTNAME CHECK: " + lastNameCheck);
        if (businessnameCheck && passwordCheck && emailCheck && passwordConfirmCheck && firstNameCheck && lastNameCheck && agreementCheck) {
            console.log("CHANGE BUTTON DISABLE TO FALSE");
            $scope.userForm.buttonDisableState = false;
        }
        else {
            console.log("CHANGE BUTTON DISABLE TO TRUE");
            $scope.userForm.buttonDisableState = true;
        }
    }


});