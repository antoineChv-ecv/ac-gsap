import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { content } from '../data/content';

const Hero = () => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const italicRef = useRef(null);
    const imagesRef = useRef([]);

    // Select 8 images from projects for the scattered effect
    // If not enough project images, we cycle through them
    const allImages = content.projects.map(p => p.image);
    const scatteredImages = [];
    for (let i = 0; i < 8; i++) {
        scatteredImages.push(allImages[i % allImages.length]);
    }

    useEffect(() => {
        let mainText, italicText;
        const ctx = gsap.context(() => {
            // Révélation du texte avec SplitType
            mainText = new SplitType(titleRef.current, { types: 'chars' });
            italicText = new SplitType(italicRef.current, { types: 'chars' });

            const tl = gsap.timeline({ delay: 0.5 });

            // 1. Animation de "Moments"
            tl.from(mainText.chars, {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.05,
                ease: "power4.out"
            });

            // 2. Animation de "inoubliables"
            tl.from(italicText.chars, {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.05,
                ease: "power4.out"
            }, "-=0.8");

            // 3. Révélation des images (Staggered pop)
            tl.from(imagesRef.current, {
                scale: 0,
                opacity: 0,
                duration: 1,
                stagger: {
                    amount: 0.8,
                    from: "random"
                },
                ease: "back.out(1.7)"
            }, "-=1");

            // 4. Parallax Effect
            imagesRef.current.forEach((img, i) => {
                const depth = (i % 3) + 1; // 1, 2, or 3
                const movement = depth * 50;

                gsap.to(img, {
                    y: -movement,
                    ease: "none",
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });

        }, heroRef);

        return () => {
            if (mainText) mainText.revert();
            if (italicText) italicText.revert();
            ctx.revert();
        };
    }, []);

    const addToRefs = (el) => {
        if (el && !imagesRef.current.includes(el)) {
            imagesRef.current.push(el);
        }
    };

    return (
        <section className="hero-section" ref={heroRef}>
            <div className="hero-content">
                <h1 className="hero-title">
                    <div ref={titleRef}>{content.hero.titleLine1}</div>
                    <span className="italic" ref={italicRef}>{content.hero.titleLine2}</span>
                </h1>

                <div className="hero-images">
                    {scatteredImages.map((img, index) => (
                        <div
                            key={index}
                            className={`hero-img img-${index + 1}`}
                            ref={addToRefs}
                            style={{ backgroundImage: `url(${img})` }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
