/* Schema or model of Url data */


export default class Url{
    _id:string;
    originalUrl:string;
    shortedUrl:string;
    createdAt:number;
    userId:string;

    constructor(_id:string,originalUrl:string,shortedUrl:string,createdAt:number, userId:string){
        this._id = _id;
        this.originalUrl = originalUrl;
        this.shortedUrl = shortedUrl;
        this.createdAt = createdAt;
        this.userId = userId;
    } 
}