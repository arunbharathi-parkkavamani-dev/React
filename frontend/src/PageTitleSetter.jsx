import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

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

export default PageTitleSetter;
