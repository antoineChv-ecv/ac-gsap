import React, { useEffect } from 'react' // Import des hooks React nécessaires
import gsap from 'gsap' // Importation de GSAP pour les animations utilisées par MouseFollower
import MouseFollower from 'mouse-follower'; // Import de la librairie MouseFollower pour un curseur personnalisé
import 'mouse-follower/dist/mouse-follower.min.css'; // Import des styles CSS par défaut de MouseFollower

const CustomCursor = () => {
    useEffect(() => {
        // Enregistre GSAP auprès de MouseFollower pour permettre les animations
        MouseFollower.registerGSAP(gsap)

        // Initialisation du curseur personnalisé avec ses options
        const cursor = new MouseFollower({
            speed: 0.5, // Vitesse de suivi du curseur (plus bas = plus fluide/lent)
            skewing: 1, // Intensité de l'effet de déformation (skew) lors du mouvement
            skewingText: 2 // Intensité de la déformation sur le texte
        })

        // Fonction de nettoyage appelée au démontage du composant
        return () => {
            cursor.destroy() // Détruit l'instance du curseur pour nettoyer les événements et éléments DOM
        }
    }, []) // Exécuté une seule fois au montage

    // Ce composant ne rend rien dans le DOM React directement, il gère un effet global
    return null
}

export default CustomCursor // Export du composant