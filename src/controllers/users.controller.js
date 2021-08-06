const usrCtrl = {};
const User= require('../models/User');
const passport= require('passport');

usrCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};
usrCtrl.signup = async (req, res) => {
    const errors = [];
    const { nombre, numPromotor, rfc } = req.body;

    if (rfc.length < 4) {
        errors.push({ text: 'Las contraseñas deben tener al menos 4 caracteres' });
    }
    if (errors.length > 0) {
        res.render('users/signup', {
            errors,nombre,numPromotor,rfc
        });
    } else {
      const numUser= await User.findOne({numPromotor: numPromotor});
      if(numUser){
          req.flash('error_msg', 'Número de empleado ya existe');
          res.redirect('/users/signup');
      } else {
          const newUser=new User({nombre,numPromotor,rfc});
          newUser.rfc= await newUser.encryptPassword(rfc);
          await newUser.save();
          req.flash('success_msg', 'Promotor creado');
          res.redirect('/users/signin');
      }
    }
};

usrCtrl.renderSigninForm = (req, res) => {
    res.render('users/signin');
};
usrCtrl.signin = passport.authenticate('local',{
    failureRedirect: '/users/signin',
    successRedirect: '/prospectos',
    failureFlash: true
});

usrCtrl.logout = (req, res) => {
   req.logout();
   req.flash('success_msg','Tu sesión ha sido cerrada');
   res.redirect('/users/signin');
};

module.exports = usrCtrl