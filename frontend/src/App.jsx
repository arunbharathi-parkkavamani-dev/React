import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Layouts from './Components/Layouts';
import Login from './pages/Login'; // or wherever your Login component is
import Dashboard from './pages/Dashboard';
import MetalList from './pages/MetalList';
import { Helmet } from 'react-helmet';

// Dynamically set page title
const getPageTitle = (pathname) => {
  const segments = pathname.split('/').filter(Boolean);
  const filtered = segments.filter(seg => seg !== 'erp' && seg !== 'admin');
  const filteredSegments = filtered.filter(seg => !/^[a-f\d]{24}$/i.test(seg));
  if (filteredSegments.length === 0) return 'Dashboard';
  const lastSegment = filteredSegments[filteredSegments.length - 1];
  return lastSegment.replace(/[-_]/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
};

const PageTitleSetter = () => {
  const location = useLocation();
  const title = getPageTitle(location.pathname);

  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

const AppRoutes = ({ expanded, setExpanded }) => {
  const location = useLocation();

  // Login should NOT use Layouts
  const isLoginPage = location.pathname === '/login';

  if (location.pathname === '/') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <>
      <PageTitleSetter />
      {isLoginPage ? (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        <Layouts expanded={expanded} setExpanded={setExpanded} />
      )}
    </>
  );
};

function App() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Router>
      <AppRoutes expanded={expanded} setExpanded={setExpanded} />
    </Router>
  );
}

export default App;
