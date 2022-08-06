import React,{ useState, useEffect} from 'react';
import './App.css';
import 'tachyons';
import Table from './components/Table';
import SearchBox from './components/SearchBox';
import rows from './tableData'
import AuthPage from './pages/AuthPage';
import { Button, Stack } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import MRActionModal from './components/MRActionModal';
import api from './action/api';
import {app, auth} from './firebase';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updatePassword } from 'firebase/auth';
import Loginpage from './pages/Loginpage';
import PasswordChange from './pages/PasswordChange';

function App() {
  const [searchText, setSearchText] = useState("");
  const [loginLoading, setLoginLoading] = useState(false)
  const [tableData, setTableData] = useState([]);
  const [tableCount, setTableCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user,setUser] = useState({});
  const[changePasswordPage, setChangePasswordPage] = useState(false);

  useEffect(()=>{
    setLoginLoading(true);
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
        setLoginLoading(false);
      } else {
        setIsLoggedIn(false);
        setLoginLoading(false);
        setUser({});
      }
    }, (error)=>{
      console.error(error);
        setIsLoggedIn(false);
        setLoginLoading(false);
        setUser({});
    });
  },[])
  const handleLogout = () => {
    signOut(auth)
  };
  const handleDelete=(selectedRow)=> {
    console.log(selectedRow)

  }

  const searchClicked = () => {
    // const updateTableData = rows.filter(row => {
    //   let found = false;
    //   Object.keys(row).forEach(key=> {
    //     if (typeof row[key] === 'string')
    //     found = found || row[key].toLowerCase().includes(searchText.toLowerCase());
    //   });
    //   return found;
    // });
    // setTableData(updateTableData)
  }

  const handleLogin=async ({email, password})=>{
    try{
      setLoginLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      setLoginLoading(false)
      alert("Invalid id/password")        
    }
  }
  const changePassword = (password) => {
    console.log(password)
    if(auth.currentUser) {
      updatePassword(auth.currentUser, password.newPassword).then(() => {
        alert("Password Updated");
        setChangePasswordPage(false);
      }).catch((error) => {
        console.error(error)
        alert("Failed to update password");
      });
    }
  }
  return (
    
    <div className="App tc">
      
      {isLoggedIn ? (
        changePasswordPage ? <PasswordChange changePassword={changePassword} pageChange={()=> setChangePasswordPage(false)}/>
        :
      <Stack spacing={2} direction="column" className="justify-center">
        <Stack spacing={2} direction="row" className="justify-between">
          <div style={{ display: 'flex',alignItems: 'center' }}>
            <img src='/customer-support.png' width='100px' height="100px" alt="Customer Support"/>
            
          </div><h1 className='justify-center'>CUSTOMER SUPPORT</h1>
          {/* <SearchB  ox text={searchText} updateText={setSearchText} search={searchClicked}/> */}
          <div className="flex" style={{alignItems: "center", justifyContent:"center"}}>
          <Button className='w-0.5 h-0.5 grow mr3 ' size="small" sx={{mr: 3}} variant="contained" color="secondary" onClick={()=> setChangePasswordPage(true)} >Change Password</Button>
          <Button className='w-0.5 h-0.5 grow' size="small" variant="contained" color="error" onClick={handleLogout} >Logout</Button>
          </div>
        </Stack>
      { <Table data ={tableData} count={tableCount} delete={handleDelete}/>}
      </Stack>
      ): 
      <Loginpage loading={loginLoading} login={handleLogin}/> 
    // <AuthPage login={handleLogin} changePasword={changePassword} loading={loginLoading}/>
  }
    </div>
  );
}

export default App;
