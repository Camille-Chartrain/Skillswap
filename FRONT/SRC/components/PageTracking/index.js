import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Hook personnalisé pour surveiller la navigation
export default function PageTracking(
    {
        setSelectedCategory,
        setSelectedSubCategory,
        setSearchInput,
        setSelectedLevel,
        optionsHTML,
        setOptionsHTML
        // setDataCards,
        // setNoMatch,
        // setGetData
    }
) {

    const location = useLocation();

    // const subPages = [
    //     '/dashboard/profile',
    //     '/dashboard/desk',
    //     '/dashboard/statistics',
    //     '/dashboard/notifications'
    // ];

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


        // to modify the select lists "required" option on cat subcat and level
        if (location.pathname === '/dashboard/profile/modifications'
            || location.pathname === '/dashboard/profile'
        ) {
            setOptionsHTML(true);
            console.log("optionHTML = true");
        }
        else {
            setOptionsHTML(false);
            console.log("optionHTML = false");
        }




    }, [location]);

    return null;
}

