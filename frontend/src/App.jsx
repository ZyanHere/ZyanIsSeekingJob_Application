import React, {useEffect, useContext} from 'react'
import "./App.css"
import { Context } from './main'
import axios from "axios"
import {Toaster} from "react-hot-toast"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import NotFound from './components/NotFound/NotFound'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Home from './components/Home/Home'
import Jobs from './components/Job/Jobs'
import Jobdetails from './components/Job/JobDetails'
import PostJobs from './components/Job/PostJob'
import MyJobs from './components/Job/MyJobs'
import Application from './components/Application/Application'
import MyApplication from './components/Application/MyApplications'

const App = () => {
  const { isAuthorised, setIsAuthorised, setUser} = useContext(Context)

  useEffect(() => {
    const fetchUser = async() => {
      try {
        const response = await axios.get("", { withCredentials: true});
        setUser(response.data.user)
        setIsAuthorised(true)
      } catch (error) {
        setIsAuthorised(false)
      }
    }
    fetchUser()
  },[isAuthorised])


  return (
    <Router>
      <Routes>
        <Route path='/login' element= {<Login/>}/>
        <Route path='/register' element= {<Register/>}/>
        <Route path='/' element= {<Home/>}/>
        <Route path='/job/getall' element= {<Jobs/>}/> 
        <Route path='/job/:id' element= {<Jobdetails/>}/>
        <Route path='/job/post' element= {<PostJobs/>}/>
        <Route path='/job/me' element= {<MyJobs/>}/>
        <Route path='/application/:id' element= {<Application/>}/>
        <Route path='/application/me' element= {<MyApplication/>}/>
      </Routes>
    </Router>
  )
}

export default App