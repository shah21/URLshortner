/* Schema or model of User data */

import { getDb } from "../helpers/database";
import {ObjectId } from'mongodb';


export default class Url{
    originalUrl:string;
    shortedUrl:string;
    createdAt:number;
    userId:ObjectId;

    constructor(originalUrl:string,shortedUrl:string,createdAt:number, userId:string){
        this.originalUrl = originalUrl;
        this.shortedUrl = shortedUrl;
        this.createdAt = createdAt;
        this.userId = new ObjectId(userId);
    } 

    save(){
        return getDb().collection('urls').insertOne(this);
    }

    static findByUserId(userId:string){
        return getDb().collection('urls').find({userId: new ObjectId(userId)}).toArray();
    }

    static findByUrl(url:string){
        return getDb().collection('urls').findOne({shortedUrl:url});
    }


    static findById(id:string){
        return getDb().collection('urls').findOne({_id:new ObjectId(id)});
    }

    static updateById(id:string,values:object){
        return getDb().collection('urls').findOneAndUpdate({_id:new ObjectId(id)},{$set:values},{returnOriginal:false});
    }
    
}