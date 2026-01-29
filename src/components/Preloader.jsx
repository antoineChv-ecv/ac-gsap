import React, { useEffect, useRef, useState } from 'react' // Importation des hooks React nécessaires : useEffect pour les effets de bord, useRef pour les références DOM, useState pour l'état local
import gsap from 'gsap' // Importation de la bibliothèque GSAP pour les animations

// Définition du composant Preloader qui prend une prop 'onLoadComplete' (fonction à appeler quand le chargement est fini)
const Preloader = ({ onLoadComplete }) => {
    const containerRef = useRef(null) // Création d'une référence pour l'élément conteneur du preloader (pour l'animer)
    const percentRef = useRef(null) // Création d'une référence pour l'élément affichant le pourcentage (pour l'animer)
    const [percent, setPercent] = useState(0) // État local pour suivre la progression du chargement, initialisé à 0

    // Premier useEffect : Simulation de la progression du chargement
    useEffect(() => {
        // Création d'un intervalle qui s'exécute toutes les 100ms
        const interval = setInterval(() => {
            // Mise à jour de l'état 'percent'
            setPercent(prev => {
                // Si le pourcentage atteint ou dépasse 100
                if (prev >= 100) {
                    clearInterval(interval) // On arrête l'intervalle car le chargement est fini
                    return 100 // On s'assure que la valeur reste à 100
                }
                // Sinon, on incrémente le pourcentage d'une valeur aléatoire entre 1 et 10
                // Math.random() * 10 donne un nombre entre 0 et 10
                // Math.floor arrondit à l'entier inférieur
                // On ajoute 1 pour avoir au minimum +1
                // Math.min(..., 100) s'assure qu'on ne dépasse jamais 100
                return Math.min(prev + Math.floor(Math.random() * 10) + 1, 100)
            })
        }, 100) // Délai de 100ms entre chaque exécution

        // Fonction de nettoyage appelée si le composant est démonté avant la fin
        return () => clearInterval(interval)
    }, []) // Le tableau vide [] signifie que cet effet ne s'exécute qu'une fois au montage du composant

    // Second useEffect : Gestion de l'animation de sortie une fois le chargement terminé
    useEffect(() => {
        // On vérifie si le pourcentage a atteint 100%
        if (percent === 100) {
            // Création d'une timeline GSAP pour séquencer les animations
            const tl = gsap.timeline({
                // Callback appelé une fois que toute la timeline est terminée
                onComplete: () => {
                    // Si la prop onLoadComplete existe, on l'exécute pour prévenir le parent
                    if (onLoadComplete) onLoadComplete()
                }
            })

            // Animation du texte de pourcentage
            tl.to(percentRef.current, {
                opacity: 0, // On le rend transparent
                duration: 0.5, // Durée de 0.5 seconde
                ease: 'power2.out' // Courbe d'accélération fluide en sortie
            })
                // Animation du conteneur principal (le rideau noir)
                .to(containerRef.current, {
                    yPercent: -100, // On déplace l'élément de 100% de sa hauteur vers le haut
                    duration: 1.2, // Durée de 1.2 secondes
                    ease: 'power4.inOut' // Courbe d'accélération très fluide (entrée et sortie)
                }, '-=0.2') // L'animation commence 0.2s avant la fin de la précédente (chevauchement)
        }
    }, [percent, onLoadComplete]) // Cet effet se ré-exécute si 'percent' ou 'onLoadComplete' change

    // Rendu du composant
    return (
        // Div conteneur avec la référence pour l'animation GSAP
        <div ref={containerRef} className="preloader">
            <div className="preloader-content">
                {/* Titre affichant le pourcentage, avec sa référence pour l'animation */}
                <h1 ref={percentRef} className="preloader-percent">
                    {Math.min(percent, 100)}% {/* Affiche le pourcentage, plafonné à 100% */}
                </h1>
            </div>
        </div>
    )
}

export default Preloader // Export du composant pour pouvoir l'utiliser ailleurs
