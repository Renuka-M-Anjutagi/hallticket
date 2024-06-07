import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from  'jsonwebtoken';

export const registerController = async(req, res) =>{
try {
    
    const {name, email, password, phone, address} = req.body;
   if(!name) return res.send({error: 'Name is missing'});
   if(!email) return res.send({error: 'email is missing'});
   if(!password) return res.send({error: 'password is missing'});
   if(!phone) return res.send({error: 'phone is missing'});
   if(!address) return res.send({error: 'address is missing'});

   const existinguser = await userModel.findOne({email});
   if(existinguser) 
   {
     return res.status(200).send(
        {
            success: false,
            message: 'Already registred user, please login'

        }
     )
   }

   const hashedPassword = await hashPassword(password);
   const user = await new userModel({name, email, phone, address, password: hashedPassword}).save();
   res.status(201).send({
    success: true,
    message: 'User regisrted success',
    user
   })
} catch (error) {
    console.log(error);

    res.status(500).send({
        success: false,
        message: 'Error in Regirestration',
        error
    })
}
}

export const loginController = async(req, res) =>{
try {
    const {email, password} = req.body;

    if(!email) return res.status(404).send({error: 'email is missing'});
    if(!password) return  res.status(404).send({error: 'Password is missing'});
//get user
const user = await userModel.findOne({email});

if(!user) return  res.status(404).send({ success: false, message: 'Email is not registered'});

    const match = await comparePassword(password, user.password)

if(!match) return  res.status(200).send({ success: false, message: 'User or Passwod is invalid'});
// token create
const token = JWT.sign({_id: user._id}, process.env.JWT_SECRET, {
    expiresIn: "1d"
})

res.status(200).send({
    success: true,
    message: 'login Success',
    user:{name : user.name, email: user.email, phone: user.phone, address:user.address},
    token
})
} catch (error) {
    console.log('error', error);
    res.status(500).send({
        success: false,
        message: 'Error in login',
        error
    })
}
}

export const testController = (req, res) =>
    {
        try {
            res.send('Protected - route');
        } catch (error) {
            console.log(error);
            res.send({error})
        }
      
    }
    
// Log out 

export const logoutController = (req, res) =>{
    try {
        // clear the token cookie
        res.clearCookie('token');

        // return a success message
        res.json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

// export default {registerController};
