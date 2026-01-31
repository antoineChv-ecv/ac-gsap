// Hero Images - Manual imports to ensure specific ones are used for Hero
import img1 from '../assets/Sport/Handball/LH 07_09_2024-30-horizontal.jpg';
import img2 from '../assets/Evenement_Concert/Flamme olympique/Flamme para-07-vertical.jpg';
import img3 from '../assets/Portrait/Ville/nathan-02.jpg';
import aboutImg from '../assets/about_illustration_1765023824604.png';

// ----------------------------------------------------------------------
// DYNAMIC ASSET LOADING
// ----------------------------------------------------------------------

const allImages = import.meta.glob('../assets/**/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default'
});


const getImagesByCategory = (categoryKeyword, subCategories = []) => {
    return Object.entries(allImages)
        .filter(([path, url]) => {
            // Check main category
            const isInMain = path.includes(categoryKeyword);

            // Should also check subcategories if provided to be more specific or inclusive
            // For now, simpler inclusion matches are effective
            return isInMain;
        })
        .map(([path, url]) => {
            // Determine orientation based on filename
            const lowerPath = path.toLowerCase();
            let type = 'landscape';
            if (lowerPath.includes('vertical') || lowerPath.includes('portrait')) {
                type = 'portrait';
            } else if (lowerPath.includes('horizontal') || lowerPath.includes('landscape') || lowerPath.includes('wide')) {
                type = 'landscape';
            } else {
                // Fallback or Image proportions check? 
                // Without reading dimensions, we default to landscape unless specified
                type = 'landscape';
            }

            return { url, type };
        });
};

const concertGallery = getImagesByCategory('Groupe de musique');
const festivalGallery = getImagesByCategory('Festival');
const flammeGallery = getImagesByCategory('Flamme olympique');

const courseAutoGallery = getImagesByCategory('Course Auto');
const voitureGallery = getImagesByCategory('Voiture');



const portraitVilleGallery = getImagesByCategory('Ville');


const veloGallery = getImagesByCategory('Vélo');
const handballGallery = getImagesByCategory('Handball');


// ----------------------------------------------------------------------
// CONTENT DATA
// ----------------------------------------------------------------------

export const content = {
    site: {
        title: "ANTOINE CHAUVEAU",
        email: "contact@antoinechauveau.com",
        socials: {
            instagram: "https://www.instagram.com/ac_conception/",
            linkedin: "https://www.linkedin.com/in/antoine-chauveau-limoges/",
            behance: "#"
        }
    },

    ui: {
        explore: "Explorer",
        home: "Accueil",
        next: "Suivant",
        follow: "Suivre",
        quote: "La photographie est une histoire que je n'arrive pas à mettre en mots."
    },

    hero: {
        titleLine1: "Moments",
        titleLine2: "inoubliables",
        images: [img1, img2, img3]
    },

    about: {
        image: aboutImg,
        text: "Je suis un photographe passionné spécialisé dans la photographie sportive, le voyage et l'événementiel. Ce qui m'anime au quotidien ? La soif de découverte et le plaisir de la rencontre."
    },

    footer: {
        cta: "Créons ensemble",
        copyright: "© 2025 Tous droits réservés"
    },

    projects: [
        // --- SPORT ---
        {
            id: 0,
            title: "VÉLO",
            category: "Sport",
            image: veloGallery[0]?.url || img1,
            subtitle: "Vitesse et Endurance",
            location: "Route",
            description: "La beauté du cyclisme, entre effort solitaire et peloton effréné.",
            gallery: veloGallery
        },

        {
            id: 2,
            title: "HANDBALL",
            category: "Sport",
            image: handballGallery[0]?.url || img1,
            subtitle: "Esprit d'Équipe",
            location: "Terrain",
            description: "L'intensité du jeu, la force du collectif et la beauté du geste.",
            gallery: handballGallery
        },


        // --- PORTRAIT ---
        {
            id: 6,
            title: "PORTRAIT VILLE",
            category: "Portrait",
            image: portraitVilleGallery[0]?.url || img3,
            subtitle: "Visages Urbains",
            location: "Extérieur",
            description: "Des portraits réalisés à la lumière naturelle, au cœur de la ville.",
            gallery: portraitVilleGallery
        },
        // --- AUTOMOBILE ---
        {
            id: 8,
            title: "COURSE AUTO",
            category: "Automobile",
            image: courseAutoGallery[0]?.url || img1,
            subtitle: "Adrénaline",
            location: "Circuit",
            description: "La fureur des moteurs et la quête de la performance ultime.",
            gallery: courseAutoGallery
        },
        {
            id: 9,
            title: "VOITURE",
            category: "Automobile",
            image: voitureGallery[0]?.url || img1,
            subtitle: "Belles Mécaniques",
            location: "Showroom",
            description: "Design et élégance automobile sous toutes les coutures.",
            gallery: voitureGallery
        },

        // --- ÉVÉNEMENT ---
        {
            id: 10,
            title: "FESTIVAL",
            category: "Événement",
            image: festivalGallery[0]?.url || img1,
            subtitle: "Fête et Musique",
            location: "Plein Air",
            description: "L'ambiance unique des festivals, entre musique et convivialité.",
            gallery: festivalGallery
        },
        {
            id: 11,
            title: "FLAMME OLYMPIQUE",
            category: "Événement",
            image: flammeGallery[0]?.url || img1,
            subtitle: "Histoire",
            location: "France",
            description: "Le passage de la flamme, un moment historique et symbolique.",
            gallery: flammeGallery
        },
        {
            id: 12,
            title: "CONCERT",
            category: "Événement",
            image: concertGallery[0]?.url || img1,
            subtitle: "Live",
            location: "Scène",
            description: "L'émotion directe de la scène et la communion avec le public.",
            gallery: concertGallery
        }
    ]
};
