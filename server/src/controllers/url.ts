import {Request,Response,NextFunction} from "express";
import Url from "../models/url";
import HttpException from "../utils/HttpException";
import { validationResult } from 'express-validator';


/* Get url from database and redirect to original url */
export const getUrl = async (req:Request,res:Response,next:NextFunction)=>{
    const url = req.params.url;

    try{
        const shrinkedUrl = `${req.protocol}://${req.get('host')}/${url}`
        const originalUrl = await Url.findByUrl(shrinkedUrl) as Url;
        res.redirect(originalUrl.originalUrl)
    }catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}


/* Get all urls created by user */
export const getUrls = async (req:Request,res:Response,next:NextFunction)=>{
    const userId:string = req.userId!;

    try{
        const urls = await Url.findByUserId(userId);
        res.status(200).json({messge:'success',urls:urls});
    }catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}

/* Create or add new url */
export const postAddUrl = async (req:Request,res:Response,next:NextFunction)=>{
    const userId:string = req.userId!;
    const originalUrl = req.body.url;
    const errors = validationResult(req).array();

    try{

        if(errors.length > 0){
            const error = new HttpException('Invalid Request Body');
            error.statusCode = 422;
            error.data = errors;
            throw error;
        }

        let randomString = require('crypto').randomBytes(7).toString('hex')
        const shrinkedUrl = `${req.protocol}://${req.get('host')}/${randomString}`
        const newUrl = new Url(originalUrl,shrinkedUrl,Date.now(),userId);
        await newUrl.save();
        res.status(200).json({messge:'success',url:newUrl});
    }catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}
