import './index.scss';
//import 'reset.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/APP';
import { DarkModeProvider } from './util';
import themeClass from './components/APP';





//=container is the element that will contain the entire app, it retrieves a div with a given id
const container = document.getElementById("app");

//=root is the root element created from the render target in the DOM
const root = createRoot(container);




root.render(
    <>
        <React.StrictMode>
            <DarkModeProvider value={themeClass}>
                < App />
            </DarkModeProvider >
        </React.StrictMode >
    </>
)