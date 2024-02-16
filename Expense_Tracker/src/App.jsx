import { Outlet, useLocation } from "react-router-dom";
import Header from "./Components/Header/Header";
import './App.css';
import Footer from "./Components/Footer/Footer";
const App = () => {

    const location = useLocation();
    // console.log(location);
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup') ;

    return (
        <div>
            { noHeaderFooter || <Header></Header> }
            <Outlet/>
            { noHeaderFooter || <Footer/> }
        </div>
    );
};

export default App;