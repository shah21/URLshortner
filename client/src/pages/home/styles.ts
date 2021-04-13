/* Styles for Home Component/Page */

import { makeStyles } from "@material-ui/core";





export const useStyle = makeStyles({
    homePage:{
        
    },
    headerText:{
        fontWeight:'bold',
    },
    container:{
        marginTop:100,
    },
    form:{
        marginTop:30,
    },
    btn:{
        marginTop:10,
        height:40,
        fontWeight:'bold',
        fontSize:16,
        textTransform:'capitalize',
    },
    list:{
        marginTop:30,
        display: 'flex',
        justifyContent: 'center'
    },
    progress:{
        color:'#fff',
        padding:5,
    },
    btnLogout:{
        position:"absolute",
        top:0,
        right:0,
        margin:30,
    }
});