/* Styles for Login,Signup Components/Pages */

import { makeStyles } from "@material-ui/core";





export const useStyle = makeStyles({
    loginPage:{
        marginTop:20,
        height:500,
    },
    form:{
        marginTop:30,
        display:'flex',
        flexDirection:'column',
    },
    buttonLogin:{
        marginTop:'50px',
        width:'100%',
    },
    buttonSignup:{
        marginTop:'20px',
        width:'100%',
    },
    errorText:{
        color:'red',
        fontSize:16,
        fontWeight:'bold',
    },
    progress:{
        color:'#fff',
        padding:3,
    }
});