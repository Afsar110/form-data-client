import React,{ useState, useEffect} from 'react';
import './App.css';
import 'tachyons';
import Table from './components/Table';
import { Button, Stack } from '@mui/material';
import { auth, db} from './firebase';
import {  onAuthStateChanged, signInWithEmailAndPassword, signOut, updatePassword } from 'firebase/auth';
import Loginpage from './pages/Loginpage';
import PasswordChange from './pages/PasswordChange';
import BannerModal from './components/BannerModal';
import ThemeModal from './components/ThemeModal';
import { doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';
import { THEME_COLLECTION, THEME_DOC } from './constants';


function App() {
  const [loginLoading, setLoginLoading] = useState(false)
  const [themeModal, setShowThemeModal] = useState(false);
  const [bannerModal, setShowBannerModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [myUser,setUser] = useState({});
  const [theme, setTheme] = useState({});

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
  },[]);

  React.useEffect(()=> {
    return onSnapshot(doc(db, THEME_COLLECTION, THEME_DOC), (doc) => {
      if (doc.exists()){
        const result = doc.data() || {};
          setTheme(result)
      }
  }, (error) => {
    console.log("Error theme: ", error);
  });
  }, []);

  const handleLogout = () => {
    signOut(auth)
  };


const updateTheme = async (color) => {
  const themeRef = doc(db, THEME_COLLECTION, THEME_DOC);
  try {
    await updateDoc(themeRef, {
      color,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error(error);
    alert('Sorry!! Could not update the theme. Please try again later')
  } finally {
    setShowThemeModal(false);
  }
}

const updateBanner = async (banner) => {
  const themeRef = doc(db, THEME_COLLECTION, THEME_DOC);
  try {
    await updateDoc(themeRef, {
      banner,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error(error);
    alert('Sorry!! Could not update the banner. Please try again later')
  } finally {
    setShowBannerModal(false);
  }
}

  const handleLogin=async ({email, password})=>{
    try{
      setLoginLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      setLoginLoading(false);
      alert("Invalid id/password");
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
      {themeModal && <ThemeModal open={themeModal} handleClose={()=> setShowThemeModal(false)} handleUpdateClicked={updateTheme} data={theme} />}
     {bannerModal && <BannerModal open={bannerModal} handleClose={()=> setShowBannerModal(false)} handleUpdateClicked={updateBanner} data={theme}/>}
      {isLoggedIn ? (
        changePasswordPage ? <PasswordChange changePassword={changePassword} pageChange={()=> setChangePasswordPage(false)}/>
        :
      <Stack spacing={2} direction="column" className="justify-center">
        <Stack spacing={2} direction="row" className="justify-between">
          <div style={{ display: 'flex',alignItems: 'center' }}>
            <img src='/form.png' width='50px' height="70px" alt="Customer Support"/>
            
          </div><h1 className='justify-center'>UPDATED ADMIN</h1>
          {/* <SearchB  ox text={searchText} updateText={setSearchText} search={searchClicked}/> */}
          <div className="flex" style={{alignItems: "center", justifyContent:"center"}}>
          <Button className='w-0.5 h-0.5 grow mr3 ' size="small" sx={{mr: 3}} variant="contained" color="success" onClick={()=> setShowBannerModal(old=> !old)} >Change Banner</Button>
          <Button className='w-0.5 h-0.5 grow mr3 ' size="small" sx={{mr: 3}} variant="contained" color="primary" onClick={()=> setShowThemeModal(old => !old)} >Theme Color</Button>
          <Button className='w-0.5 h-0.5 grow mr3 ' size="small" sx={{mr: 3}} variant="contained" color="secondary" onClick={()=> setChangePasswordPage(true)} >Change Password</Button>
          <Button className='w-0.5 h-0.5 grow' size="small" variant="contained" color="error" onClick={handleLogout} >Logout</Button>
          </div>
        </Stack>
      <Table />
      </Stack>
      ): 
      <Loginpage loading={loginLoading} login={handleLogin}/> 
    // <AuthPage login={handleLogin} changePasword={changePassword} loading={loginLoading}/>
  }
    </div>
  );
}

export default App;
