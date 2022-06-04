
import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import 'tachyons'

const styles={
    width: '350px',
    border: '1px solid',
    padding: '10px',
    borderRadius: '15px',
    margin: 'auto',
    marginBottom:'30px',
    boxShadow: '5px 5px #888888',
    height: '400px',
    alignItems: 'center',
    display: 'flex',
};

const PasswordChange=({ pageChange, changePassword })=>{
    const [values, setValues] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        error: false,
        errorMessage: '',
      });
    
      const handleChange = (prop,event) => {
        setValues(val => ({ ...val, [prop]: event.target.value }));
      };

    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
      const tryChangePassword = () => {
        if(values.newPassword === values.confirmPassword) {
          changePassword({
            oldPassword: values.oldPassword,
            newPassword: values.newPassword
          });
          setValues(val =>({...val, error:false, errorMessage: '' }))
        } else {
          setValues(val => ({...val, errorMessage: 'Confirm password did not matched', error: true}))
        }
      }

    return(
          <Box
      component="form"
      style={styles}
      noValidate
      autoComplete="off"
      className=' justify-center  mt6'
    > 
    <Stack  spacing={2} direction="column" className="justify-center  items-center pa3 ">
      <h3>Change Password</h3>
    <TextField
        value={values.oldPassword}
        onChange={(e)=>handleChange('oldPassword',e)}
        sx={{'& input': {height: '50px'}}}
          id="Old-password-input"
          label="Old password"
          type="password"
          size="normal"
          autoComplete="password"
        />
         <TextField
        value={values.newPassword}
        onChange={(e)=>handleChange('newPassword',e)}
        sx={{'& input': {height: '50px'}}}
          id="New-password-new"
          label="New password"
          type="password"
          size="normal"
        />
          <TextField
          value={values.confirmPassword}
          error={values.error}
          helperText={values.errorMessage}
          onChange={(e)=>handleChange('confirmPassword',e)}
          sx={{'& input': {height: '50px'}}}
          id="New-password-confirm"
          label="Confirm password"
          type="password"
          size="normal"
        />

<Button variant="contained" onClick={tryChangePassword}  color="success">
        Confirm
      </Button>
      <Button variant="contained" color="secondary" onClick={pageChange}>
       Back To Login
      </Button>
        </Stack>

        </Box>
        

       
    );
}

export default PasswordChange;