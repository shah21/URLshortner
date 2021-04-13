/* Custom type declaration */


/* Input Event Type */
type InputType = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

/* Flash Message Type */
type FlashType = {
    message: string;
    type: string;
  };


type UserToken = { 
  accessToken:string,
  refreshToken:string
}
