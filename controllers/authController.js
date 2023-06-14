const router = require('express').Router();

const authService = require('../services/authService');



router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const token = await authService.login(email, password);
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    await authService.register(username, email, password, confirmPassword);

    //! check redirect to ?
    res.redirect('/');
});

module.exports = router;