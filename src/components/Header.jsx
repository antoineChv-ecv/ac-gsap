import React, { useState, useEffect } from 'react'; // Import des hooks React
import { useLocation } from 'react-router-dom'; // Import du hook useLocation pour connaître la page actuelle

import TransitionLink from './TransitionLink'; // Import du composant de lien avec transition personnalisée
import { useTransitionHelper } from '../context/TransitionContext'; // Import du helper de transition depuis le contexte

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false); // État pour savoir si la page a été scrollée
    const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour gérer l'ouverture/fermeture du menu mobile
    const location = useLocation(); // Obtient l'objet location actuel
    const isProjectPage = location.pathname.includes('/project/'); // Vérifie si on est sur une page de détail de projet
    const { transitionTo } = useTransitionHelper(); // Récupère la fonction de transition du contexte

    // Effet pour détecter le scroll de la fenêtre
    useEffect(() => {
        const handleScroll = () => {
            // Si le scroll vertical est supérieur à 50px, on considère que c'est "scrolled"
            setIsScrolled(window.scrollY > 50);
        };

        // Ajout de l'écouteur d'événement scroll
        window.addEventListener('scroll', handleScroll);
        // Nettoyage de l'écouteur au démontage
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Effet pour fermer le menu mobile automatiquement quand on change de page
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    // Fonction pour basculer l'état du menu (ouvert/fermé)
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Gestion de la navigation vers les ancres (#about, #work, etc.)
    const handleNavigation = (e, id) => {
        e.preventDefault(); // Empêche le comportement par défaut du lien
        setIsMenuOpen(false); // Ferme le menu

        // Si on est déjà sur la page d'accueil
        if (location.pathname === '/' || location.pathname === '/index.html') {
            const element = document.getElementById(id); // Trouve l'élément cible
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' }); // Scrolle doucement vers l'élément
            }
        } else {
            // Si on est sur une autre page, on utilise la transition pour aller à l'accueil avec l'ancre
            transitionTo('/#' + id);
        }
    };

    // Construction dynamique des classes CSS pour le header
    // 'scrolled' si on a défilé, 'header-inverse' si on est sur une page projet ou menu ouvert (pour changer la couleur du texte), 'menu-open' si menu ouvert
    const headerClass = `site-header ${isScrolled ? 'scrolled' : ''} ${isProjectPage || isMenuOpen ? 'header-inverse' : ''} ${isMenuOpen ? 'menu-open' : ''}`;

    return (
        <>
            <header className={headerClass}>
                <div className="header-logo">
                    {/* Lien vers l'accueil avec transition */}
                    <TransitionLink to="/">
                        <span>ANTOINE CHAUVEAU</span>
                    </TransitionLink>
                </div>

                {/* Navigation Desktop */}
                <nav className="header-nav desktop-only">
                    {/* Liens vers les sections avec gestion personnalisée du clic */}
                    <a href="#about" className="nav-link" onClick={(e) => handleNavigation(e, 'about')}>
                        <span>About</span>
                    </a>
                    <a href="#work" className="nav-link" onClick={(e) => handleNavigation(e, 'work')}>
                        <span>Work</span>
                    </a>
                    <a href="#contact" className="nav-link" onClick={(e) => handleNavigation(e, 'contact')}>
                        <span>Contact</span>
                    </a>
                </nav>

                {/* Bouton Burger pour le menu mobile */}
                <button className={`header-burger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle Menu">
                    <span></span>
                    <span></span>
                </button>
            </header>

            {/* Menu Mobile (Overlay) */}
            <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
                <nav className="mobile-nav">
                    {/* Même liens que le desktop mais stylisés pour mobile */}
                    <a href="#about" className="mobile-nav-link" onClick={(e) => handleNavigation(e, 'about')}>
                        <span>About</span>
                    </a>
                    <a href="#work" className="mobile-nav-link" onClick={(e) => handleNavigation(e, 'work')}>
                        <span>Work</span>
                    </a>
                    <a href="#contact" className="mobile-nav-link" onClick={(e) => handleNavigation(e, 'contact')}>
                        <span>Contact</span>
                    </a>
                </nav>
            </div>
        </>
    );
};

export default Header; // Export du composant Header