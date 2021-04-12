import { Router } from "express";
import { body } from "express-validator";
import isAuth from "../middlewares/is-auth"

import {
  getUser,
  postLogout,
  postLogin,
  postSignup,
  postRefreshToken,
  postVerifyToken,
} from "../controllers/auth";
import User from '../models/user';

const router = Router();



router.get('/user',isAuth,getUser);

router.post('/login',postLogin);

router.post('/verifyAccessToken',postVerifyToken);

router.post('/signup',[
    body('email').isEmail().withMessage('Invalid Email').custom(async (value,{req})=>{
        const user = await User.findByEmail(value);
        if (user) {
            return Promise.reject("E-mail already exists!");
        }
    }).normalizeEmail(),
    body('password').isLength({min:6}).withMessage('Password must have atleast 6 character long'),
    body('confirm_password').isLength({min:6}).withMessage('Password must have atleast 6 character long').custom((value,{req})=>{
        
        if(value !== req.body.password){
            return Promise.reject('Passwords must be same');
        }
        return true;
    }),
],postSignup);


router.post('/refresh-token',[
    body('refreshToken','Refresh Token is missing').isEmpty(),
],postRefreshToken);


router.post('/logout',[
    body('accessToken','Access Token is missing').isEmpty(),
    body('refreshToken','Refresh Token is missing').isEmpty(),
],postLogout);


export default router;