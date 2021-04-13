
class User{
    email:string;
    password:string;
    signedAt:number;
    constructor(email:string,password:string,signedAt:number){
        this.email = email;
        this.password = password;
        this.signedAt = signedAt;
    } 
    
}

export default User;