
import React, { useEffect, useRef } from 'react'; // Import React et hooks
import gsap from 'gsap'; // Import GSAP
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger
gsap.registerPlugin(ScrollTrigger); // Enregistrement du plugin
import { content } from '../data/content'; // Import des données

const Portfolio = () => {
    const sectionRef = useRef(null); // Référence pour la section Portfolio
    const bgTextRef = useRef(null); // Référence pour le conteneur du texte d'arrière-plan
    const itemsRef = useRef([]); // Référence pour les éléments du portfolio (images)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Effet Parallaxe sur le texte d'arrière-plan & Réduction de l'espace
            // On anime l'espace ou le line-height des lignes de texte "PORTFOLIO"
            const lines = bgTextRef.current.children;

            // Définir l'état initial des lignes
            gsap.set(lines, { lineHeight: 1.5 }); // Commencer espacé

            // Animation du texte d'arrière-plan au scroll
            gsap.to(lines, {
                lineHeight: 0.8, // Resserrer les lignes ensemble
                letterSpacing: "-10px", // Resserrer l'espacement des lettres (optionnel)
                ease: "none", // Linéaire pour suivre le scroll
                scrollTrigger: {
                    trigger: sectionRef.current, // Déclenché par la section Portfolio
                    start: "top bottom", // Commence quand le haut de la section arrive en bas de l'écran
                    end: "bottom top", // Finit quand le bas de la section arrive en haut de l'écran
                    scrub: 1 // Synchronisation douce avec le scroll
                }
            });

            // Apparition des éléments de la grille (photos du portfolio)
            gsap.from(itemsRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%", // Commence un peu plus tôt (70% de la hauteur de fenêtre)
                    end: "bottom 80%",
                    scrub: 1
                },
                y: 100, // Vient du bas
                opacity: 0, // Commence invisible
                stagger: 0.2, // Décalage entre chaque élément
                ease: "power2.out" // Courbe d'animation
            });
        }, sectionRef);

        return () => ctx.revert(); // Nettoyage
    }, []);

    // Fonction helper pour ajouter les éléments au tableau des références
    const addToRefs = (el) => {
        if (el && !itemsRef.current.includes(el)) {
            itemsRef.current.push(el);
        }
    };

    return (
        <section className="portfolio-section" ref={sectionRef}>
            {/* Arrière-plan typographique animé */}
            <div className="portfolio-bg-wrapper" ref={bgTextRef}>
                {/* Répétition du mot PORTFOLIO 6 fois */}
                {Array(6).fill("PORTFOLIO").map((text, i) => (
                    <div key={i} className="portfolio-bg-line">{text}</div>
                ))}
            </div>

            {/* Grille des projets */}
            <div className="portfolio-grid">
                {/* Items avec images de fond, ajoutés aux refs pour l'animation */}
                <div className="portfolio-item item-1" ref={addToRefs} style={{ backgroundImage: `url(${content.hero.images[0]})` }}></div>
                <div className="portfolio-item item-2" ref={addToRefs} style={{ backgroundImage: `url(${content.hero.images[1]})` }}></div>
                <div className="portfolio-item item-3" ref={addToRefs} style={{ backgroundImage: `url(${content.hero.images[2]})` }}></div>
            </div>

            {/* Bouton CTA pour suivre sur Instagram */}
            <div className="portfolio-cta-container">
                <a href="https://www.instagram.com/ac_conception/" target="_blank" rel="noopener noreferrer" className="follow-pill-btn">
                    {/* Icône SVG Instagram */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 6C13.66 6 14.2 6.01 14.81 6.04C15.42 6.07 15.74 6.17 15.96 6.25C16.25 6.36 16.46 6.5 16.68 6.72C16.9 6.94 17.04 7.15 17.15 7.44C17.23 7.66 17.33 7.98 17.36 8.59C17.39 9.2 17.4 9.74 17.4 11.4V12.6C17.4 14.26 17.39 14.8 17.36 15.41C17.33 16.02 17.23 16.34 17.15 16.56C17.04 16.85 16.9 17.06 16.68 17.28C16.46 17.5 16.25 17.64 15.96 17.75C15.74 17.83 15.42 17.93 14.81 17.96C14.2 17.99 13.66 18 12 18C10.34 18 9.8 17.99 9.19 17.96C8.58 17.93 8.26 17.83 8.04 17.75C7.75 17.64 7.54 17.5 7.32 17.28C7.1 17.06 6.96 16.85 6.85 16.56C6.77 16.34 6.67 16.02 6.64 15.41C6.61 14.8 6.6 14.26 6.6 12.6V11.4C6.6 9.74 6.61 9.2 6.64 8.59C6.67 7.98 6.77 7.66 6.85 7.44C6.96 7.15 7.1 6.94 7.32 6.72C7.54 6.5 7.75 6.36 8.04 6.25C8.26 6.17 8.58 6.07 9.19 6.04C9.8 6.01 10.34 6 12 6Z" fill="currentColor" />
                        <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.5" />
                        <circle cx="15.5" cy="8.5" r="0.8" fill="currentColor" />
                    </svg>
                    <span>Suivre @ac_conception</span>
                </a>
            </div>
        </section>
    );
};

export default Portfolio;
