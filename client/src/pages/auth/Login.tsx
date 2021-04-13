import { Typography, Button, Container, CircularProgress } from '@material-ui/core';
import React from 'react'
import { useHistory } from 'react-router-dom';

import axios from "../../axios/config";
import endpoints from '../../axios/endpoints';
import InputField from '../../components/Form/InputField';
import { FlashContext, TokenContext } from '../../contexts/context';
import { useStyle } from "./styles";

/* Login api call */
const loginUser = async (credentails: object) => {

  try {
    const response = await axios.post(endpoints.login, JSON.stringify(credentails));
    return response.data;
  } catch (err) {
    throw err
  }
}


const formReducer = (state: object, event: any) => {
  return {
    ...state,
    ...event
  }
}

interface TypeProps {
  handleTabChange:(e:any,value:number)=>void
}

function Login({handleTabChange}:TypeProps) {

  /* Reducer */
  const [formData, setFormData] = React.useReducer(formReducer, {});

  /* State */
  const [errors, setErrors] = React.useState({
    email: null! as string,
    password: null! as string
  });
  const [isLoading, setLoading] = React.useState<boolean>(false);

  /*  */
  const history = useHistory();

  /* Contexts */
  const { token, setToken } = React.useContext(TokenContext);
  const { setFlash } = React.useContext(FlashContext);

  /* Handle user input */
  const handleChange = (e: InputType) => {
    setErrors({
      ...errors,
      [e.target.name]: null!
    })
    setFormData({
      [e.target.name]: e.target.value,
    });
  }


  /* Validate fields */
  const handleValidation = () => {
    let formIsValid = true;
    const newErrors = {
      email: '',
      password: ''
    };

    /* Email */
    if (!formData.email) {
      formIsValid = false;
      newErrors['email'] = "Cannot be empty";
    }

    if (typeof formData.email !== "undefined") {
      let lastAtPos = formData.email.lastIndexOf('@');
      let lastDotPos = formData.email.lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && formData.email.indexOf('@@') === -1 && lastDotPos > 2 && (formData.email.length - lastDotPos) > 2)) {
        formIsValid = false;
        newErrors["email"] = "Email is not valid";
      }
    }

    /* Password */
    if (!formData.password) {
      formIsValid = false;
      newErrors["password"] = "Cannot be empty";
    }

    setErrors({
      ...errors,
      ...newErrors,
    });
    return formIsValid;
  }

  /* Handle login */
  const handleLogin = async () => {

    if (handleValidation()) {

      setLoading(true)
      setErrors({
        email: '',
        password: ''
      });

      try {
        const responseData: any = await loginUser(formData);
        setLoading(false);
        if (responseData) {
          setToken({
            accessToken:responseData.user.accessToken,
            refreshToken:responseData.user.refreshToken,
          });
          history.push('/');
          return;
        }
       
      } catch (err) {
        if (err.response) {
          const errResponseData = err.response.data;
          setFlash({ message: errResponseData.message, type: 'error' })
        } else {
          setFlash({ message: err.message, type: 'error' })
        }
        setLoading(false);
        return;
      }

    }
  }

  /* Styles */
  const classes = useStyle();

  return (
    <div className={classes.loginPage}>

      <Container maxWidth="xs">
        <Typography variant="h4">Login</Typography>

        <div className={classes.form}>


          <InputField handleChange={handleChange} name="email" label="Email" type="text" error={errors.email} />
          <InputField handleChange={handleChange} name="password" label="Password" type="password" error={errors.password} />

          <Button
            variant="contained"
            size="medium"
            onClick={handleLogin}
            className={classes.buttonLogin}
            color="primary">
            Login
                    {isLoading && <CircularProgress className={classes.progress} color="secondary" size={20} />}
          </Button>

          <Button
            variant="outlined"
            size="medium"
            onClick={() => { handleTabChange(null!,1) }}
            className={classes.buttonSignup} >
            Register
                </Button>
        </div>
      </Container>
    </div>
  )
}



export default Login;
