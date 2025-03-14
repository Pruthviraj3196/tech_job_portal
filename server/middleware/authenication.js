require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecreteKey = process.env.JWTSECREATEKEY;
const userModel = require("../model/user");

const validatorAuth = async (req,res,next) => {

    const header = req.headers;

    try {
         jwt.verify(header.authorization, jwtSecreteKey);

    } catch (error) {
        return res.json({
            message: "unathorized User Token, Please SignUp"
        })
    }

    const tokenData = jwt.decode(header.authorization);

    const userId = tokenData.userId;
    const user = await userModel.findById(userId);

    if(!user){
        req.json({
            message: "unathorized User, Please SignUp"
        })
    }

    next();
};

module.exports = validatorAuth;
