
var app = angular.module('UserApp', []);
app.controller('UserController', function($scope, $http) {

    var usernameCheck = false;
    var passwordCheck = false;
    var emailCheck = false;
    var passwordConfirmCheck = false;
    var firstNameCheck = false;
    var lastNameCheck = false;
    var agreementCheck = false;


    $scope.userForm = {
    }
    $scope.userForm.buttonDisableState = false;


    usernameTaken = "";
    emailTaken ="";
    passwordStrength ="";
    passwordRepeat="";
    agreeTermValidation="";
    nameValidation="";
    //Username Check
    var facebookInfo;

    $scope.usernameCheck = function() {
        changeButtonState();
        var username_string = '' + $scope.userForm.username;

        if( $scope.userForm.username == null || username_string.length == 0)
        {
            $scope.usernameTaken = "Please Enter Username";
            usernameCheck = false;
            $scope.userForm.usernameValidation = 'has-error';
        }
        else {
            $http.post('/usernameCheck', {username: $scope.userForm.username}).then(function (resp) {
                    //If username is not in database, then display nothing
                    console.log("USERNAME LENGTH : " + username_string.length);

                    if (resp.data == "false") {
                        //console.log("USERNAME IS TAKEN YO");
                        $scope.usernameTaken = "Username is Taken";
                        usernameCheck = false;
                        $scope.userForm.usernameValidation = 'has-error';


                    }
                    else if (resp.data == "true") {
                        //console.log("USERNAME IS FREE");
                        $scope.usernameTaken = "";
                        usernameCheck = true;
                        $scope.userForm.usernameValidation = '';

                    }
                    else {
                        //console.log("USERNAME SOMETHING WRONG");
                        $scope.usernameTaken = "Something went wrong";
                        usernameCheck = false;

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
            $http.post('/emailCheck', {email: $scope.userForm.email}).then(function (resp) {
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
        //console.log("USERNAME CHECK: " + usernameCheck);
        //console.log("EMAIL CHECK: " + emailCheck);
        //console.log("PASSWORD CHECK : " + passwordCheck);
        //console.log("PASSWORD CONFIRM CHECK: " + passwordConfirmCheck);
        //console.log("FIRSTNAME CHECK: " + firstNameCheck);
        //console.log("LASTNAME CHECK: " + lastNameCheck);
        if (usernameCheck && passwordCheck && emailCheck && passwordConfirmCheck && firstNameCheck && lastNameCheck && agreementCheck) {
            console.log("CHANGE BUTTON DISABLE TO FALSE");
            $scope.userForm.buttonDisableState = false;
        }
        else {
            console.log("CHANGE BUTTON DISABLE TO TRUE");
            $scope.userForm.buttonDisableState = true;
        }
    }


});




app.controller('UserProfileController', function($scope, $http) {

    $scope.userProfile = {};

    var passwordCheck = true;
    var emailCheck = true;
    var passwordConfirmCheck = true;

    emailTaken ="";
    passwordStrength ="";
    passwordRepeat="";

    $("#passwordChange").hide();
    $("#emailChange").hide();

    var initial_email ;
    $scope.userProfile.editState = true;
    $scope.userProfile.save_button_state = true;
    $scope.userProfile.edit_button_state = false;

    $scope.userProfile.passwordCheckHide = true;
    $scope.userProfile.save_disable_state = false;

    $http.get('/GetUserInfo').then(function (resp) {
        initial_email = resp.data.local.email;
        $scope.userProfile.address1 = resp.data.local.address.address1;
        $scope.userProfile.zipcode = resp.data.local.address.zipcode;
        $scope.userProfile.state = resp.data.local.address.state;
        $scope.userProfile.city = resp.data.local.address.city;
        $scope.userProfile.phonenumber = resp.data.local.phonenumber;
        $scope.userProfile.bio = resp.data.local.bio;
        $scope.userProfile.country = resp.data.local.address.country;
        $scope.userProfile.email = resp.data.local.email;
        $scope.userProfile.password = "";


    }, function (err) {
        //display error
        console.error('ERR', err);
    });

    $scope.editProfile = function()
    {
        $scope.userProfile.editState = false;
        $scope.userProfile.save_button_state = false;
        $scope.userProfile.edit_button_state = true;
    }

    $scope.changeEmailCheck = function()
    {
        changeButtonState();
        if(!$scope.userProfile.changeEmail) {
            emailCheck = false;
            console.log("Im changing email");
            $("#emailChange").show();
            $scope.agreeTermValidation = "";
        }
        else {
            console.log("Not changing email");
            emailCheck = true;
            $("#emailChange").hide();

        }
        changeButtonState();
    }

    $scope.changePasswordCheck = function()
    {
        changeButtonState();
        if(!$scope.userProfile.changePassword) {
            console.log("Im changing password");
            $("#passwordChange").show();
            passwordCheck = false;
            $scope.agreeTermValidation = "";
        }
            else {
            console.log("Not changing password");
            passwordCheck = true;
            $("#passwordChange").hide();

        }
        changeButtonState();
    }



    $scope.emailCheck = function() {
        var email_string = '' +$scope.userProfile.email;
        changeButtonState();

        if($scope.userProfile.email == null || email_string.length == 0)
        {
            $scope.emailTaken = "Please Enter Email";
            emailCheck = false;
            $scope.userProfile.emailValidation = 'has-error';
        }
        else if ($scope.userProfile.email == initial_email)
        {
            $scope.emailTaken = "Please enter a different email";
            emailCheck = false;
            $scope.userProfile.emailValidation = 'has-error'

        }
        else {
            $http.post('/emailCheck', {email: $scope.userProfile.email}).then(function (resp) {
                //If username is not in database, then display nothin
                if (resp.data == "false") {
                    console.log("EMAIL IS TAKEN YO");
                    $scope.emailTaken = "Email is Taken";
                    emailCheck = false;
                    $scope.userProfile.emailValidation = 'has-error';

                }
                else if (resp.data == "true") {
                    console.log("EMAIL IS FREE");
                    $scope.emailTaken = "";
                    emailCheck = true;
                    $scope.userProfile.emailValidation = '';
                    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
                    if (!re.test($scope.userProfile.email)) {
                        console.log("INVALID EMAIL");
                        $scope.emailTaken = "Please enter a valid email";
                        emailCheck = false;
                        $scope.userProfile.emailValidation = 'has-error';
                    }
                }
                else {
                    //console.log("EMAIL SOMETHING WRONG");
                    $scope.emailTaken = "Something went wrong with email";
                    emailCheck = false;
                }
                //changeButtonState();

            }, function (err) {
                //display error
                console.error('ERR', err);
            });
        }
        changeButtonState();

    };

    $scope.passwordCheck = function() {
        //If user selects New User(value=0) radio button
        changeButtonState();

        //Password Strength Check
        $scope.userProfile.passwordCheckHide = false;

        var pwdValidLength = ($scope.userProfile.password.length && $scope.userProfile.password.length >= 8 ? true : false);
        var pwdHasLetter = ($scope.userProfile.password && /[A-z]/.test($scope.userProfile.password)) ? true : false;
        var pwdHasNumber = ($scope.userProfile.password && /\d/.test($scope.userProfile.password)) ? true : false;

        //Must meet conditions to be valid password
        if( (pwdValidLength && pwdHasLetter && pwdHasNumber) || $scope.userProfile.password.length == 0 )
        {
            //console.log("PASSWORD IS VALID");
            $scope.passwordStrength = "";
            passwordCheck = true;
            $scope.userProfile.passwordValidation = '';

        }
        else  //else it is an unacceptable password
        {
            //console.log("EMAIL IS FREE");
            $scope.passwordStrength = "Letter, Number, and At Least 8 Characters";
            passwordCheck = false;
            $scope.userProfile.passwordValidation = 'has-error';

        }
        changeButtonState();

        //Submit disabled or enabled depending on if one
        //of these variables are true
    };

    $scope.passwordConfirmCheck = function() {
        changeButtonState();

        if (($scope.userProfile.passwordconfirm == $scope.userProfile.password))
        {
            //console.log("PASSWORD IS THE SAME");
            passwordConfirmCheck = true;
            $scope.passwordRepeat = "";
            $scope.userProfile.passwordRepeatValidation = '';
        }
        else
        {
            //console.log("PASSWORD DOESN'T MATCH");
            passwordConfirmCheck = false;
            $scope.passwordRepeat = "Password Doesn't Match";
            $scope.userProfile.passwordRepeatValidation = 'has-error';

        }
        changeButtonState();

    };

    function changeButtonState() {
        //console.log("USERNAME CHECK: " + usernameCheck);
        console.log("EMAIL CHECK: " + emailCheck);
        console.log("PASSWORD CHECK : " + passwordCheck);
        console.log("PASSWORD CONFIRM CHECK: " + passwordConfirmCheck);
        //console.log("FIRSTNAME CHECK: " + firstNameCheck);
        //console.log("LASTNAME CHECK: " + lastNameCheck);
        if (passwordCheck && emailCheck && passwordConfirmCheck) {
            console.log("CHANGE BUTTON DISABLE TO FALSE");
            $scope.userProfile.save_disable_state = false;
        }
        else {
            console.log("CHANGE BUTTON DISABLE TO TRUE");
            $scope.userProfile.save_disable_state = true;
        }
    }




});



app.controller('UserResetPassController', function($scope, $http) {


    var passwordCheck = false;
    var passwordConfirmCheck = false;
    var passwordStrength ="";
    var passwordRepeat="";
    $scope.userFormReset = {
    };
    $scope.userFormReset.buttonDisableState = true;

    //The passwordCheck grabs information from the radiobutton on login.html
    $scope.passwordResetCheck = function() {
        //If user selects New User(value=0) radio button
        //Password Strength Check
        var pwdValidLength = ($scope.userFormReset.password.length && $scope.userFormReset.password.length >= 8 ? true : false);
        var pwdHasLetter = ($scope.userFormReset.password && /[A-z]/.test($scope.userFormReset.password)) ? true : false;
        var pwdHasNumber = ($scope.userFormReset.password && /\d/.test($scope.userFormReset.password)) ? true : false;

        //Must meet conditions to be valid password
        if( (pwdValidLength && pwdHasLetter && pwdHasNumber) || $scope.userFormReset.password.length == 0 )
        {
            //console.log("PASSWORD IS VALID");
            $scope.passwordStrength = "";
            passwordCheck = true;
            $scope.userFormReset.passwordValidation = '';

        }
        else  //else it is an unacceptable password
        {
            //console.log("EMAIL IS FREE");
            $scope.passwordStrength = "Letter, Number, and At Least 8 Characters";
            passwordCheck = false;
            $scope.userFormReset.passwordValidation = 'has-error';

        }
        changeButtonState();

        //Submit disabled or enabled depending on if one
        //of these variables are true
    };

    $scope.passwordResetConfirmCheck = function() {
        console.log("CHECK CONFIRMATION");
        console.log("PASSWORD : " + $scope.userFormReset.password.length);
        console.log("PASSWORD CONFIRM: " + $scope.userFormReset.passwordconfirm.length);
        if (($scope.userFormReset.passwordconfirm.length === $scope.userFormReset.password.length )  && ($scope.userFormReset.passwordconfirm === $scope.userFormReset.password) )
        {
            //console.log("PASSWORD IS THE SAME");
            passwordConfirmCheck = true;
            $scope.passwordRepeat = "";
            $scope.userFormReset.passwordRepeatValidation = '';
        }
        else
        {
            //console.log("PASSWORD DOESN'T MATCH");
            passwordConfirmCheck = false;
            $scope.passwordRepeat = "Password Doesn't Match";
            $scope.userFormReset.passwordRepeatValidation = 'has-error';

        }
        changeButtonState();

    };

    function changeButtonState() {
        if ( passwordCheck && passwordConfirmCheck ) {
            console.log("CHANGE BUTTON DISABLE TO FALSE");
            $scope.userFormReset.buttonDisableState = false;
        }
        else {
            console.log("CHANGE BUTTON DISABLE TO TRUE");
            $scope.userFormReset.buttonDisableState = true;
        }
    }

});
