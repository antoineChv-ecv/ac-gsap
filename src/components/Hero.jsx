import { useEffect, useRef } from 'react'; // Import des hooks useEffect et useRef de React
import gsap from 'gsap'; // Import de GSAP pour les animations
import SplitType from 'split-type'; // Import de SplitType pour diviser le texte en caractères/mots pour l'animation
import { content } from '../data/content'; // Import des données de contenu (textes et images)

const Hero = () => {
    const heroRef = useRef(null); // Référence pour la section Hero principale
    const titleRef = useRef(null); // Référence pour la première ligne du titre
    const italicRef = useRef(null); // Référence pour la partie en italique du titre
    const imagesRef = useRef([]); // Tableau de références pour les images animées

    // Sélection de 8 images depuis les projets pour l'effet de dispersion
    // Si pas assez d'images, on boucle sur celles existantes
    const allImages = content.projects.map(p => p.image); // Récupère toutes les images des projets
    const scatteredImages = [];
    for (let i = 0; i < 8; i++) {
        scatteredImages.push(allImages[i % allImages.length]); // Remplit le tableau avec 8 images (en bouclant si nécessaire)
    }

    useEffect(() => {
        let mainText, italicText; // Variables pour stocker les instances SplitType
        // Utilisation de gsap.context pour un nettoyage facile des animations et sélecteurs
        const ctx = gsap.context(() => {
            // Division du texte en caractères pour l'animation
            mainText = new SplitType(titleRef.current, { types: 'chars' });
            italicText = new SplitType(italicRef.current, { types: 'chars' });

            const tl = gsap.timeline({ delay: 0.5 }); // Création d'une timeline avec un délai initial de 0.5s

            // 1. Animation des caractères du titre principal ("Moments")
            tl.from(mainText.chars, {
                y: 100, // Commence 100px plus bas
                opacity: 0, // Commence invisible
                duration: 1, // Durée de 1 seconde
                stagger: 0.05, // Décalage de 0.05s entre chaque caractère
                ease: "power4.out" // Courbe d'animation fluide en sortie
            });

            // 2. Animation des caractères du texte en italique ("inoubliables")
            tl.from(italicText.chars, {
                y: 100, // Commence 100px plus bas
                opacity: 0, // Commence invisible
                duration: 1, // Durée de 1 seconde
                stagger: 0.05, // Décalage de 0.05s entre chaque caractère
                ease: "power4.out" // Courbe d'animation
            }, "-=0.8"); // Commence 0.8s avant la fin de l'animation précédente (chevauchement)

            // 3. Révélation des images dispersées
            tl.from(imagesRef.current, {
                scale: 0, // Commence à l'échelle 0
                opacity: 0, // Commence invisible
                duration: 1, // Durée
                stagger: {
                    amount: 0.8, // Temps total de décalage réparti sur tous les éléments
                    from: "random" // Ordre d'apparition aléatoire
                },
                ease: "back.out(1.7)" // Effet de rebond à l'arrivée
            }, "-=1"); // Chevauchement important avec l'animation précédente

            // 4. Effet de Parallaxe au scroll
            imagesRef.current.forEach((img, i) => {
                const depth = (i % 3) + 1; // Calcule une "profondeur" fictive (1, 2 ou 3)
                const movement = depth * 50; // Détermine l'amplitude du mouvement basée sur la profondeur

                gsap.to(img, {
                    y: -movement, // Déplace l'image vers le haut lors du scroll
                    ease: "none", // Pas d'accélération (linéaire)
                    scrollTrigger: {
                        trigger: heroRef.current, // Déclenché par la section Hero
                        start: "top top", // Commence quand le haut du Hero est en haut de l'écran
                        end: "bottom top", // Finit quand le bas du Hero est en haut de l'écran
                        scrub: true // Lie l'animation à la barre de défilement (va et vient)
                    }
                });
            });

        }, heroRef); // Scope le contexte GSAP à la ref heroRef

        // Nettoyage au démontage du composant
        return () => {
            if (mainText) mainText.revert(); // Annule les modifications de SplitType
            if (italicText) italicText.revert();
            ctx.revert(); // Tue toutes les animations et ScrollTriggers créés dans ce contexte
        };
    }, []);

    // Fonction pour ajouter les références des images au tableau imagesRef
    const addToRefs = (el) => {
        if (el && !imagesRef.current.includes(el)) {
            imagesRef.current.push(el);
        }
    };

    return (
        <section className="hero-section" ref={heroRef}>
            <div className="hero-content">
                <h1 className="hero-title">
                    <div ref={titleRef}>{content.hero.titleLine1}</div> {/* Première ligne du titre */}
                    <span className="italic" ref={italicRef}>{content.hero.titleLine2}</span> {/* Deuxième ligne en italique */}
                </h1>

                <div className="hero-images">
                    {/* Génération automatique des div pour les images dispersées */}
                    {scatteredImages.map((img, index) => (
                        <div
                            key={index}
                            className={`hero-img img-${index + 1}`} // Classes pour le style CSS spécifique
                            ref={addToRefs} // Ajout à la liste des refs
                            style={{ backgroundImage: `url(${img})` }} // Image en background
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
