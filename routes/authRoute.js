import express from 'express';
import { registerController, loginController, testController,logoutController } from "../controllers/authController.js";
import {requireSignIn, isAdmin} from '../middleware/authMiddleware.js';
import { hallCreateController ,hallBookingController,getBookingdetails,getCustomerdetails,getdetails} from '../controllers/hallCreateController.js';
 const router = express.Router();
 
 router.post('/register', registerController);

 router.post('/login', loginController);

 router.get('/test' ,requireSignIn , isAdmin,   testController);
 
 router.post('/logout', logoutController);

 router.post('/createroom', hallCreateController);

 router.post('/bookinghall', hallBookingController);
 router.get('/bookinghall/:id', getBookingdetails);

 router.get('/getcustomer/:id', getCustomerdetails);

 router.get('/getcustomerbookhall/:id', getdetails);
 
 export default router;
