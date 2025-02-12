import { Outlet } from "react-router-dom";
import Header from "./modules/header/Header";
import Footer from "./modules/footer/Footer";

const Layout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;