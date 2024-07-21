import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Hook personnalisé pour surveiller la navigation
export default function PageTracking(
    {
        setSelectedCategory,
        setSelectedSubCategory,
        setSearchInput,
        setSelectedLevel,
        setDataCards,
        setNoMatch,
        // setGetData
    }
) {

    const location = useLocation();
    const subPages = [
        '/dashboard/profile',
        '/dashboard/desk',
        '/dashboard/statistics',
        '/dashboard/notifications'
    ];

    useEffect(() => {
        const previousPath = sessionStorage.getItem('previousPath');
        sessionStorage.setItem('previousPath', location.pathname);

        console.log('Previous path:', previousPath);
        console.log('Current path:', location.pathname);

        // Logique pour déclencher des comportements différents en fonction de la provenance
        if (previousPath === '/login' && location.pathname === '/dashboard/results') {

            console.log('Navigated from Page login to Page dashboard');
            // state to null so db send us all the courses available on the website
            setSelectedSubCategory(null)
            setSearchInput("");
            setSelectedCategory(null);
            setSelectedLevel("");

        }


        if (previousPath === '/' && subPages.includes(location.pathname)) {
            console.log("Page Tracking activated / to subpages");
            console.log(`Navigated from Page ${previousPath} to ${location.pathname}`);
            setDataCards({
                rows: [],
                count: 0,
                resultCount: 0,
            });
            setNoMatch(false);
        }

    }, [location]);

    return null;
}

