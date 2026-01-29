import React, { useEffect, useRef } from 'react'; // Import des hooks React nécessaires
import { useLocation } from 'react-router-dom'; // Import useLocation pour détecter les changements de route
import gsap from 'gsap'; // Import de GSAP pour les animations

const PageTransition = () => {
    const location = useLocation(); // Obtient l'objet location actuel
    const overlayRef = useRef(null); // Référence à l'élément overlay (le rideau noir)
    const isInitialLoad = useRef(true); // Référence pour suivre si c'est le chargement initial

    useEffect(() => {
        // Si c'est le chargement initial, on ne fait rien (géré par le Preloader)
        if (isInitialLoad.current) {
            isInitialLoad.current = false; // Marque le chargement initial comme terminé
            return;
        }

        // Création du contexte GSAP
        const ctx = gsap.context(() => {
            // Animation de "départ" du rideau
            // Il part du haut (scaleY: 1) et se réduit vers le haut (scaleY: 0)
            gsap.fromTo(overlayRef.current,
                { scaleY: 1, transformOrigin: 'top' }, // État initial : plein écran, ancré en haut
                { scaleY: 0, duration: 1, ease: 'power4.inOut', delay: 0.2 } // État final : invisible, durée 1s, délai 0.2s
            );
        }, overlayRef); // Scope à overlayRef

        // Nettoyage de l'animation au démontage ou changement de dépendance
        return () => ctx.revert();
    }, [location]); // Se déclenche à chaque changement de location (changement de page)


    return (
        // Div overlay qui sert de rideau de transition
        <div
            ref={overlayRef}
            className="page-transition-overlay"
            style={{
                position: 'fixed', // Fixé par rapport à la fenêtre
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                backgroundColor: '#000000', // Couleur noire
                zIndex: 99999, // Très haut z-index pour être au-dessus de tout
                pointerEvents: 'none', // Ne bloque pas les clics quand il est visible (si transparence) ou animé
                transform: 'scaleY(0)', // Initialement invisible (hauteur 0)
                transformOrigin: 'bottom' // Point d'origine de la transformation
            }}
        />
    );
};

export default PageTransition; // Export du composant
