const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../libraries/jwt');
const SECRET = 'veryStrongSecretDge'

// check if the user exist
// exports.findByUsername = (username) => User.findOne({username});

exports.findByEmail = (email) => User.findOne({email}); 


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

exports.login = async (email, password) => {
    // user exist
    const user = await this.findByEmail(email);

    if(!user) {
        throw new Error('Invalid email or password!');
    }

    // valid password
    const isValid = await bcrypt.compare(user.password, password);
    
    if(!isValid) {
        throw new Error('Invalid email or password!');
    }

    // generate token
    const payload = {
        _id: user._id,
        email,
        user: user.username
    }
    
    const token = await jwt.sign(payload, SECRET);
    
    return token;
}