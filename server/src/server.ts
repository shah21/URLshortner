import express,{Request,Response,NextFunction} from "express";
import cors from "cors";
import 'dotenv/config'
import HttpException from "./utils/HttpException";
import { connectDb } from "./helpers/database";

import AuthRouter from './routes/auth';
import UrlRouter from './routes/url';
import PublicRouter from './routes/public';


const app = express();

/* Midddlewares */
app.use(cors())
app.use(express.json());

/* Cors free requests */
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','*');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
});

/* Routes */
app.use('/api/auth',AuthRouter);
app.use('/api/urls',UrlRouter);
app.use('/',PublicRouter);


/* Error handler middleware */
app.use((error:HttpException,req:Request,res:Response,next:NextFunction)=>{
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message:message,errors:data});
  }); 
  


connectDb(()=>{
    /* Start server after DB connection established */
    console.log('Database connection successfull!');
    app.listen(process.env.PORT || 3030,()=>{
        console.log('listening...')
    });
})

