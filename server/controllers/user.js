require("dotenv").config();
const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtSecreteKey = process.env.JWTSECREATEKEY;
 
const signUp = async (req, res) => {
try {
    
    
    const {name, email, password} = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new userModel({name, email, password: hashedPassword});

    const newlyInsertedUser = await newUser.save();

    res.json({
        message: "user singup Successfully"
    })

} catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
}
}

const login = async (req,res) => {
try {
    
    const {email, password} = req.body;

    const user = await userModel.findOne({email});
     
    if(!user){
        res.json({
            message:"Please SingUp, User Not Found"
        })
    }
     
   const payload = {
    userId: user._id,
    name: user.name
   } 

   const token = jwt.sign(payload,jwtSecreteKey);
   
 
    const ispassword = bcrypt.compareSync(password, user.password);
     console.log(ispassword)
   if(ispassword){
    return res.json({
        message: "user login successfully",
        token,
    })
   }   

    res.json({
        message: "user or Password inValid "
    })
} catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
}
}

const userController = {
    signUp,
    login,
}

module.exports = userController;