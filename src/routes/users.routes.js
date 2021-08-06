const {Router}= require('express');
const router= Router();

const {logout,renderSignUpForm,signin,renderSigninForm,signup}= require('../controllers/users.controller');

router.get('/users/signup', renderSignUpForm);
router.post('/users/signup',signup);

//login
router.get('/users/signin', renderSigninForm);
router.post('/users/signin',signin);

router.get('/users/logout',logout);


module.exports= router;