import { Button,  IconButton, makeStyles, TextField, Typography } from '@material-ui/core';
import React from 'react'
import Edit from "@material-ui/icons/Edit";


/* Type def */
type TypeProps = {
    handleSave:(value:string,field:string,updated:()=>void)=>void;
    label:string,
    error:string,
    type:string,
    name:string,
    value:any
}


function EditableTextView({handleSave,label,error,type,name,value}:TypeProps) {
    
    /* States */ 
    const [editMode,setEditMode] = React.useState<boolean>(false);
    const [text,setText] = React.useState<string>(null!);


    /* Send data to parent component */
    const saveData = () => {
        handleSave(text,name,()=>{
            setEditMode(false);
        });
        
    }

    /* Styles */
    const classes = useStyle();

    /* Select element */
    const selectView = (
        <select className={classes.select} defaultValue={value} onChange={(e)=>setText(e.target.value)}>
            <option value="Select">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
        </select>
    );

    return (
        <div className={classes.container}>
            <div>
                <Typography className={classes.label} variant="body1">{label}</Typography>


                {!editMode ?
                    (<Typography variant="subtitle2" >{value}</Typography>)
                    :
                    (
                    /* Show only if user clicked on edit icon */    
                    <div className={classes.editField}>

                            {/* Check element type is input field or select */}
                            {type === 'select' ? selectView
                                : (
                                    <div>
                                        <TextField
                                            onChange={(e) => setText(e.target.value)}
                                            size="small"
                                            className={classes.inputField}
                                            type={type}
                                            name={name}
                                            placeholder={value && value.toString()}
                                            error={error ? true : false}
                                            variant="outlined" />

                                        {/* Error Text */}
                                        {error && (<p className={classes.errorText}>*{error}</p>) }
                                    </div>
                                )}

                        

                        <div className={classes.btns}>
                            <Button size="small" 
                                onClick={saveData} 
                                className={classes.button1} 
                                variant="contained" 
                                color="primary">Save</Button>

                                {/* Button for cancel editing */}
                            <Button size="small" onClick={()=>setEditMode(false)}>Cancel</Button>
                        </div>
                    </div>
                    )}
            </div>

            <div>

                {/* Open and close editing fields */}
                <IconButton onClick={()=>setEditMode(!editMode)}>
                    <Edit fontSize="small" color="primary"></Edit>
                </IconButton>
            </div>
    
        </div>
        
    )
}


const useStyle = makeStyles({
    container:{
        margin:'10px 0',
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
    },

    inputField:{
        
    },
    errorText:{
        color:'red',
        fontSize:12,
        paddingTop:5,
    },
    editField:{
        display:'flex',
        flexDirection:'column',
    },
    btns:{
        padding:'5px 0 ',
    },
    button1:{
        margin:5,
    },
    select:{
       fontSize:16,
       height:30, 
    },
    label:{
        fontWeight:'bold',
    }
});


export default EditableTextView;
