import { Button, CircularProgress, Container, TextField, Typography } from "@material-ui/core";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";

import axios from "../../axios/config";
import endpoints from "../../axios/endpoints";
import CustomTable from "../../components/CustomTable/CustomTable";
import InputField from "../../components/Form/InputField";
import { FlashContext, TokenContext } from "../../contexts/context";
import Url from "../../models/url";
import isAuth from "../../utils/isAuth";
import { useStyle } from "./styles";



const addUrl = async (userToken:UserToken,body:object) => {
    try {
        const isAuthourized = await isAuth(userToken.accessToken,userToken.refreshToken);
        if (isAuthourized && isAuthourized.isVerified) {
            const response = await axios.post(endpoints.addUrl,body, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${isAuthourized.accessToken}`,
                }
            });
            if(response){
                return response.data;
            }
        }
    } catch (err) {
        throw err;
    }
}


const getUrls = async (userToken:UserToken) => {
    try {
        const isAuthourized = await isAuth(userToken.accessToken,userToken.refreshToken);
        if (isAuthourized && isAuthourized.isVerified) {
            const response = await axios.get(endpoints.getUrls, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${isAuthourized.accessToken}`,
                }
            });
            if(response){
                return response.data;
            }
        }
    } catch (err) {
        throw err;
    }
}


const deleteUrl = async (userToken:UserToken,id:string) => {
    try {
        const isAuthourized = await isAuth(userToken.accessToken,userToken.refreshToken);
        if (isAuthourized && isAuthourized.isVerified) {
            const response = await axios.delete(endpoints.deleteUrl+`/${id}`, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${isAuthourized.accessToken}`,
                }
            });
            if(response){
                return response.data;
            }
        }
    } catch (err) {
        throw err;
    }
}


/* For clear all cookies */
const removeCookies = () =>{
    return new Promise((resolve,reject)=>{
        Object.keys(Cookies.get()).forEach(function (cookie) {
            Cookies.remove(cookie);
            if(Object.keys(Cookies.get()).length === 0){
                resolve(true);
            }
        });
    })
    
}

function Home() {
  const [url, setUrl] = useState<string>(null!);
  const [urlError, setUrlError] = useState<string>(null!);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isAdding, setAdding] = React.useState<boolean>(false);
  const [urls, setUrls] = useState<Url[]>([]);

  const { token,setToken } = useContext(TokenContext);
  const { setFlash } = React.useContext(FlashContext);

  useEffect(() => {
    async function promiseFunc() {
      try {
        setLoading(true);
        const response = await getUrls(token);
        if (response) {
          setUrls(response.urls);
          console.log(response.urls);
        }
        setLoading(false);
      } catch (err) {
        throw err;
      }
    }

    promiseFunc();
  }, [token]);

  const handleChange = (e: InputType) => {
    setUrl(e.target.value);
  };

  const handleShrink = async () => {
    const regex = new RegExp(
      "((http|https)://)(www.)?" +
        "[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]" +
        "{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)"
    );

    try {
      if (url) {
        setAdding(true);
        if (regex.test(url)) {
          const response = await addUrl(token, { url: url });
          if (response) {
            setUrls((prev) => [...prev, response.url]);
            setFlash({ message: "Url added", type: "success" });
          }
        } else {
          setUrlError("Not a valid url");
        }
        setAdding(false);
      }
    } catch (err) {
      if (err.response) {
        const errResponseData = err.response.data;
        setFlash({ message: errResponseData.message, type: "error" });
      } else {
        setFlash({ message: err.message, type: "error" });
      }
      setAdding(false);
      return;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteUrl(token, id);
      if (response) {
        setUrls((prev) =>
          prev.filter((x) => {
            return x._id != id;
          })
        );
        setFlash({ message: "Url deleted", type: "success" });
      }
    } catch (err) {
      if (err.response) {
        const errResponseData = err.response.data;
        setFlash({ message: errResponseData.message, type: "error" });
      } else {
        setFlash({ message: err.message, type: "error" });
      }
      setAdding(false);
      return;
    }
  };

  /* Handle logout functionality */
  const handleLogout = () => {
    removeCookies().then((result) => {
      if (result) {
        setToken(null!);
        window.location.href = "/";
      }
    });
  };

  /* Styles */
  const classes = useStyle();

  return (
    <div className={classes.homePage}>
      <Container maxWidth="md" className={classes.container}>
        <Typography variant="h4" className={classes.headerText}>
          URLS
        </Typography>

        <div className={classes.form}>
          <InputField
            handleChange={handleChange}
            label="URL"
            name="url"
            error={urlError}
            type="url"
          />

          <Button
            className={classes.btn}
            variant="contained"
            color="primary"
            onClick={handleShrink}
          >
            Shrink
            {isAdding && (
              <CircularProgress size={20} className={classes.progress} />
            )}
          </Button>
        </div>

        <div className={classes.list}>
          {isLoading && urls.length === 0 && <CircularProgress />}
          {urls.length > 0 && (
            <CustomTable handleDelete={handleDelete} urls={urls} />
          )}
        </div>

        <Button
          className={classes.btnLogout}
          variant="contained"
          color="inherit"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Container>
    </div>
  );
}



export default Home;
