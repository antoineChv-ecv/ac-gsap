import React, { useEffect, useState } from 'react' // Import des hooks React nécessaires : useEffect pour les effets de bord, useState pour l'état local
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom' // Import des composants de routage de react-router-dom
import Home from './pages/Home' // Import de la page d'accueil
import ProjectDetails from './pages/ProjectDetails' // Import de la page de détails du projet
import Preloader from './components/Preloader' // Import du composant de préchargement
import CustomCursor from './components/CustomCursor' // Import du composant de curseur personnalisé
import Lenis from 'lenis' // Import de Lenis pour le smooth scroll (défilement fluide)
import './index.scss' // Import des styles globaux SCSS

import { TransitionProvider } from './context/TransitionContext' // Import du fournisseur de contexte pour les transitions de page

const AppContent = () => {
  const [loading, setLoading] = useState(true) // État pour gérer l'affichage du préchargeur, initialisé à true
  const location = useLocation() // Hook pour obtenir l'objet location actuel (URL courante)

  // Effet pour réinitialiser le scroll en haut de page à chaque changement de route
  useEffect(() => {
    window.scrollTo(0, 0) // Force le scroll à la position (0, 0)
  }, [location]) // Dépendance : s'exécute à chaque changement de 'location'

  // Effet pour initialiser et gérer le smooth scroll avec Lenis
  useEffect(() => {
    // Initialisation de l'instance Lenis avec ses options
    const lenis = new Lenis({
      duration: 1.2, // Durée du défilement
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Fonction d'assouplissement (easing) personnalisée
      direction: 'vertical', // Direction du défilement
      gestureDirection: 'vertical', // Direction de la gestuelle
      smooth: true, // Active le défilement fluide
      mouseMultiplier: 1, // Multiplicateur de vitesse pour la souris
      smoothTouch: false, // Désactive le smooth scroll sur tactile (souvent préférable pour l'UX natif)
      touchMultiplier: 2, // Multiplicateur pour le tactile
    })

    // Fonction de boucle d'animation (requestAnimationFrame)
    function raf(time) {
      lenis.raf(time) // Met à jour Lenis à chaque frame
      requestAnimationFrame(raf) // Demande la prochaine frame
    }

    requestAnimationFrame(raf) // Lance la boucle d'animation

    // Fonction de nettoyage appelée au démontage du composant
    return () => {
      lenis.destroy() // Détruit l'instance Lenis pour éviter les fuites de mémoire
    }
  }, []) // Tableau de dépendances vide : ne s'exécute qu'une fois au montage

  // Fonction callback appelée lorsque le préchargeur a terminé son animation
  const handleLoadComplete = () => {
    setLoading(false); // Passe l'état loading à false pour masquer le préchargeur et révéler le contenu
  }

  return (
    <div className="app">
      <CustomCursor /> {/* Affiche le curseur personnalisé sur toute l'application */}

      {/* Affiche le composant Preloader tant que l'état 'loading' est vrai */}
      {/* On passe handleLoadComplete pour être notifié de la fin du chargement */}
      {loading && <Preloader onLoadComplete={handleLoadComplete} />}

      {/* Fournisseur de contexte pour gérer les transitions entre les pages */}
      <TransitionProvider>
        {/* Conteneur principal avec une transition d'opacité pour l'apparition initiale */}
        <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s ease-in' }}>
          <Routes>
            <Route path="/" element={<Home />} /> {/* Route pour la page d'accueil */}
            <Route path="/project/:id" element={<ProjectDetails />} /> {/* Route dynamique pour les détails de projet */}
          </Routes>
        </div>
      </TransitionProvider>
    </div>
  )
}

function App() {
  return (
    // Router encapsule l'application pour permettre le routage
    <Router>
      <AppContent />
    </Router>
  )
}

export default App // Export du composant principal App
