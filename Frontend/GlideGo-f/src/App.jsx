// import React from 'react'

import { Route, Routes } from "react-router-dom"
import Homepage from "./pages/Homepage"
import UserRegister from "./pages/UserRegister"
import UserLogin from "./pages/userLogin"
import CaptainRegister from "./pages/CaptainRegister"
import CaptainLogin from "./pages/CaptainLogin"
import Home from "./pages/Home"

function App() {
  return (
   <Routes>
    <Route path="/" element={<Homepage/>}></Route>
    <Route path="/users/register" element={<UserRegister/>}></Route>
    <Route path="/users/login" element={<UserLogin/>}></Route>
    <Route path="/captains/register" element={<CaptainRegister/>}></Route>
    <Route path="/captains/login" element={<CaptainLogin/>}></Route>
    <Route path="/home" element={<Home/>}></Route>
   </Routes>
  )
}

export default App
