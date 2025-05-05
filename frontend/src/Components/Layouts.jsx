import React, { Suspense, useState, useEffect } from 'react';
import { useRoutes, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import BreadcrumbsNav from './BreadcrumbsNav';
import Footer from './Footer';
import { Snackbar, Alert } from '@mui/material';
import UpdateMetalRate from '../Pages/MetalRates/UpdateMatelRate.jsx';

const pages = import.meta.glob('../Pages/**/*.jsx', { eager: true });

const kebabCase = (str) =>
    str
        .replace(/\./g, '') // remove all dots
        .replace(/([a-z])([A-Z])/g, '$1-$2') // insert hyphen between camelCase
        .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2') // handle acronyms
        .toLowerCase();


const formatPath = (filePath) => {
    const cleaned = filePath.replace('./Pages/', '').replace(/\.jsx$/, '');
    const parts = cleaned.split('/');
    const fileName = parts.pop();
    const basePath = parts.map(kebabCase).join('/');
    console.log('basePath', basePath, 'fileName', fileName);

    if (fileName.toLowerCase() === 'index') {
        return `/admin/${basePath}`;
    }

    return `/admin/${basePath}/${kebabCase(fileName)}`;
};

const routes = Object.entries(pages).map(([filePath, module]) => {
    const Component = module.default;
    return {
        path: formatPath(filePath),
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
    const segments = pathname.split('/').filter(Boolean).filter((seg) => seg !== 'admin');
    const filtered = segments.filter((seg) => !/^[a-f\d]{24}$/i.test(seg));
    const last = filtered[filtered.length - 1] || 'Dashboard';
    return last.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
};

const Layout = ({ expanded, setExpanded, themeMode, onThemeToggle }) => {
    const location = useLocation();
    const element = useRoutes(routes);
    const pageTitle = getPageTitle(location.pathname);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const firstName = localStorage.getItem('firstName') || 'User';

    useEffect(() => {
        setSnackbarOpen(true);
    }, []);

    return (
        <>
            <div className="d-flex">
                <Sidebar expanded={expanded} setExpanded={setExpanded} />
                <div className="flex-grow-1">
                    <TopNavbar
                        expanded={expanded}
                        onThemeToggle={onThemeToggle}   /* Pass the onThemeToggle here */
                        themeMode={themeMode}  /* Pass themeMode */
                    />
                    <h1 className="text-dark fs-5 mx-3">{pageTitle}</h1>
                    <BreadcrumbsNav />
                    {element}
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={3000}
                        onClose={() => setSnackbarOpen(false)}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        <Alert
                            onClose={() => setSnackbarOpen(false)}
                            severity="success"
                            sx={{ width: '100%' }}
                        >
                            Welcome..!, {firstName}
                        </Alert>
                    </Snackbar>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Layout;
