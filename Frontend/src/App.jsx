import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import Usersignup from './pages/Usersignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/Captainwrapper'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding  from './pages/CaptainRiding'

function App() {
  return (
    <div>
       <Routes>
         <Route path='/'element={<Start/>} />
         <Route path='/login'element={<UserLogin/>} />
         <Route path='/riding'element={<Riding/>} />
         <Route path='/captainriding'element={<CaptainRiding/>} />
         
         <Route path='/signup'element={<Usersignup/>} />
         <Route path='/captainlogin'element={<CaptainLogin/>} />
         <Route path='/captainsignup'element={<CaptainSignup/>} />
         <Route path='/home'element={
          <UserProtectedWrapper>
            <Home/>
          </UserProtectedWrapper>
         } />
         <Route path='/userlogout'element={
          <UserProtectedWrapper>
            <UserLogout/>
          </UserProtectedWrapper>
         } />
         <Route path='/captainhome'element={
          <CaptainProtectWrapper>
            <CaptainHome/>
          </CaptainProtectWrapper>
         } />
         <Route path='/captainlogout'element={
          <CaptainProtectWrapper>
            <CaptainLogout/>
          </CaptainProtectWrapper>
         } />

       </Routes> 
    </div>
  )
}

export default App