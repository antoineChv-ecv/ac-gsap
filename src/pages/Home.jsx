import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Hero from '../components/Hero'
import About from '../components/About'
import ProjectSlider from '../components/ProjectSlider'

import Portfolio from '../components/Portfolio'
import Footer from '../components/Footer'

const Home = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100); // Petit délai pour laisser le rendu/transition s'effectuer
        }
    }, [location]);

    return (
        <>
            <Header />
            <Hero />
            <div id="about">
                <About />
            </div>
            <div id="work">
                <ProjectSlider />
                <Portfolio />
            </div>
            <div id="contact">
                <Footer />
            </div>
        </>
    )
}

export default Home
