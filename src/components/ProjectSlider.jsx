/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import TransitionLink from './TransitionLink';
import { content } from '../data/content';

/* -------------------------------------------------------------------------- */
/*                                 COMPOSANT                                  */
/* -------------------------------------------------------------------------- */
// Composant fonctionnel ProjectSlider pour afficher un carrousel de projets
const ProjectSlider = () => {

    /* ------------------------------ STATE & REFS ------------------------------ */
    // État pour suivre l'index du slide actuellement affiché
    const [currentIndex, setCurrentIndex] = useState(0);
    // État pour savoir si une animation est en cours (pour éviter les clics multiples)
    const [isAnimating, setIsAnimating] = useState(false);

    // Références pour les éléments du DOM à animer
    const bgRefs = useRef([]); // Références pour les images de fond
    const centerRefs = useRef([]); // Références pour les images centrales
    const titleRefs = useRef([]); // Références pour les titres des projets
    const subtitleRefs = useRef([]); // Références pour les sous-titres des projets

    /* -------------------------------------------------------------------------- */
    /*                               GSAP ANIMATION                               */
    /* -------------------------------------------------------------------------- */
    // Fonction principale de transition entre les slides
    const goToSlide = (index, direction) => {
        // Empêche l'animation si déjà en cours ou si on clique sur le slide actuel
        if (isAnimating || index === currentIndex) return;
        setIsAnimating(true); // Active l'état d'animation

        // Calcule l'index du prochain slide en s'assurant qu'il reste dans les limites du tableau
        const nextIndex = (index + content.projects.length) % content.projects.length;

        // Définition des éléments actuels et suivants pour GSAP
        const current = {
            imgs: [bgRefs.current[currentIndex], centerRefs.current[currentIndex]], // Images du slide actuel
            text: [titleRefs.current[currentIndex], subtitleRefs.current[currentIndex]] // Textes du slide actuel
        };
        const next = {
            bg: bgRefs.current[nextIndex], // Image de fond du prochain slide
            center: centerRefs.current[nextIndex], // Image centrale du prochain slide
            text: [titleRefs.current[nextIndex], subtitleRefs.current[nextIndex]] // Textes du prochain slide
        };

        // Définit le décalage initial en X pour l'image centrale du slide entrant
        const xOffset = direction === 'next' ? 50 : -50;

        // 1. Préparation du slide entrant (caché initialement et positionné)
        gsap.set(next.bg, { zIndex: 1, opacity: 0 }); // Met le fond derrière et le cache
        gsap.set(next.center, { xPercent: xOffset, opacity: 0 }); // Positionne l'image centrale et la cache
        gsap.set(next.text, { y: 30, opacity: 0 }); // Positionne les textes et les cache

        // Crée une timeline GSAP pour orchestrer les animations
        const tl = gsap.timeline({
            onComplete: () => {
                // Une fois l'animation terminée, met à jour l'index et désactive l'état d'animation
                setCurrentIndex(nextIndex);
                setIsAnimating(false);
            }
        });

        // 2. Animation de sortie du slide actuel
        tl.to(current.imgs, { opacity: 0, duration: 0.8, ease: "power2.inOut" }, 0) // Fait disparaître les images
            .to(current.text, { y: -30, opacity: 0, duration: 0.6, ease: "power2.inIn" }, 0); // Fait disparaître les textes vers le haut

        // 3. Animation d'entrée du nouveau slide
        tl.to(next.bg, { zIndex: 2, opacity: 1, duration: 0.8, ease: "power2.inOut" }, 0.1) // Fait apparaître le fond
            .to(next.center, { xPercent: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0.2) // Fait apparaître l'image centrale en la déplaçant
            .to(next.text, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }, 0.3); // Fait apparaître les textes avec un léger décalage
    };

    // Fonctions pour naviguer au slide suivant ou précédent
    const nextSlide = () => goToSlide(currentIndex + 1, 'next');
    const prevSlide = () => goToSlide(currentIndex - 1, 'prev');

    // Effet de bord pour l'initialisation des slides au montage du composant
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initialisation : on cache tous les slides sauf le premier (currentIndex)
            content.projects.forEach((_, i) => {
                if (i !== currentIndex) {
                    // Cache les éléments des slides non actifs
                    gsap.set(bgRefs.current[i], { opacity: 0, zIndex: 0 });
                    gsap.set(centerRefs.current[i], { opacity: 0 });
                    gsap.set(titleRefs.current[i], { opacity: 0 });
                    gsap.set(subtitleRefs.current[i], { opacity: 0 });
                } else {
                    // Assure que les éléments du slide actif sont visibles et bien positionnés
                    gsap.set(bgRefs.current[i], { opacity: 1, zIndex: 2 });
                    gsap.set(centerRefs.current[i], { opacity: 1, xPercent: 0 });
                    gsap.set(titleRefs.current[i], { opacity: 1, y: 0 });
                    gsap.set(subtitleRefs.current[i], { opacity: 1, y: 0 });
                }
            });
        });
        // Fonction de nettoyage pour réinitialiser le contexte GSAP au démontage
        return () => ctx.revert();
    }, []); // Le tableau vide assure que cet effet ne s'exécute qu'une seule fois au montage

    /* -------------------------------------------------------------------------- */
    /*                                 JSX RENDER                                 */
    /* -------------------------------------------------------------------------- */
    return (
        <section className="project-slider-fullscreen">
            {content.projects.map((slide, index) => (
                <div key={index} className="slide-container">
                    <div
                        ref={el => bgRefs.current[index] = el}
                        className="slide-bg"
                        style={{ backgroundImage: `url(${slide.image})` }}
                    />

                    <div className="slide-center-wrapper">
                        <div
                            ref={el => centerRefs.current[index] = el}
                            className="slide-center"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        />
                    </div>

                    <div className="slide-content">

                        <h3
                            ref={el => subtitleRefs.current[index] = el}
                            className="slide-subtitle"
                        >
                            {slide.subtitle}
                        </h3>
                        <div className="slide-text-wrapper">
                            <h2
                                ref={el => titleRefs.current[index] = el}
                                className="slide-title"
                            >
                                {slide.title}
                            </h2>
                        </div>
                    </div>
                </div>
            ))}

            <button className="nav-btn prev" onClick={prevSlide}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M14 8l-4 4 4 4" />
                </svg>
            </button>
            <button className="nav-btn next" onClick={nextSlide}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M10 8l4 4-4 4" />
                </svg>
            </button>

            <div className="project-slider-cta-container">
                <TransitionLink to={`/project/${currentIndex}`} className="project-slider-cta-link">
                    {content.ui.explore}
                </TransitionLink>
            </div>

        </section >
    );
};


export default ProjectSlider;
