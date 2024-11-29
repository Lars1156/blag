const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const secret = "Kishan@1156";

const registerUser = async(req,res)=>{
  const {userName , email , password , role , bio , } = req.body;
  try {

        if(!userName|| !email || !password || !role || !bio){
          return res.status(400).json({msg:"Enter the all Reaquired fields"});
        }
         const existingUser = await User.findOne({email});
         if(existingUser){
           return res.status(400).json({msg:"User is Already Existing "});
         }
        //  const image = req.file ? req.file[0].path : null;
        const imagefile = req.files?.image?.[0]?.filename
   
         const newUser = {
           userName , 
           email,
           password,
           role,
           bio,
           image : imagefile
         }
         const addData = await User(newUser);
         await addData.save();
         return res.status(200).json({ msg: 'User successfully created' });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ msg: 'Server error, user not added' });
    }
};

const loginUser = async(req,res)=>{
  const{email , password}= req.body;
  console.log( req.body);
       try {
        const user = await User.findOne({ email });
        console.log(user);
        
        if (!user) {
          return res.status(400).json({ message: 'Invalid credentials' });
        }
    
        // Compare entered password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch)
        
        if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' });
        }
    
        // Generate JWT Token
        const token = jwt.sign(
          { userId: user._id },
          secret,
          { expiresIn: '10h' }  
        );
    
        // Send the response with token and user role
        res.status(200).json({
          token,
          role: user.role,  
        });
       } catch (error) {
        
       }
};

module.exports = {registerUser , loginUser}