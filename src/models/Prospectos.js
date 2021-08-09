const {Schema, model} = require('mongoose');
 
const ProspectoSchema= new Schema({
     nombres:{type: String,required: true},
     apPat:{type:String, required:true},
     apMat:{type:String, required:false},
     calle:{type:String, required:true},
     numCasa:{type:String, required:true},
     colonia:{type:String, required:true},
     cp:{type:Number, required:true},
     telefono:{type:Number, required:true},
     rfc:{type:String, required:true},
     docs:[],
     status:{type:String, required:true, default:'Enviado'},
     observaciones:{type:String, required:false, default:'Sin observaciones por el momento'},
     promotor:{type:String , require:true}
 });
 
 module.exports = model('Prospecto',ProspectoSchema);