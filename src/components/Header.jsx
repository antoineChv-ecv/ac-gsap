import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import TransitionLink from './TransitionLink';
import { useTransitionHelper } from '../context/TransitionContext';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const isProjectPage = location.pathname.includes('/project/');
    const { transitionTo } = useTransitionHelper();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavigation = (e, id) => {
        e.preventDefault();
        setIsMenuOpen(false);

        if (location.pathname === '/' || location.pathname === '/index.html') {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            transitionTo('/#' + id);
        }
    };

    const headerClass = `site-header ${isScrolled ? 'scrolled' : ''} ${isProjectPage || isMenuOpen ? 'header-inverse' : ''} ${isMenuOpen ? 'menu-open' : ''}`;
    return (
        <>
            <header className={headerClass}>
                <div className="header-logo">
                    <TransitionLink to="/">
                        <span>ANTOINE CHAUVEAU</span>
                    </TransitionLink>
                </div>

                <nav className="header-nav desktop-only">
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

                <button className={`header-burger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle Menu">
                    <span></span>
                    <span></span>
                </button>
            </header>

            <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
                <nav className="mobile-nav">
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

export default Header;