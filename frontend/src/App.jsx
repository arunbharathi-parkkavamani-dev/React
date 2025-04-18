import { useState, useEffect } from 'react';
import { BrowserRouter as Router, useLocation, Navigate } from 'react-router-dom';
import Layouts from './Components/Layouts'
import { Helmet } from 'react-helmet';

const getPageTitle = (pathname) => {
  const segments = pathname.split('/').filter(Boolean);

  // Remove base path parts
  const filtered = segments.filter(seg => seg !== 'erp' && seg !== 'admin');

  // Remove MongoDB ObjectId-like segments
  const filteredSegments = filtered.filter(seg => !/^[a-f\d]{24}$/i.test(seg));

  if (filteredSegments.length === 0) return 'Dashboard';

  const lastSegment = filteredSegments[filteredSegments.length - 1];

  return lastSegment
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};


const PageTitleSetter = () => {
  const location = useLocation();

  const title = getPageTitle(location.pathname);

  useEffect(() => {
    document.title = title;
  }, [title]);

  if (location.pathname === '/') {
    return <Navigate to="admin/Dashboard" replace />;
  }

  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );

};

function App() {
  const [expanded, setExpanded] = useState(false);


  return (
    <Router basename="/">
      <PageTitleSetter />
      <Layouts expanded={expanded} setExpanded={setExpanded} />
    </Router>
  );
}

export default App;
