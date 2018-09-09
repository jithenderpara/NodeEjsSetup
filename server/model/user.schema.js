const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

/**
 * Our User model.
 *
 * This is how we create, edit, delete, and retrieve user accounts via MongoDB.
 */
module.exports.User = mongoose.model('User', new Schema({
  id:           ObjectId,
  firstName:    { type: String, required: '{PATH} is required.' },
  lastName:     { type: String, required: '{PATH} is required.' },
  email:        { type: String, required: '{PATH} is required.', unique: true },
  password:     { type: String, required: '{PATH} is required.' },
  isFirstlogin: { type: Boolean, default:false },
  acessgroup:   { type: Array, required: '{PATH} is required.' },
  lastlogin:    { type: Date, default:null},
  isactive:     { type: Boolean,default:true},
  createdDate:  { type: Date, default:new Date() },
  createdBy:    { type: String, required: '{PATH} is required.' }
}));

