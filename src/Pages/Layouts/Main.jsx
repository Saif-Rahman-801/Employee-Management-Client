import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";

const Main = () => {
    return (
        <div>
            {/* Navbar here */}
            <Navbar />
            <Outlet />
            {/* Footer Here */}
        </div>
    );
};

export default Main;