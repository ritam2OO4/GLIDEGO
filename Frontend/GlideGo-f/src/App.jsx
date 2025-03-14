// import React from 'react'

import { Route, Routes } from "react-router-dom"
import Homepage from "./pages/Homepage"
import UserRegister from "./pages/UserRegister"
import UserLogin from "./pages/UserLogin"
import CaptainRegister from "./pages/CaptainRegister"
import CaptainLogin from "./pages/CaptainLogin"
import Home from "./pages/Home"
import UserProtectWrapper from "./pages/UserProtectWrapper"
import UserLogout from "./pages/UserLogout"
import HomeCaptain from "./pages/HomeCaptain"
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper"
import CaptainLogout from "./pages/CaptainLogout"
import Riding from "./pages/Riding"
import CaptainRiding from "./pages/CaptainRiding"

function App() {
  return (
   <Routes>
    <Route path="/" element={<Homepage/>}></Route>
    <Route path="/users/register" element={<UserRegister/>}></Route>
    <Route path="/users/login" element={<UserLogin/>}></Route>
    <Route path="/captains/register" element={<CaptainRegister/>}></Route>
    <Route path="/captains/login" element={<CaptainLogin/>}></Route>
    <Route path="/homeUser" element={ <UserProtectWrapper><Home/></UserProtectWrapper>}></Route>
    <Route path="/homeCaptain" element={ <CaptainProtectWrapper><HomeCaptain/></CaptainProtectWrapper>}></Route>
    <Route path="/users/logout" element={ <UserProtectWrapper><UserLogout/></UserProtectWrapper>}></Route>
    <Route path="/captains/logout" element={ <CaptainProtectWrapper><CaptainLogout/></CaptainProtectWrapper>}></Route>
    <Route path="/userRiding" element={<Riding/>}></Route>
    <Route path="/captainRiding" element={<CaptainRiding/>}></Route>
   </Routes>
  )
}

export default App
