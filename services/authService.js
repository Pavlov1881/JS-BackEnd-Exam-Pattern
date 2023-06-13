const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = async (username, email, password, confirmPassword) => {

    //validate password
    if (password !== confirmPassword) {
        throw new Error('Password don`t match!'); 
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ username, email, password: hashedPassword });
    
};

exports.login = () => {

}