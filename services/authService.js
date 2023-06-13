const User = require('../models/User');

exports.register = async (username, email, password, confirmPassword) => {

    //validate password
    if (password !== confirmPassword) {
        throw new Error('Password don`t match!')
    }

    await User.create({ username, email, password });
};

exports.login = () => {

}