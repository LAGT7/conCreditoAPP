const passport= require('passport');
const LocalStrategy= require('passport-local').Strategy;
const User=require('../models/User');


passport.use(new LocalStrategy({
    usernameField:'numPromotor',
    passwordField: 'rfc'
},async (numPromotor,rfc,done)=>{
    const user= await User.findOne({numPromotor})
    if(!user){
        return done(null,false,{message: 'Usuario no encontrado'});
    }else {
        const match= await user.matchPassword(rfc);
        if(match){
            return done(null,user);
        } else {
            return done(null,false,{message: 'contraseña incorrecta'});
        }
    }
}));
passport.serializeUser((user,done)=>{
    done(null, user.id);
});
passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=> {
        done(err,user);
    }).lean()
});