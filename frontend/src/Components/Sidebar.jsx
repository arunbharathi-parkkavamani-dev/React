import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as GiIcons from 'react-icons/gi';
import * as AiIcons from 'react-icons/ai';
import * as HiIcons from 'react-icons/hi';
import * as BiIcons from 'react-icons/bi';
import * as RiIcons from 'react-icons/ri';
import { GiHamburgerMenu } from 'react-icons/gi';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Static/Sidebar.css';


const iconPackMap = {
  'react-icons/fa': FaIcons,
  'react-icons/md': MdIcons,
  'react-icons/gi': GiIcons,
  'react-icons/ai': AiIcons,
  'react-icons/hi': HiIcons,
  'react-icons/bi': BiIcons,
  'react-icons/ri': RiIcons,
};

const Sidebar = ({ expanded, setExpanded }) => {
  const [sidebarData, setSidebarData] = useState([]);
  const [openLabelId, setOpenLabelId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoverLabelId, setHoverLabelId] = useState(null);
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [isHoveringDropdown, setIsHoveringDropdown] = useState(false);

  useEffect(() => {
    const fetchSidebar = async () => {
      try {
        const res = await axiosInstance.get('/sidebar'); // ✅ Used axiosInstance
        setSidebarData(res.data);
      } catch (err) {
        console.error('Failed to fetch sidebar:', err);
      }
    };

    fetchSidebar();
  }, []);




  const toggleSidebar = () => setExpanded(!expanded);

  const filteredSidebar = sidebarData
    .map(item => {
      const labelMatch = item.label.toLowerCase().includes(searchTerm.toLowerCase());
      const filteredSublabels = item.sublabels?.filter(sub =>
        sub.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) || [];

      if (labelMatch || filteredSublabels.length > 0) {
        return {
          ...item,
          sublabels: filteredSublabels.length > 0 || labelMatch ? filteredSublabels : item.sublabels,
        };
      }
      return null;
    })
    .filter(Boolean);

  return (
    <>
      <div className={`sidebar-container bg-dark ${expanded ? 'expanded' : 'collapsed'}`}
        style={{ width: expanded ? '250px' : '85px', transition: 'width 0.3s' }}>
        <div className="d-flex align-items-center mb-3">
          <button
            className={`btn btn-outline-light ms-3 d-flex align-items-center mt-3 ${expanded ? 'me-3' : 'justify-content-center '}`}
            onClick={toggleSidebar}
          >
            <GiHamburgerMenu size={expanded ? 15 : 20} title="Menu" />
          </button>

          {expanded && <h1 className="text-white fs-5 mt-4">Sidebar</h1>}
        </div>

        {sidebarData.length > 0 ? (
          <>
            {/* Search Bar */}
            <div className={`gap-2 d-flex align-items-center mb-3 ${expanded ? '' : 'justify-content-center'}`}>
              <FaSearch
                size={expanded ? 20 : 30}
                className="ms-2"
                onClick={toggleSidebar}
                style={{ cursor: 'pointer', color: 'white' }}
                title="Search"
              />
              {expanded && (
                <input
                  type="search"
                  className="form-control form-control-sm me-1"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              )}
            </div>

            {/* Sidebar Items */}
            <ul className="list-unstyled">
              {filteredSidebar.map(item => {
                const IconPack = iconPackMap[item.icon?.package];
                const IconComponent = IconPack ? IconPack[item.icon?.name] : null;

                return (
                  <li key={item._id} className="side-item-wrapper position-relative mb-2">
                    <div
                      className={`d-flex ${expanded ? 'align-items-center' : 'justify-content-center'} side-hover-trigger`}
                      style={{ cursor: 'pointer', padding: expanded ? '2.5%' : '3%' }}
                      onClick={() => setOpenLabelId(openLabelId === item._id ? null : item._id)}
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setDropdownTop(rect.top);
                        setHoverLabelId(item._id);
                        setActiveDropdownId(item._id);
                      }}
                      onMouseLeave={() => {
                        if (!isHoveringDropdown) {
                          setHoverLabelId(null);
                        }
                      }}
                    >
                      {IconComponent && (
                        expanded ? (
                          <>
                            <IconComponent size={20} className="me-2" style={{ color: 'white' }} />
                            <Link
                              className="nav-link text-white"
                            >
                              {item.label}
                            </Link>
                          </>
                        ) : (
                          <Link
                            className="d-flex justify-content-center align-items-center"
                          >
                            <IconComponent size={30} style={{ color: 'white' }} />
                          </Link>
                        )
                      )}
                    </div>

                    {/* Expanded sidebar sublabels */}
                    {expanded && openLabelId === item._id && item.sublabels?.length > 0 && (
                      <ul className="list-group bg-secondary list-group-flush ms-4 mt-1">
                        {item.sublabels.map((sub, i) => (
                          <li key={sub._id || i} className="list-group-item py-1 px-2">
                            <Link to={`/admin${sub.path}`} className="nav-link d-flex align-items-center">
                              <FaIcons.FaRegCircle size={10} style={{ color: 'white' }} className="me-2" />
                              {sub.name}
                            </Link>
                          </li>
                        ))}

                      </ul>
                    )}

                    {/* Collapsed hover dropdown */}
                    {!expanded && (hoverLabelId === item._id || (activeDropdownId === item._id && isHoveringDropdown)) && (
                      <ul
                        className="bg-gray list-group hover-inline-dropdown"
                        onMouseEnter={() => setIsHoveringDropdown(true)}
                        onMouseLeave={() => {
                          setIsHoveringDropdown(false);
                          setHoverLabelId(null);
                          setActiveDropdownId(null);
                        }}
                        style={{
                          position: 'fixed',
                          top: `${dropdownTop}px`,
                          left: '85px',
                          zIndex: 999,
                          maxHeight: `calc(100vh - ${dropdownTop + 15}px)`,
                          overflowY: 'auto',
                        }}
                      >
                        {item.sublabels.map((sub, i) => (
                          <li key={sub._id || i} className="list-group-item py-1 px-2">
                            <Link to={`/admin${sub.path}`} className="nav-link d-flex align-items-center">
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <p>Loading sidebar...</p>
        )}
      </div>
    </>
  );
};

export default Sidebar;
