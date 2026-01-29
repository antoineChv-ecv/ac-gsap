import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

const PageTransition = () => {
    const location = useLocation();
    const overlayRef = useRef(null);
    const isInitialLoad = useRef(true);

    useEffect(() => {
        if (isInitialLoad.current) {
            isInitialLoad.current = false;
            return;
        }

        const ctx = gsap.context(() => {
            gsap.fromTo(overlayRef.current,
                { scaleY: 1, transformOrigin: 'top' },
                { scaleY: 0, duration: 1, ease: 'power4.inOut', delay: 0.2 }
            );
        }, overlayRef);

        return () => ctx.revert();
    }, [location]);


    return (
        <div
            ref={overlayRef}
            className="page-transition-overlay"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                backgroundColor: '#000000',
                zIndex: 99999,
                pointerEvents: 'none',
                transform: 'scaleY(0)',
                transformOrigin: 'bottom'
            }}
        />
    );
};

export default PageTransition;
