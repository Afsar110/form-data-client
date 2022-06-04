import React, {useState} from "react";
import Loginpage from './Loginpage';
import PasswordChange from "./PasswordChange";


const AuthPage=({login, changePassword })=>{
    const [curentPage,setCurrentPage] = useState('login');
    return(
        <>
            {curentPage === 'login' ? <Loginpage login={login} pageChange={()=> setCurrentPage('passwordChange')}/> : <PasswordChange changePassword={changePassword} pageChange={()=> setCurrentPage('login')}/>}
        </>
    );
}

export default AuthPage;