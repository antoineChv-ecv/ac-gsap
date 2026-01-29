// Pied de page simple avec liens sociaux
const Footer = () => {
    return (
        <footer className="refined-footer">
            <div className="footer-bottom">
                <div className="footer-col left">
                    <span className="footer-brand">ANTOINE CHAUVEAU</span>
                </div>
                <div className="footer-col center">
                    <a href="https://www.instagram.com/ac_conception/" target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a>
                    <a href="https://www.linkedin.com/in/antoine-chauveau-limoges/" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
                </div>

                <div className="footer-col right">
                    <span className="copyright">© 2025 All Rights Reserved</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
