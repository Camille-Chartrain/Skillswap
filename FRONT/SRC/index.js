import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";

// Créer un "root" avec createRoot
const root = ReactDOM.createRoot(document.getElementById('app'));

// Utiliser la méthode render sur le root créé
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);