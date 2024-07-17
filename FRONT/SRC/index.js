import React from 'react';
import ReactDOM from "react-dom"
import App from './components/APP';
import { BrowserRouter } from "react-router-dom"






//=container is the element that will contain the entire app, it retrieves a span with a given id
const container = document.getElementById("app");

//=root is the root element created from the render target in the DOM
const root = createRoot(container);




ReactDOM.render(
    <BrowserRouter>
        < App />
    </BrowserRouter>,
    document.getElementById("root")
)