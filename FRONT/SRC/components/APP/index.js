
import Header from '../header';
import Footer from '../footer';
import { DarkModeContext } from '../../util';
import { useContext } from 'react';


//* components added for the user rendering
const App = ({ darkMode }) => {
    const themeClass = useContext(DarkModeContext);
    const theme = darkMode === 'light' ? 'dark' : 'light';
    console.log('je suis ds app, theme:', theme);

    return (
        <body className={theme}>
            <Header />
            <main>

            </main>
            <Footer />
        </body >
    )
}
export default App;