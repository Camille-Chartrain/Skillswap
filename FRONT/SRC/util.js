import { createContext } from "react";

export const ThemeContext = createContext("light");


export const PageError = () => {
    const error = useRouteError();
    return
    <h1>Une erreur est survenue</h1>
    console.error('error.message');
}