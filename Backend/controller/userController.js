const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = "Kishan@1156";

exports.registerUser = async(req ,res) =>{
    try {
        const {userName , email , password , role} = req.body;
        console.log(req.body);
        const existingUser = await User.find({email});
        if(existingUser){
            return res.status(404).json({msg:"User is Already Exists"});
        }
        const newUser = new User({
            userName,
            email,
            password,
            role
        });
        await newUser.save();
        res.status(201).json({
            message: 'User registered successfully!',
            user: {
              userName: newUser.userName,
              email: newUser.email,
              role: newUser.role
            }
          });
    } catch (error) {
      return   res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

exports.loginUser = async(req,res)=>{
    try {
          const{email , password} = req.body;
          const user = await User.findOne({email});
          if(!user){
            return  res.status(400).json({ message: 'Invalid email or password' });
          }
          const isMatch = await bcrypt.compare(password, user.password);
          if(!isMatch){
            return  res.status(400).json({ message: 'Invalid email or password' });
          }
          const token = jwt.sing({userId : user._id , role: user.role}, secret,{expiresIn: '1h'});
          res.status(200).json({
            message: 'Login successful',
            token,
            role:user.role
        });
    } catch (error) {
        return   res.status(500).json({ message: 'Error registering user', error: error.message  });

    }
};
