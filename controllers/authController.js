const router = require('express').Router();

const authService = require('../services/authService');

const { isAuthorized } = require('../middlewares/authMiddleware')

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // receive token from service
        const token = await authService.login(email, password);

        // add token to cookie
        res.cookie('auth', token);

        res.redirect('/');

    } catch (error) {
        return res.status(404).render('auth/login', { error: error.message })
    }
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    try {
        await authService.register(username, email, password, confirmPassword);

    } catch (error) {

    }

    //! check redirect to ?
    res.redirect('/');
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
})

module.exports = router;