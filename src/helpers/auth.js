const helpers= {};
helpers.isAuthenticated=(req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error_msg','No estás autorizado, por favor inicia sesión');
    res.redirect('/users/signin');
}
module.exports = helpers;