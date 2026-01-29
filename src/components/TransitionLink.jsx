import React from 'react';
import { useTransitionHelper } from '../context/TransitionContext';

// Composant personnalisé pour gérer les liens avec des transitions de page
const TransitionLink = ({ to, className, children, ...props }) => {
    const { transitionTo } = useTransitionHelper();

    const handleClick = (e) => {
        // Intercepte le clic pour les liens internes commençant par slash
        if (to && to.startsWith('/')) {
            e.preventDefault();
            if (transitionTo) {
                transitionTo(to);
            }
        }
    };

    return (
        <a
            href={to}
            className={className}
            onClick={handleClick}
            {...props}
            style={{ cursor: 'pointer', ...props.style }}
        >
            {/* Protection pour l'erreur removeChild : on enveloppe le texte */}
            <span>{children}</span>
        </a>
    );
};

// Export par défaut du composant
export default TransitionLink;