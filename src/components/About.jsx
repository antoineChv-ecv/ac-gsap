import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { content } from '../data/content';
gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const imgContainerRef = useRef(null);

    useEffect(() => {
        let split;
        const ctx = gsap.context(() => {
            // Division du texte en lignes et mots pour l'animation
            split = new SplitType(textRef.current, { types: 'lines, words' });
            const words = split.words;

            // Création de la timeline liée au scroll
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=150%",
                    pin: true, // Épingle la section pendant le scroll
                    scrub: 1, // Synchronise l'animation avec le scroll
                }
            });

            // Animation d'entrée de l'image (opacité et échelle)
            tl.from(imgContainerRef.current, {
                opacity: 0,
                scale: 0.8,
                duration: 1,
                ease: "power2.out"
            }, 0);

            // Déplacement vertical de l'image
            tl.to(imgContainerRef.current, {
                y: -50,
                scale: 1.1,
                ease: "none"
            }, 0);

            // Apparition progressive des mots
            gsap.set(words, { opacity: 0.1 });
            tl.to(words, {
                opacity: 1,
                duration: 0.5,
                stagger: 0.02,
                ease: "none"
            }, 0.2)

        }, sectionRef);

        return () => {
            if (split) split.revert();
            ctx.revert();
        };
    }, []);

    return (
        <div className="about-wrapper">
            <section className="about-section" ref={sectionRef}>
                <div className="about-container">
                    <div className="about-img-container" ref={imgContainerRef}>
                        <img src={content.about.image} alt="About Me" className="about-illustration" />
                    </div>
                    <p className="about-text" ref={textRef}>
                        {content.about.text}
                    </p>
                </div>
            </section>
        </div>
    );
};

export default About;
