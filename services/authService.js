const User = require('../models/User');
const bcrypt = require('bcrypt');

// check if the user exist
// exports.findByUsername = (username) => User.findOne({username}) 

exports.register = async (username, email, password, confirmPassword) => {

    //validate password
    if (password !== confirmPassword) {
        throw new Error('Password don`t match!'); 
    }

    // check if the user exist
    // const existingUser = await this.findByUsername(username);
    // if (existingUser) {
    //     throw new Error('This username allready exist!');
    // }


    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ username, email, password: hashedPassword });
    
};

exports.login = () => {

}