import Sidenavbar from '../models/Sidenavbar.js';

export const getSidebar = async (req, res) => {
    try {
        // In the future, you can get user's role from session or token
        // const userRole = req.session.user?.role || 'guest';

        const sidebarItems = await Sidenavbar.find();

        // Later you can filter items based on role
        // const filteredSidebar = sidebarItems.filter(item => item.role === null || item.role === userRole);

        res.json(sidebarItems);
    } catch (err) {
        console.error('❌ Error fetching sidebar data:', err);
        res.status(500).json({ error: 'Failed to fetch sidebar data' });
    }
};
