/* Custom hook for token */


import {useState} from "react";
import Cookie from "js-cookie";

/* Return type of function */
interface FuncType {
    token:UserToken;
    setToken:(accessToken:UserToken)=>void;
}


export function useToken():FuncType{

    /* Get token from cookies */
    const getToken = ()=>{
        return {
            accessToken:Cookie.get('accessToken'),
            refreshToken:Cookie.get('refreshToken'),
        }
    };

    /* State */
    const [userToken,setToken] = useState<UserToken>(getToken() as UserToken);

    /* Save token to cookie */
    const saveToken = (userToken:UserToken)=>{

        if(userToken){

            const accessToken = userToken.accessToken;
            const refreshToken = userToken.refreshToken;

            Cookie.set('accessToken',accessToken,{
                expires: new Date(new Date().getTime() + 1 * 60 * 1000)
            });

            Cookie.set('refreshToken',refreshToken,{
                expires: new Date().setDate(new Date().getDate() + 7)
            });

            setToken({
                accessToken,
                refreshToken,
            });
        }
    };

    /* Return state,setState */
    return{
        setToken:saveToken,
        token:userToken
    }

}

