import React from 'react'; // Import React
import { useTransitionHelper } from '../context/TransitionContext'; // Import du hook personnalisé pour les transitions

// Composant personnalisé pour gérer les liens avec des transitions de page
const TransitionLink = ({ to, className, children, ...props }) => {
    // Récupère la fonction transitionTo du contexte
    const { transitionTo } = useTransitionHelper();

    // Gestionnaire de clic
    const handleClick = (e) => {
        // Intercepte le clic pour les liens internes commençant par slash
        if (to && to.startsWith('/')) {
            e.preventDefault(); // Empêche la navigation immédiate par défaut
            if (transitionTo) {
                transitionTo(to); // Déclenche la transition personnalisée vers la destination
            }
        }
    };

    return (
        <a
            href={to}
            className={className}
            onClick={handleClick}
            {...props} // Passe les autres props (comme id, etc.)
            style={{ cursor: 'pointer', ...props.style }} // Assure que le curseur est un pointeur
        >
            {/* Protection pour l'erreur removeChild : on enveloppe le texte dans un span ou on rend les enfants directement */}
            {/* Note: Dans certains cas React/GSAP, avoir un wrapper aide à éviter des conflits de suppression de noeuds */}
            <span>{children}</span>
        </a>
    );
};

// Export par défaut du composant
export default TransitionLink;