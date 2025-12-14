import React, { useState } from 'react';
import { ControllerLayout } from '../../components/layout/ControllerLayout';
import { useMarket } from '../../context/MarketContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { AlertTriangle, Plus } from 'lucide-react';

export const ControllerIncidents: React.FC = () => {
    const { incidents, addIncident, stands } = useMarket();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ standId: '', description: '', type: 'DAMAGE' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addIncident({
            standId: formData.standId,
            description: formData.description,
            type: formData.type as any,
            reporterId: 'CURRENT_USER',
        });
        setFormData({ standId: '', description: '', type: 'DAMAGE' });
        setShowForm(false);
        alert('Incydent zgłoszony!');
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'DAMAGE': return 'Uszkodzenie';
            case 'CLEANLINESS': return 'Czystość';
            case 'UNAUTHORIZED': return 'Nielegalne';
            case 'OTHER': return 'Inne';
            default: return type;
        }
    };

    return (
        <ControllerLayout>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0F172A', marginBottom: '8px' }}>Incydenty</h1>
                    <p style={{ color: '#64748B' }}>Zgłaszanie i przegląd incydentów</p>
                </div>
                <Button variant="primary" onClick={() => setShowForm(true)}>
                    <Plus size={18} style={{ marginRight: '8px' }} />
                    Nowy incydent
                </Button>
            </div>

            {/* New Incident Form */}
            {showForm && (
                <Card style={{ marginBottom: '24px', border: '2px solid #059669' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Zgłoś incydent</h3>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                            <div>
                                <label style={{ fontSize: '14px', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Stanowisko</label>
                                <select
                                    value={formData.standId}
                                    onChange={e => setFormData({ ...formData, standId: e.target.value })}
                                    required
                                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #E2E8F0' }}
                                >
                                    <option value="">Wybierz...</option>
                                    {stands.map(s => (
                                        <option key={s.id} value={s.id}>#{s.number} - {s.id}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label style={{ fontSize: '14px', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Typ</label>
                                <select
                                    value={formData.type}
                                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #E2E8F0' }}
                                >
                                    <option value="DAMAGE">Uszkodzenie</option>
                                    <option value="CLEANLINESS">Czystość</option>
                                    <option value="UNAUTHORIZED">Nielegalne zajęcie</option>
                                    <option value="OTHER">Inne</option>
                                </select>
                            </div>
                        </div>
                        <Input
                            label="Opis"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            required
                            fullWidth
                        />
                        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                            <Button type="submit" variant="primary">Zgłoś</Button>
                            <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>Anuluj</Button>
                        </div>
                    </form>
                </Card>
            )}

            {/* Incidents List */}
            <Card>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
                    <AlertTriangle size={20} style={{ display: 'inline', marginRight: '8px' }} />
                    Lista incydentów
                </h2>
                {incidents.length === 0 ? (
                    <p style={{ color: '#64748B', textAlign: 'center', padding: '32px' }}>Brak zgłoszonych incydentów</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {incidents.map(inc => {
                            const stand = stands.find(s => s.id === inc.standId);
                            return (
                                <div key={inc.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: '#FEF2F2', borderRadius: '8px', border: '1px solid #FECACA' }}>
                                    <div>
                                        <div style={{ fontWeight: 600, color: '#0F172A', marginBottom: '4px' }}>
                                            Stanowisko {stand?.number} - {getTypeLabel(inc.type)}
                                        </div>
                                        <div style={{ fontSize: '14px', color: '#64748B' }}>{inc.description}</div>
                                        <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>
                                            {new Date(inc.createdAt).toLocaleString('pl-PL')}
                                        </div>
                                    </div>
                                    <Badge variant={inc.status === 'OPEN' ? 'danger' : inc.status === 'IN_PROGRESS' ? 'warning' : 'success'}>
                                        {inc.status === 'OPEN' ? 'Otwarty' : inc.status === 'IN_PROGRESS' ? 'W trakcie' : 'Rozwiązany'}
                                    </Badge>
                                </div>
                            );
                        })}
                    </div>
                )}
            </Card>
        </ControllerLayout>
    );
};
