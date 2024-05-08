import { createContext } from "react";
export const ThemeContext = createContext("light");


//= function to redirect to home with error message
export const PageError = () => {
    return
    <h1>Une erreur est survenue</h1>
    console.error('error.message');
}