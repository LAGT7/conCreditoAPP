const {Schema, model} = require('mongoose');
const bcrypt= require('bcryptjs');
//
const UserSchema= new Schema({
    numPromotor:{type:Number, required:true, unique:true}, 
    rfc:{type:String, required:true},
    nombre:{type: String,required: true},
    evaluador:{type:Boolean, required:true, default: true},
     
 });
 //encriptar contraseña
 /*PromotorSchema.methods.encrypPassword= async rfc =>{
    const salt= await bcrypt.genSalt(10);
    return await bcrypt.hash(rfc,salt);
 };
 
 PromotorSchema.methods.matchPassword= function(rfc){
     return await bcrypt.compare(rfc, this.rfc);
 };
 */
 UserSchema.methods.encryptPassword= async rfc =>{
    const salt= await bcrypt.genSalt(10);
    return await bcrypt.hash(rfc,salt);
 };
 UserSchema.methods.matchPassword= async function(rfc){
    return await bcrypt.compare(rfc, this.rfc)};
 
 module.exports = model('User',UserSchema);