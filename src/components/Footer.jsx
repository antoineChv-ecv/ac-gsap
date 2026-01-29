// Pied de page simple avec liens sociaux
const Footer = () => {
    return (
        // Balise sémantique footer avec une classe CSS pour le style
        <footer className="refined-footer">
            <div className="footer-bottom">
                {/* Colonne de gauche : Nom de la marque */}
                <div className="footer-col left">
                    <span className="footer-brand">ANTOINE CHAUVEAU</span>
                </div>

                {/* Colonne centrale : Liens vers les réseaux sociaux */}
                <div className="footer-col center">
                    {/* Lien Instagram - s'ouvre dans un nouvel onglet (target="_blank") */}
                    <a href="https://www.instagram.com/ac_conception/" target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a>
                    {/* Lien LinkedIn */}
                    <a href="https://www.linkedin.com/in/antoine-chauveau-limoges/" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
                </div>

                {/* Colonne de droite : Copyright */}
                <div className="footer-col right">
                    <span className="copyright">© 2025 All Rights Reserved</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer; // Export du composant Footer
