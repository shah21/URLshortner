/* Custom Input Field component */

import { makeStyles, TextField, Typography } from '@material-ui/core';
import React from 'react'


type TypeProps = {
    handleChange:(e:InputType)=>void;
    label:string,
    error:string,
    type:string,
    name:string
}

function InputField({handleChange,label,error,type,name}:TypeProps) {
    
    const classes = useStyle(); 

    return (
        <div className={classes.container}>
            <TextField 
                size="small"
                onChange={(e)=>handleChange(e)}
                className={classes.inputField} 
                label={label} 
                type={type} 
                name={name}
                error={error ? true : false} 
                variant="outlined" />

            {error && (<Typography className={classes.errorText}>{error}</Typography>) }
        </div>
        
    )
}


const useStyle = makeStyles({
    container:{
        margin:'10px 0',
    },

    inputField:{
        width:'100%',
        height:30,
    },
    errorText:{
        color:'red',
        fontSize:12,
        padding:'10px 0 0',
    }
});


export default InputField;
