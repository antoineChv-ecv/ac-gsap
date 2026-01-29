import React, { useEffect, useRef } from 'react'; // Import des hooks React nécessaires : useEffect pour les effets de bord, useRef pour les références DOM
import gsap from 'gsap'; // Import de la bibliothèque d'animation GSAP
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import du plugin ScrollTrigger pour les animations au scroll
import SplitType from 'split-type'; // Import de la bibliothèque SplitType pour diviser du texte
import { content } from '../data/content'; // Import des données de contenu (texte et image)
gsap.registerPlugin(ScrollTrigger); // Enregistrement du plugin ScrollTrigger auprès de GSAP

const About = () => {
    const sectionRef = useRef(null); // Référence à la section 'About'
    const textRef = useRef(null); // Référence au paragraphe de texte
    const imgContainerRef = useRef(null); // Référence au conteneur de l'image

    useEffect(() => {
        let split; // Variable pour stocker l'instance SplitType
        // Création d'un contexte GSAP pour gérer proprement les animations et nettoyages
        const ctx = gsap.context(() => {
            // Division du texte en lignes et mots pour permettre l'animation
            split = new SplitType(textRef.current, { types: 'lines, words' });
            const words = split.words; // Récupération des mots divisés

            // Création de la timeline liée au scroll
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current, // L'élément déclencheur est la section About
                    start: "top top", // Début de l'animation quand le haut de la section atteint le haut de la fenêtre
                    end: "+=150%", // Fin de l'animation après avoir scrollé 150% de la hauteur de la fenêtre
                    pin: true, // Épingle la section pendant le scroll (effet sticky)
                    scrub: 1, // Synchronise l'animation avec le scroll avec un léger délai (lisage)
                }
            });

            // Animation d'entrée de l'image (opacité et échelle)
            tl.from(imgContainerRef.current, {
                opacity: 0, // Commence totalement transparent
                scale: 0.8, // Commence légèrement plus petit
                duration: 1, // Durée relative dans la timeline
                ease: "power2.out" // Courbe d'animation fluide
            }, 0); // Démarre au début de la timeline (temps 0)

            // Déplacement vertical de l'image (effet de parallaxe)
            tl.to(imgContainerRef.current, {
                y: -50, // Déplace l'image de 50px vers le haut
                scale: 1.1, // Agrandit légèrement l'image
                ease: "none" // Animation linéaire liée au scroll
            }, 0); // En même temps que l'animation précédente

            // Préparation de l'animation des mots : opacité quasi-nulle au départ
            gsap.set(words, { opacity: 0.1 });

            // Apparition progressive des mots
            tl.to(words, {
                opacity: 1, // Devient totalement visible
                duration: 0.5, // Durée de l'apparition
                stagger: 0.02, // Délai entre l'apparition de chaque mot
                ease: "none" // Animation linéaire pour une lecture fluide
            }, 0.2) // Commence avec un léger retard (0.2s) dans la timeline

        }, sectionRef); // Scope le contexte au composant (sectionRef)

        // Fonction de nettoyage appelée lors du démontage du composant
        return () => {
            if (split) split.revert(); // Annule la division du texte (restaure le HTML d'origine)
            ctx.revert(); // Nettoie toutes les animations et triggers GSAP créés dans ce contexte
        };
    }, []); // Dépendance vide : s'exécute uniquement au montage

    return (
        <div className="about-wrapper">
            <section className="about-section" ref={sectionRef}>
                <div className="about-container">
                    <div className="about-img-container" ref={imgContainerRef}>
                        {/* Image illustrative chargée depuis les données de contenu */}
                        <img src={content.about.image} alt="About Me" className="about-illustration" />
                    </div>
                    {/* Paragraphe contenant le texte "About Me" */}
                    <p className="about-text" ref={textRef}>
                        {content.about.text}
                    </p>
                </div>
            </section>
        </div>
    );
};

export default About; // Export du composant About
