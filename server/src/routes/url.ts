/* Url - Protected routes */

import { Router } from "express";
import { body } from "express-validator";
import isAuth from "../middlewares/is-auth"


import Url from '../models/url';
import { deleteUrl, getUrl, getUrls, postAddUrl } from "../controllers/url";

const router = Router();
const regex = new RegExp("((http|https)://)(www.)?"
+ "[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]" 
+ "{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)");

router.get('/',isAuth,getUrls);
router.post('/addUrl',[
    body('url').custom((value, { req }) => {
        if(!regex.test(value)){
            return Promise.reject('Invalid Url');
        }
        return true;
    }),
],isAuth,postAddUrl);

router.delete('/delete/:id',isAuth,deleteUrl);

export default router;