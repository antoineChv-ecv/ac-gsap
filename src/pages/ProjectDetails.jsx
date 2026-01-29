import React, { useRef, useLayoutEffect } from 'react'; // useLayoutEffect pour des calculs synchrones avant peinture
import { useParams } from 'react-router-dom'; // Hook pour récupérer les paramètres d'URL (id)
import gsap from 'gsap'; // GSAP pour animations
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Plugin ScrollTrigger
import TransitionLink from '../components/TransitionLink'; // Lien avec transition
import Header from '../components/Header'; // En-tête
import { content } from '../data/content'; // Données du projet

gsap.registerPlugin(ScrollTrigger); // Enregistrement

const ProjectDetails = () => {
    const { id } = useParams(); // Récupère l'ID depuis l'URL /project/:id
    const projectId = parseInt(id) || 0; // Convertit en entier, fallback sur 0
    const project = content.projects[projectId] || content.projects[0]; // Sélectionne le projet correspondant
    const containerRef = useRef(null); // Ref pour le conteneur principal
    const trackRef = useRef(null); // Ref pour la piste horizontale (track)

    // Fonction appelée quand une image est chargée pour recalculer les positions de ScrollTrigger
    const handleImageLoad = () => {
        ScrollTrigger.refresh();
    };

    // Utilisation de useLayoutEffect pour éviter les flashs visuels avec ScrollTrigger
    useLayoutEffect(() => {
        window.scrollTo(0, 0); // Réinitialise le scroll en haut

        const ctx = gsap.context(() => {
            const track = trackRef.current;
            const viewportWidth = window.innerWidth;

            // Activation du scroll horizontal uniquement sur Desktop (> 900px)
            if (viewportWidth > 900 && track) {

                // Animation de défilement horizontal de la piste
                gsap.to(track, {
                    x: () => {
                        // Recalcul dynamique de la distance à parcourir : -(largeur totale - largeur fenêtre)
                        return -(track.scrollWidth - window.innerWidth);
                    },
                    ease: "none", // Linéaire
                    scrollTrigger: {
                        trigger: containerRef.current, // Déclencheur : conteneur principal
                        start: "top top", // Commence tout en haut
                        // La durée du scroll (end) correspond à la largeur de défilement
                        end: () => `+=${track.scrollWidth - window.innerWidth}`,
                        pin: true, // Épingle la section (la fige visuellement pendant le scroll physique)
                        scrub: 1, // Synchronisation fluide
                        invalidateOnRefresh: true, // Recalcule les valeurs au redimensionnement
                    }
                });
            }
        }, containerRef);

        return () => {
            // Nettoyage impératif pour éviter les conflits de mémoire ou doublons
            ScrollTrigger.getAll().forEach(t => t.kill());
            ctx.revert();
        };
    }, [projectId]); // Se ré-exécute si l'ID du projet change

    return (
        <React.Fragment>
            <Header /> {/* Barre de navigation */}

            {/* Conteneur épinglé pour le scroll horizontal */}
            <div className="project-page" ref={containerRef}>
                <div className="horizontal-section">
                    {/* Piste contenant tous les éléments (cartes) alignés horizontalement */}
                    <div className="horizontal-track" ref={trackRef}>

                        {/* Carte d'introduction (Titre, Desc) */}
                        <div className="project-card intro-card">
                            <div className="intro-content">
                                <span className="project-category">{project.category}</span>
                                <h1 className="project-title-huge">{project.title}</h1>
                                <div className="project-separator"></div>
                                <p className="project-desc-text">{project.description}</p>
                                <p className="project-desc-sub">
                                    Une exploration de la lumière, de la texture et de l'émotion. Capturer l'essence brute de l'instant.
                                </p>
                            </div>
                        </div>

                        {/* Boucle sur la galerie d'images */}
                        {project.gallery && project.gallery.map((item, index) => (
                            <React.Fragment key={index}>
                                {/* Carte Image : classe dynamique selon orientation landscape/portrait */}
                                <div className={`project-card image-card ${item.type === 'landscape' ? 'wide' : 'portrait'}`}>
                                    <img src={item.url} alt={`Gallery ${index}`} onLoad={handleImageLoad} />
                                </div>
                                {/* Insertion d'une citation après la deuxième image (index 1) */}
                                {index === 1 && (
                                    <div className="project-card text-card">
                                        <blockquote>
                                            "{content.ui.quote}"
                                        </blockquote>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Navigation fixe en bas de page (Précédent / Suivant) */}
                <div className="project-fixed-bottom-nav">
                    {/* Lien retour Accueil */}
                    <TransitionLink to="/" className="fixed-nav-link left">
                        <span className="icon">←</span>
                        <span>{content.ui.home}</span>
                    </TransitionLink>

                    {/* Indicateur central (Titre du projet) */}
                    <div className="fixed-nav-progress">
                        <span>{project.title}</span>
                    </div>

                    {/* Lien Projet Suivant (boucle avec modulo) */}
                    <TransitionLink to={`/project/${(projectId + 1) % content.projects.length}`} className="fixed-nav-link right">
                        <span>{content.ui.next}</span>
                        <span className="icon">→</span>
                    </TransitionLink>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ProjectDetails;
