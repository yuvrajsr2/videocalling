import React from 'react'
import { Route, Routes } from 'react-router'
import toast, { Toaster } from 'react-hot-toast'

import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import CallPage from './pages/CallPage.jsx'
import NotificationsPage from './pages/NotificationsPage.jsx'
import OnboardingPage from './pages/OnboardingPage.jsx'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { axiosInstance } from './lib/axios.js'

function App() {

  // tanstack basics
  // const {data, isLoading, error} = useQuery({
  //   queryKey: ['todos'],
  //   queryFn: async () => {
  //     const response = await axiosInstance.get('/auth/me');
  //     return response.data;
  //   }, retry:false
  // })

  return (
    <div className=' h-screen' data-theme="night">

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/call" element={<CallPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        

      </Routes>

      <Toaster />
      
    </div>
  )
}

export default App
