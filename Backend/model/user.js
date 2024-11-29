const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// UserSchema
const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address'],
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    role: {
        type: String,
        enum: ['admin', 'author', 'reader'],
        default: 'reader'
      },
      profilePicture: {
        type: String, 
      },
      bio: {
        type: String,
        maxLength: 500
      },
     
});

userSchema.pre('save', async function(next){
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  const User = mongoose.model('User', userSchema);
  module.exports = User;