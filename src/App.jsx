import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import ProjectDetails from './pages/ProjectDetails'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import Lenis from 'lenis'
import './index.scss'

import { TransitionProvider } from './context/TransitionContext'

const AppContent = () => {
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  // Réinitialisation du scroll à chaque changement de route
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  useEffect(() => {
    // Initialisation du smooth scroll avec Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  // Callback appelé une fois le préchargement terminé
  const handleLoadComplete = () => {
    setLoading(false);
  }

  return (
    <div className="app">
      <CustomCursor />
      {/* Remove old PageTransition component as it is replaced by Context's overlay */}

      {/* Show preloader only on initial load */}
      {loading && <Preloader onLoadComplete={handleLoadComplete} />}

      <TransitionProvider>
        <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s ease-in' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
          </Routes>
        </div>
      </TransitionProvider>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
