import { Suspense } from 'react';
import { useRoutes, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import BreadcrumbsNav from './BreadcrumbsNav';
import Footer from './Footer';
import UpdateMetalRate from './Pages/MetalRates/UpdateMatelRate';

const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });

console.log(pages);  // Check if this logs the pages object correctly


const kebabCase = (str) =>
    str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/([A-Z])([A-Z][a-z])/g, '$1-$2').toLowerCase();

const formatPath = (filePath) => {
    const cleaned = filePath
        .replace('./Pages/', '')  // remove base prefix
        .replace(/\.jsx$/, '');              // remove file extension

    const parts = cleaned.split('/'); // folder/file segments
    const fileName = parts.pop();     // get last item

    const basePath = parts.map(kebabCase).join('/'); // kebab-case folders

    // Special case: index.jsx → just the folder
    if (fileName.toLowerCase() === 'index') {
        return `/admin/${basePath}`;
    }

    // sub-page: add fileName as kebab
    return `/admin/${basePath}/${kebabCase(fileName)}`;
};

const routes = Object.entries(pages).map(([filePath, module]) => {
    const Component = module.default;
    const routePath = formatPath(filePath);
    console.log('Generated Route:', routePath);

    return {
        path: routePath,
        element: (
            <Suspense fallback={<div className="m-3">Loading...</div>}>
                <Component />
            </Suspense>
        ),

    };

});

routes.push({
    path: '/admin/metal-rates/update-metal-rate/:id',
    element: <UpdateMetalRate />,
});

const getPageTitle = (pathname) => {
    const segments = pathname
        .split('/')
        .filter(Boolean)
        .filter(seg => seg !== 'admin');

    // Filter out MongoDB ObjectId (24-character hex strings)
    const filteredSegments = segments.filter(seg => !/^[a-f\d]{24}$/i.test(seg));

    if (filteredSegments.length === 0) return 'Dashboard';

    const lastMeaningfulSegment = filteredSegments[filteredSegments.length - 1];

    return lastMeaningfulSegment
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
};


const Layout = ({ expanded, setExpanded }) => {
    const location = useLocation();
    const element = useRoutes(routes);
    const pageTitle = getPageTitle(location.pathname);
    if (location.pathname === '/erp') {
        return <Navigate to="/login" replace />
    }

    return (
        <>
            <div className="d-flex">
                <Sidebar expanded={expanded} setExpanded={setExpanded} />
                <div className="flex-grow-1">
                    <TopNavbar expanded={expanded} />
                    <h1 className="text-dark fs-5 mx-3">{pageTitle}</h1>
                    <BreadcrumbsNav />
                    {element}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Layout;
