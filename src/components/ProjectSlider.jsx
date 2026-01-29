import React, { useState, useRef, useEffect } from 'react'; // Import des hooks React
import gsap from 'gsap'; // Import GSAP pour les animations
import TransitionLink from './TransitionLink'; // Import lien personnalisé
import { content } from '../data/content'; // Import données du contenu

const ProjectSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0); // Index de la diapositive actuelle
    const [isAnimating, setIsAnimating] = useState(false); // État pour bloquer l'interaction pendant l'animation

    // Références pour les éléments du slider
    const bgRefs = useRef([]); // Arrière-plans
    const centerRefs = useRef([]); // Images centrales
    const titleRefs = useRef([]); // Titres
    const subtitleRefs = useRef([]); // Sous-titres

    // Fonction principale pour changer de slide
    const goToSlide = (index, direction) => {
        // Bloque si une animation est en cours ou si on essaie d'aller sur la même slide
        if (isAnimating || index === currentIndex) return;
        setIsAnimating(true); // Active le verrouillage

        // Calcul de l'index suivant avec boucle (modulo)
        const nextIndex = (index + content.projects.length) % content.projects.length;

        // Groupement des éléments actuels
        const current = {
            imgs: [bgRefs.current[currentIndex], centerRefs.current[currentIndex]],
            text: [titleRefs.current[currentIndex], subtitleRefs.current[currentIndex]]
        };
        // Groupement des éléments suivants
        const next = {
            bg: bgRefs.current[nextIndex],
            center: centerRefs.current[nextIndex],
            text: [titleRefs.current[nextIndex], subtitleRefs.current[nextIndex]]
        };

        // Direction de l'animation (décalage de 50% ou -50%)
        const xOffset = direction === 'next' ? 50 : -50;

        // Préparation de la slide suivante (états initiaux)
        gsap.set(next.bg, { zIndex: 1, opacity: 0 });
        gsap.set(next.center, { xPercent: xOffset, opacity: 0 });
        gsap.set(next.text, { y: 30, opacity: 0 });

        // Création de la timeline
        const tl = gsap.timeline({
            onComplete: () => {
                setCurrentIndex(nextIndex); // Met à jour l'index
                setIsAnimating(false); // Déverrouille l'interaction
            }
        });

        // Animation de sortie de la slide actuelle
        tl.to(current.imgs, { opacity: 0, duration: 0.8, ease: "power2.inOut" }, 0)
            .to(current.text, { y: -30, opacity: 0, duration: 0.6, ease: "power2.inIn" }, 0);

        // Animation d'entrée de la slide suivante (légèrement décalée +0.1s, +0.2s)
        tl.to(next.bg, { zIndex: 2, opacity: 1, duration: 0.8, ease: "power2.inOut" }, 0.1)
            .to(next.center, { xPercent: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0.2)
            .to(next.text, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }, 0.3);
    };

    // Fonctions helper pour suivant/précédent
    const nextSlide = () => goToSlide(currentIndex + 1, 'next');
    const prevSlide = () => goToSlide(currentIndex - 1, 'prev');

    // Effet d'initialisation des styles GSAP
    useEffect(() => {
        const ctx = gsap.context(() => {
            content.projects.forEach((_, i) => {
                if (i !== currentIndex) {
                    // Cache toutes les slides sauf l'actuelle
                    gsap.set(bgRefs.current[i], { opacity: 0, zIndex: 0 });
                    gsap.set(centerRefs.current[i], { opacity: 0 });
                    gsap.set(titleRefs.current[i], { opacity: 0 });
                    gsap.set(subtitleRefs.current[i], { opacity: 0 });
                } else {
                    // Affiche la slide actuelle
                    gsap.set(bgRefs.current[i], { opacity: 1, zIndex: 2 });
                    gsap.set(centerRefs.current[i], { opacity: 1, xPercent: 0 });
                    gsap.set(titleRefs.current[i], { opacity: 1, y: 0 });
                    gsap.set(subtitleRefs.current[i], { opacity: 1, y: 0 });
                }
            });
        });
        return () => ctx.revert(); // Nettoyage
    }, []);

    return (
        <section className="project-slider-fullscreen">
            {/* Rendu de toutes les slides */}
            {content.projects.map((slide, index) => (
                <div key={index} className="slide-container">
                    {/* Image d'arrière-plan floue */}
                    <div
                        ref={el => bgRefs.current[index] = el}
                        className="slide-bg"
                        style={{ backgroundImage: `url(${slide.image})` }}
                    />

                    {/* Image centrale nette */}
                    <div className="slide-center-wrapper">
                        <div
                            ref={el => centerRefs.current[index] = el}
                            className="slide-center"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        />
                    </div>

                    {/* Contenu textuel */}
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

            {/* Boutons de navigation */}
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

            {/* Bouton pour explorer le projet */}
            <div className="project-slider-cta-container">
                <TransitionLink to={`/project/${currentIndex}`} className="project-slider-cta-link">
                    {content.ui.explore}
                </TransitionLink>
            </div>

        </section >
    );
};

export default ProjectSlider;
