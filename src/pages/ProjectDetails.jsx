import React, { useRef, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TransitionLink from '../components/TransitionLink';
import Header from '../components/Header';
import { content } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

const ProjectDetails = () => {
    const { id } = useParams();
    const projectId = parseInt(id) || 0;
    const project = content.projects[projectId] || content.projects[0];
    const containerRef = useRef(null);
    const trackRef = useRef(null);

    const handleImageLoad = () => {
        ScrollTrigger.refresh();
    };

    // Utilisation de useLayoutEffect pour éviter les flashs visuels avec ScrollTrigger
    useLayoutEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            const track = trackRef.current;
            const viewportWidth = window.innerWidth;

            // Activation du scroll horizontal uniquement sur Desktop (> 900px)
            if (viewportWidth > 900 && track) {
                // Initial calculation
                let totalWidth = track.scrollWidth;

                gsap.to(track, {
                    x: () => {
                        // Recalculate width dynamically during refresh/execution
                        return -(track.scrollWidth - window.innerWidth);
                    },
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: () => `+=${track.scrollWidth - window.innerWidth}`, // Dynamic end based on content
                        pin: true, // Épingle le conteneur pendant le scroll
                        scrub: 1, // Fluidité du scroll
                        invalidateOnRefresh: true,
                    }
                });
            }
        }, containerRef);

        return () => {
            // Nettoyage impératif pour éviter les conflits de mem
            ScrollTrigger.getAll().forEach(t => t.kill());
            ctx.revert();
        };
    }, [projectId]);

    return (
        <React.Fragment>
            <Header />
            <div className="project-page" ref={containerRef}>
                <div className="horizontal-section">
                    <div className="horizontal-track" ref={trackRef}>

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
                        {project.gallery && project.gallery.map((item, index) => (
                            <React.Fragment key={index}>
                                <div className={`project-card image-card ${item.type === 'landscape' ? 'wide' : 'portrait'}`}>
                                    <img src={item.url} alt={`Gallery ${index}`} onLoad={handleImageLoad} />
                                </div>
                                {/* Insert quote after the second image (index 1) */}
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

                <div className="project-fixed-bottom-nav">
                    <TransitionLink to="/" className="fixed-nav-link left">
                        <span className="icon">←</span>
                        <span>{content.ui.home}</span>
                    </TransitionLink>

                    <div className="fixed-nav-progress">
                        <span>{project.title}</span>
                    </div>

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
