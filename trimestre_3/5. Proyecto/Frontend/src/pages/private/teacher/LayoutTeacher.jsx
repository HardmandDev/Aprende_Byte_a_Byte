import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/private/teacher/Sidebar";

const PrivateLayout = () => {
    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <Outlet />
            </div>
        </div>
    );
};

export default PrivateLayout;
