import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMarket } from '../../context/MarketContext';
import { LayoutDashboard, Map, Calculator, FileText, LogOut, User, Menu, X } from 'lucide-react';
import './ResponsiveLayout.css';

export const OfficeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, logout } = useMarket();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navItems = [
        { label: 'Pulpit', to: '/office', icon: <LayoutDashboard size={20} />, end: true },
        { label: 'Mapa Targowiska', to: '/office/map', icon: <Map size={20} /> },
        { label: 'Kasjer', to: '/office/cashier', icon: <Calculator size={20} /> },
        { label: 'Raporty', to: '/office/reports', icon: <FileText size={20} /> },
    ];

    const sidebarColor = '#0F172A';
    const sidebarDark = '#020617';

    const SidebarContent = () => (
        <>
            <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>Biuro Targowiska</h1>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>System Zarządzania</div>
            </div>

            <nav style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {navItems.map(item => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.end}
                        onClick={() => setMobileMenuOpen(false)}
                        style={({ isActive }) => ({
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 16px',
                            color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
                            backgroundColor: isActive ? '#10B981' : 'transparent',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontWeight: isActive ? 600 : 500,
                            transition: 'all 0.15s'
                        })}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div style={{ backgroundColor: sidebarDark, padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', padding: '0 8px' }}>
                    <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', padding: '8px', borderRadius: '50%' }}>
                        <User size={16} color="white" />
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
                        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email}</div>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 500
                    }}
                >
                    <LogOut size={18} />
                    <span>Wyloguj</span>
                </button>
            </div>
        </>
    );

    return (
        <div className="layout-container">
            {/* Mobile Header */}
            <div className="mobile-header" style={{ backgroundColor: sidebarColor }}>
                <span className="mobile-header-title" style={{ color: 'white' }}>Biuro Targowiska</span>
                <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Overlay */}
            <div
                className={`mobile-overlay ${mobileMenuOpen ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile Sidebar */}
            <aside
                className={`mobile-sidebar ${mobileMenuOpen ? 'open' : ''}`}
                style={{ backgroundColor: sidebarColor }}
            >
                <SidebarContent />
            </aside>

            {/* Desktop Sidebar */}
            <aside className="layout-sidebar" style={{ backgroundColor: sidebarColor }}>
                <SidebarContent />
            </aside>

            {/* Main Content */}
            <main className="layout-main">
                {children}
            </main>
        </div>
    );
};
