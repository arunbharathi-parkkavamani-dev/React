import { useLocation, Navigate, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Components/Login';
import Layouts from './Components/Layouts';
import PageTitleSetter from './PageTitleSetter'; // Make sure this is correctly imported

const AppRoutes = ({ expanded, setExpanded }) => {
    const location = useLocation();

    // Redirect from root to login
    if (location.pathname === '/') {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            <PageTitleSetter />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/*"
                    element={
                        <ProtectedRoute>
                            <Layouts expanded={expanded} setExpanded={setExpanded} />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
};

export default AppRoutes;
