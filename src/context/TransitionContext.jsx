import React, { createContext, useContext, useRef, useState, useEffect } from 'react'; // Import des hooks React
import { useNavigate, useLocation } from 'react-router-dom'; // Import des hooks de navigation
import gsap from 'gsap'; // Import GSAP

// Création du contexte de transition
const TransitionContext = createContext();

// Hook personnalisé pour accéder facilement au contexte
export const useTransitionHelper = () => useContext(TransitionContext);

// Composant fournisseur qui enveloppe l'application
export const TransitionProvider = ({ children }) => {
    const navigate = useNavigate(); // Hook pour naviguer programmatiquement
    const location = useLocation(); // Hook pour détecter la page actuelle
    const overlayRef = useRef(null); // Référence pour le rideau noir (overlay)
    const [isTransitioning, setIsTransitioning] = useState(false); // État pour savoir si une transition est en cours


    // Animation au chargement initial (vide pour l'instant, pourrait être utilisé pour l'intro)
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Place pour une animation initiale si nécessaire
        }, overlayRef);
        return () => ctx.revert();
    }, []);

    // Animation à chaque changement de route automatique (Sortie de l'overlay)
    // Se déclenche quand l'URL change réellement
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Tue les animations en cours sur l'overlay pour éviter les conflits
            gsap.killTweensOf(overlayRef.current);

            // Animation de disparition du rideau (révèle la nouvelle page)
            gsap.to(overlayRef.current, {
                scaleY: 0, // Réduit la hauteur à 0
                transformOrigin: 'top', // 'Colle' le rideau en haut pendant qu'il rétrécit
                duration: 1, // Durée de 1 seconde
                ease: 'power4.inOut', // Courbe fluide
                onComplete: () => {
                    // Désactive les événements souris une fois fini pour pouvoir cliquer sur la page
                    gsap.set(overlayRef.current, { pointerEvents: 'none' });
                }
            });
        }, overlayRef);

        return () => ctx.revert();
    }, [location.pathname]); // Dépendance : change quand l'URL change


    // Fonction principale pour déclencher une transition manuelle vers une nouvelle page
    const transitionTo = (path) => {
        setIsTransitioning(true); // Active l'état de transition

        const ctx = gsap.context(() => {
            gsap.killTweensOf(overlayRef.current); // Nettoie les animations

            // Animation d'entrée du rideau (couvre la page actuelle)
            gsap.fromTo(overlayRef.current,
                { scaleY: 0, transformOrigin: 'bottom' }, // Part du bas, hauteur 0
                {
                    scaleY: 1, // Devient plein écran
                    duration: 1,
                    ease: 'power4.inOut',
                    onComplete: () => {
                        navigate(path); // Change l'URL une fois le rideau fermé (écran noir)
                        setIsTransitioning(false); // Fin de la phase active de transition
                        // L'useEffect ci-dessus prendra le relais pour l'animation de sortie
                    }
                }
            );
        }, overlayRef);
    };

    return (
        <TransitionContext.Provider value={{ transitionTo }}>
            {children} {/* Affiche le contenu de l'application */}

            {/* Élément DOM pour le rideau de transition */}
            <div
                ref={overlayRef}
                className="page-transition-overlay"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100dvh', // 100% de la hauteur du viewport dynamique
                    backgroundColor: '#000', // Noir
                    zIndex: 99999, // Très haut z-index
                    pointerEvents: 'none', // Initialement non-cliquable
                    transform: 'scaleY(1)' // Commence plein écran (sera géré par GSAP)
                }}
            />
        </TransitionContext.Provider>
    );
};
