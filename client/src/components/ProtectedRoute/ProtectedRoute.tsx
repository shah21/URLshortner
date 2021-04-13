/*
Component to check authentication
.then render Components according to the result
*/

import React from "react";
import { Route, Redirect, RouteProps} from "react-router-dom";


export interface ProtectedRouteProps extends RouteProps {
    token: UserToken;
    path: string;
    authenticationPath: string;
  }
  
  export const ProtectedRoute: React.FC<ProtectedRouteProps> = props => {

    let redirectPath = '';


    if (!props.token.accessToken && !props.token.refreshToken) {
      redirectPath = props.authenticationPath;
    }
  
    if (redirectPath) {
      const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
      return <Route {...props} component={renderComponent}/>;
    } else {
      return <Route {...props} />;
    }
  };

export default ProtectedRoute;