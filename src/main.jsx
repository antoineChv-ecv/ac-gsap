import React from 'react' // Import de React
import ReactDOM from 'react-dom/client' // Import de ReactDOM pour le rendu dans le DOM
import App from './App.jsx' // Import du composant principal de l'application
import './index.scss' // Import des styles globaux

// Création de la racine de l'application React et rendu dans l'élément avec l'ID 'root'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* React.StrictMode active des vérifications et avertissements supplémentaires en développement */}
    <App />
  </React.StrictMode>,
)
