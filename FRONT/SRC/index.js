import './index.scss';
import 'reset.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app';
import { DarkModeProvider } from './util';



//=container is the element that will contain the entire app, it retrieves a div with a given id
const container = document.getElementById("app");

//=root is the root element created from the render target in the DOM
const root = createRoot(container);






root.render(
    <>
        <React.StrictMode>
            <DarkModeProvider>
                < App />
            </DarkModeProvider >
        </React.StrictMode >
    </>
)