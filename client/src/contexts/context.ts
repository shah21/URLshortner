/* Contexts file */

import React from "react";

/* For token  */
const tokenContextInit = {
    token:null! as UserToken,
    setToken:null as any,
}
export const TokenContext = React.createContext(tokenContextInit);

/* Flash msgs */
const flashInit = {
    flash:{
    message:undefined! as string,
    type:undefined! as string,
    },
    setFlash:null as any,
};
export const FlashContext = React.createContext(flashInit);