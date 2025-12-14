import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMarket } from '../context/MarketContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ShieldCheck, Building2, Store, Lock } from 'lucide-react';
import './Home.css';

type RoleType = 'CONTROLLER' | 'OFFICE' | 'SELLER';

export const Home: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useMarket();
    const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);
    const [credentials, setCredentials] = useState({ login: '', password: '' });
    const [error, setError] = useState('');

    const roles = [
        {
            id: 'CONTROLLER' as RoleType,
            name: 'Kontrola Terenowa',
            icon: ShieldCheck,
            color: '#059669',
            bg: '#D1FAE5',
            desc: 'Panel dla kontrolerów'
        },
        {
            id: 'OFFICE' as RoleType,
            name: 'Biuro Targowiska',
            icon: Building2,
            color: '#2563EB',
            bg: '#DBEAFE',
            desc: 'Panel administracyjny'
        },
        {
            id: 'SELLER' as RoleType,
            name: 'Klient / Sprzedawca',
            icon: Store,
            color: '#D97706',
            bg: '#FEF3C7',
            desc: 'Panel klienta'
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedRole) {
            setError('Wybierz typ konta');
            return;
        }
        if (!credentials.login || !credentials.password) {
            setError('Podaj login i hasło');
            return;
        }
        login(selectedRole);
        if (selectedRole === 'CONTROLLER') navigate('/controller');
        else if (selectedRole === 'OFFICE') navigate('/office');
        else navigate('/seller');
    };

    return (
        <div className="home-container">
            {/* Header */}
            <div className="home-header">
                <h1 className="home-title">🏪 Targowisko Miejskie</h1>
                <p className="home-subtitle">System Zarządzania i Kontroli</p>
            </div>

            {/* Role Selection */}
            <div className="role-selection">
                {roles.map(role => {
                    const Icon = role.icon;
                    const isSelected = selectedRole === role.id;
                    return (
                        <button
                            key={role.id}
                            onClick={() => { setSelectedRole(role.id); setError(''); }}
                            className={`role-button ${isSelected ? 'selected' : ''}`}
                            style={{
                                backgroundColor: isSelected ? role.bg : 'rgba(255,255,255,0.05)',
                                borderColor: isSelected ? role.color : 'transparent',
                            }}
                        >
                            <div
                                className="role-icon"
                                style={{ backgroundColor: isSelected ? role.color : 'rgba(255,255,255,0.1)' }}
                            >
                                <Icon size={28} color={isSelected ? 'white' : role.color} />
                            </div>
                            <div className="role-text">
                                <div className="role-name" style={{ color: isSelected ? role.color : 'white' }}>
                                    {role.name}
                                </div>
                                <div
                                    className="role-desc"
                                    style={{ color: isSelected ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.5)' }}
                                >
                                    {role.desc}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Login Form */}
            <Card className="login-card">
                <div className="login-header">
                    <Lock size={24} color="#64748B" />
                    <h2 className="login-title">Logowanie</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '16px' }}>
                        <Input
                            label="Login"
                            placeholder="Wprowadź login..."
                            value={credentials.login}
                            onChange={e => setCredentials({ ...credentials, login: e.target.value })}
                            fullWidth
                        />
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                        <Input
                            label="Hasło"
                            type="password"
                            placeholder="Wprowadź hasło..."
                            value={credentials.password}
                            onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                            fullWidth
                        />
                    </div>

                    {error && (
                        <div className="login-error">{error}</div>
                    )}

                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        disabled={!selectedRole}
                    >
                        {selectedRole ? `Zaloguj jako ${roles.find(r => r.id === selectedRole)?.name}` : 'Wybierz typ konta'}
                    </Button>
                </form>
            </Card>
        </div>
    );
};
