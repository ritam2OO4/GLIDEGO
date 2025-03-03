// import React from 'react'
import GlideGoPng from "../../public/GlideGoLogo.png"
import {Link} from "react-router-dom"
function Homepage() {
  return (
    <div>
      <div className="bg-cover bg-top bg-[url(https://tse3.mm.bing.net/th?id=OIG3.IKgzGkhVn9m.Fs2BLF28&pid=ImgGn)] h-screen w-full pt-8 bg-teal-900 flex-col flex justify-between">
        <img src={GlideGoPng} alt="GlideGo" className="w-10 h-10 ml-8 rounded-full" />
            <h2 className=" text-2xl font-bold text-white mx-auto ">Get Started with <span className="text-teal-200">GlideGo</span></h2>
        <div className="bg-transparent py-5 px-5 pb-7 flex justify-center items-center gap-2 rounded">
            <Link to="/users/login" className="bg-black text-teal-200 w-[40%] py-2 mt-2 rounded-full text-2xl font-bold tracking-tight flex items-center justify-center">User</Link>
            <Link to="/captains/login" className="bg-black text-teal-200 w-[40%] py-2 mt-2 rounded-full text-2xl font-bold tracking-tight flex items-center justify-center">Captain</Link>
        </div>
      </div>
    </div>
  )
}

export default Homepage
