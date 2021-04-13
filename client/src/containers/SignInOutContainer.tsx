/* Signup and login container / Auth Tabs */


import React,{useContext, useState} from 'react'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import { Container, makeStyles } from '@material-ui/core';
import { TokenContext } from '../contexts/context';
import { Redirect } from 'react-router-dom';



interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

 

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const useStyle = makeStyles({
    paper:{
        width:300,
        margin:'100px auto',
    },
    tab:{
        minWidth: 150, 
        width: 150,
    }
});

function SignInOutContainer() {

    const [value, setValue] = useState(0);
    const {token} = useContext(TokenContext);

    
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
    

    const classes = useStyle();

    if (token.accessToken || token.refreshToken) {
      return (
        <Redirect to="/" />
      )
    }

    return (
      <div>
          <Paper elevation={20} className={classes.paper}>
            <Tabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
              aria-label="disabled tabs example"
            >
              <Tab className={classes.tab} label="Login" />
              <Tab className={classes.tab} label="Signup" />
            </Tabs>
            <TabPanel value={value} index={0}>
              <Login handleTabChange={handleChange}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Signup handleTabChange={handleChange}/>
            </TabPanel>
          </Paper>
      </div>
    );
}


export default SignInOutContainer;
