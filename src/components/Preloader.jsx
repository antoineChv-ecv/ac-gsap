import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const Preloader = ({ onLoadComplete }) => {
    const containerRef = useRef(null)
    const percentRef = useRef(null)
    const [percent, setPercent] = useState(0)

    useEffect(() => {
        // Simulation du chargement
        const interval = setInterval(() => {
            setPercent(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    return 100
                }
                return Math.min(prev + Math.floor(Math.random() * 10) + 1, 100)
            })
        }, 100)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        // Déclencher l'animation de sortie une fois le chargement terminé (100%)
        if (percent === 100) {
            const tl = gsap.timeline({
                onComplete: () => {
                    if (onLoadComplete) onLoadComplete()
                }
            })

            tl.to(percentRef.current, {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out'
            })
                .to(containerRef.current, {
                    yPercent: -100,
                    duration: 1.2,
                    ease: 'power4.inOut'
                }, '-=0.2')
        }
    }, [percent, onLoadComplete])

    return (
        <div ref={containerRef} className="preloader">
            <div className="preloader-content">
                <h1 ref={percentRef} className="preloader-percent">
                    {Math.min(percent, 100)}%
                </h1>
            </div>
        </div>
    )
}

export default Preloader
