const prospectosCtrl = {};
const Prospecto= require('../models/Prospectos');
//Creacion Prospectos

prospectosCtrl.renderForm = (req, res) => {
    res.render('prospectos/nuevoProspecto');
};
prospectosCtrl.crearNuevoProsp = async (req, res) => {
    const {nombres,apPat,apMat,telefono,rfc,calle,numCasa,colonia,cp,docs}=req.body;
    const newProsp= new Prospecto({nombres,apPat,apMat,telefono,rfc,calle,numCasa,colonia,cp,docs});
    newProsp.promotor= req.user.numPromotor;
    await newProsp.save();

    req.flash('success_msg','Prospecto creado de forma correcta');
    res.redirect('/prospectos');
};

//Obtener todos los prospectos

prospectosCtrl.renderAllProsp = async (req, res) => {
   const prospectos= await Prospecto.find().lean();
   res.render('prospectos/todos-prospectos', {prospectos});
};
prospectosCtrl.renderEvalProsp = async (req, res) => {
    const prospectos= await Prospecto.find().lean();
    res.render('prospectos/prospectos-eval', {prospectos});
 };
prospectosCtrl.renderPrivProsp = async (req, res) => {
    const prospectos= await Prospecto.find({promotor: req.user.numPromotor}).lean();
    res.render('prospectos/prospectos-personales', {prospectos});
 };
//info
prospectosCtrl.renderInfoForm = async (req, res) => {
    const prospecto= await Prospecto.findById(req.params.id).lean();
    res.render('prospectos/info',{prospecto});
};
//editar
prospectosCtrl.renderEditForm = async (req, res) => {
    const prospecto= await Prospecto.findById(req.params.id).lean();
    console.table(prospecto);
    res.render('prospectos/edit',{prospecto});
};
prospectosCtrl.editarProsp = async (req, res) => {
    const { status, observaciones}= req.body;
    
    await Prospecto.findByIdAndUpdate(req.params.id,{status,observaciones});
    req.flash('success_msg','Prospecto evaluado de forma correcta');
    res.redirect('/prospectos');
};

//borrar
prospectosCtrl.eliminarProsp = async (req, res) => {
   await Prospecto.findByIdAndDelete(req.params.id);
   req.flash('success_msg','Prospecto eliminado');
   res.redirect('/prospectos');
};

module.exports = prospectosCtrl;