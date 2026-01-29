import React, { useEffect } from 'react' // Import hook
import { useLocation } from 'react-router-dom' // Import hook router
import Header from '../components/Header' // Import Header
import Hero from '../components/Hero' // Import Hero
import About from '../components/About' // Import About
import ProjectSlider from '../components/ProjectSlider' // Import ProjectSlider
import Portfolio from '../components/Portfolio' // Import Portfolio
import Footer from '../components/Footer' // Import Footer

const Home = () => {
    const location = useLocation(); // Hook pour obtenir l'URL actuelle

    // Effet pour gérer le scroll vers les ancres (#) après la transition
    useEffect(() => {
        // Vérifie si l'URL contient un hash (ex: #about)
        if (location.hash) {
            const id = location.hash.replace('#', ''); // Extrait l'ID sans le dièse
            // Délai pour laisser le temps au DOM de se construire/transition de finir
            setTimeout(() => {
                const element = document.getElementById(id); // Trouve l'élément cible
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' }); // Scrolle doucement vers l'élément
                }
            }, 100); // Petit délai de 100ms
        }
    }, [location]); // Se déclenche à chaque changement de location

    return (
        // Utilisation de React Fragment <> pour ne pas ajouter de noeud DOM inutile
        <>
            <Header /> {/* En-tête de navigation */}
            <Hero /> {/* Section Hero (intro) */}

            {/* Wrapper avec ID pour l'ancre "about" */}
            <div id="about">
                <About />
            </div>

            {/* Wrapper avec ID pour l'ancre "work" */}
            <div id="work">
                <ProjectSlider /> {/* Slider plein écran des projets */}
                <Portfolio /> {/* Grille portfolio supplémentaire */}
            </div>

            {/* Wrapper avec ID pour l'ancre "contact" */}
            <div id="contact">
                <Footer /> {/* Pied de page */}
            </div>
        </>
    )
}

export default Home // Export de la page Home
