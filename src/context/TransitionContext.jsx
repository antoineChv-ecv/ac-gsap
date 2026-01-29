import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';

const TransitionContext = createContext();

export const useTransitionHelper = () => useContext(TransitionContext);

export const TransitionProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const overlayRef = useRef(null);
    const [isTransitioning, setIsTransitioning] = useState(false);


    // Animation au chargement initial (vide pour l'instant)
    useEffect(() => {
        const ctx = gsap.context(() => {

        }, overlayRef);
        return () => ctx.revert();
    }, []);

    // Animation à chaque changement de route (Sortie de l'overlay)
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.killTweensOf(overlayRef.current);

            gsap.to(overlayRef.current, {
                scaleY: 0,
                transformOrigin: 'top',
                duration: 1,
                ease: 'power4.inOut',
                onComplete: () => {
                    gsap.set(overlayRef.current, { pointerEvents: 'none' });
                }
            });
        }, overlayRef);

        return () => ctx.revert();
    }, [location.pathname]);


    // Fonction de transition vers une nouvelle page (Entrée de l'overlay)
    const transitionTo = (path) => {
        setIsTransitioning(true);

        const ctx = gsap.context(() => {
            gsap.killTweensOf(overlayRef.current);

            gsap.fromTo(overlayRef.current,
                { scaleY: 0, transformOrigin: 'bottom' },
                {
                    scaleY: 1,
                    duration: 1,
                    ease: 'power4.inOut',
                    onComplete: () => {
                        navigate(path);
                        setIsTransitioning(false);
                    }
                }
            );
        }, overlayRef);
    };

    return (
        <TransitionContext.Provider value={{ transitionTo }}>
            {children}
            <div
                ref={overlayRef}
                className="page-transition-overlay"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100dvh',
                    backgroundColor: '#000',
                    zIndex: 99999,
                    pointerEvents: 'none',
                    transform: 'scaleY(1)'
                }}
            />
        </TransitionContext.Provider>
    );
};
