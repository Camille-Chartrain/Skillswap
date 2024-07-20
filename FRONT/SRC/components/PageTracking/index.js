import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Hook personnalisé pour surveiller la navigation
export default function PageTracking(
    {
        setSelectedCategory,
        setSelectedSubCategory,
        setSearchInput,
        setSelectedLevel
    }
) {

    const location = useLocation();

    useEffect(() => {
        const previousPath = sessionStorage.getItem('previousPath');
        sessionStorage.setItem('previousPath', location.pathname);

        console.log('Previous path:', previousPath);
        console.log('Current path:', location.pathname);

        // Logique pour déclencher des comportements différents en fonction de la provenance
        if (previousPath === '/login' && location.pathname === '/dashboard') {

            console.log('Navigated from Page login to Page dashboard');

            setSelectedSubCategory(null)
            setSearchInput("");
            setSelectedCategory(null);
            setSelectedLevel("");
        }

    }, [location]);

    return null; // Ce hook n'a pas besoin de retourner quoi que ce soit pour l'UI
}

