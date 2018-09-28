var bcrypt = require('bcrypt');

exports.isValidPassword = function (userPassword,databasePassword){	
	return bcrypt.compareSync(userPassword, databasePassword);
}

exports.createHashPassword = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}