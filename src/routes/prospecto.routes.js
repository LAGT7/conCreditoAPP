const { Router } = require('express');
const router = Router();
const { renderForm, crearNuevoProsp,
    renderAllProsp,renderEvalProsp,
    renderEditForm, editarProsp, renderPrivProsp,
    renderInfoForm,
    eliminarProsp } = require('../controllers/prospecto.controller');
const {isAuthenticated} = require('../helpers/auth');

const multer= require('multer');
const mimeTypes= require('mime-types');

const storage = multer.diskStorage({
    destination: 'src/public/docs/'
    ,
   
    filename: (req, file, cb)=> {
        cb(null, file.originalname + '-' + Date.now()+'.'+mimeTypes.extension(file.mimetype));
    }
});
   
const upload = multer({ storage: storage });
//Creación prospectos
router.get('/prospectos/nuevo', isAuthenticated,renderForm);
router.post('/prospectos/nuevo',upload.array('docs'),isAuthenticated, crearNuevoProsp);

//Obtener todos los prospectos
router.get('/prospectos', isAuthenticated,renderPrivProsp);
router.get('/prospectos/evaluacion',isAuthenticated, renderEvalProsp);
router.get('/prospectos/todos',isAuthenticated, renderAllProsp);

//Info Prospectos
router.get('/prospectos/info/:id', isAuthenticated,renderInfoForm);
//Editar Prospectos
router.get('/prospectos/editar/:id', renderEditForm);
router.put('/prospectos/editar/:id', editarProsp);
//Borrar
router.delete('/prospectos/borrar/:id', isAuthenticated,eliminarProsp);

module.exports = router;