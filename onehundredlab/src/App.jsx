import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Appointment from './pages/Appointment'
import About from './pages/About'
import Pricing from './pages/Pricing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function SplashScreen() {
  return (
    <div id="splash" style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#FAF7F2',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      transform: 'translateY(-100%)',
      transition: 'transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)',
    }}>
      <p style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: '2.5rem', fontWeight: 900,
        color: '#92400e', letterSpacing: '0.05em',
        marginBottom: '0.75rem'
      }}>
        OneHundredLab
      </p>
      <p style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '0.85rem', color: '#a16207',
        letterSpacing: '0.3em', textTransform: 'uppercase'
      }}>
        The right planner for you
      </p>
    </div>
  )
}

export default function App() {
  const [dark, setDark] = useState(false)
  const [splashDone, setSplashDone] = useState(false)

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [dark])

  useEffect(() => {
    const splash = document.getElementById('splash')

    // Drop down into view
    const timer0 = setTimeout(() => {
      if (splash) splash.style.transform = 'translateY(0%)'
    }, 50)

    // Lift back up after 2 seconds
    const timer1 = setTimeout(() => {
      if (splash) splash.style.transform = 'translateY(-100%)'
    }, 2200)

    // Remove from DOM after animation
    const timer2 = setTimeout(() => {
      setSplashDone(true)
    }, 3000)

    return () => {
      clearTimeout(timer0)
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <>
      {!splashDone && <SplashScreen />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home dark={dark} setDark={setDark} />} />
          <Route path="/chat" element={<Chat dark={dark} setDark={setDark} />} />
          <Route path="/appointment" element={<Appointment dark={dark} setDark={setDark} />} />
          <Route path="/about" element={<About dark={dark} setDark={setDark} />} />
          <Route path="/pricing" element={<Pricing dark={dark} setDark={setDark} />} />
          <Route path="/login" element={<Login dark={dark} setDark={setDark} />} />
          <Route path="/dashboard" element={<Dashboard dark={dark} setDark={setDark} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}