import React from 'react';
import { BrowserRouter as Router,Switch,Route, Redirect } from "react-router-dom";

import './App.css';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { FlashContext, TokenContext } from './contexts/context';
import CustomizedSnackbar from './components/CustomizedSnackbar/CustomizedSnackbar';
import { useToken } from './hooks/useToken';

import Profile from "./pages/home/Home";
import SignInOutContainer from './containers/SignInOutContainer';



function App() {

  /* States */
  const {token,setToken} = useToken();
  const [flash, setFlash] = React.useState<FlashType>(null!); 
  const [open, setOpen] = React.useState<boolean>(false); 

  /* Check Flash Messages */
  React.useEffect(()=>{
    if(flash){
      setOpen(true);
    }
  },[flash])


  const handleClose = () => {
      setOpen(false);
  }
  
  

    /* app routes */
    let routes = (
      <Router>
        <Switch>
          <Route exact path="/auth" render={()=>(<SignInOutContainer/>)} />
          <ProtectedRoute exact path="/" token={token} component={Profile} authenticationPath="/auth"/>

        </Switch>
      </Router>
    );

  return (
    <div className="app">
      <FlashContext.Provider value={{ flash, setFlash }}>
      <TokenContext.Provider value={{token,setToken}}>
      {routes}
      </TokenContext.Provider>
      <CustomizedSnackbar key="snackbar" openState={open} handleClose={handleClose} mode={flash && flash.type} message={flash && flash.message} />
      </FlashContext.Provider>
    </div>
  );
}

export default App;
