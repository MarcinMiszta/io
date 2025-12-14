import React from 'react';
import { ControllerLayout } from '../../components/layout/ControllerLayout';
import { useMarket } from '../../context/MarketContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ClipboardCheck, CheckCircle, XCircle, Clock } from 'lucide-react';

export const ControllerInspections: React.FC = () => {
    const { reservations, stands, updateCleaningStatus } = useMarket();

    const pendingInspections = reservations.filter(r => r.cleaningStatus === 'PENDING');
    const completedInspections = reservations.filter(r => r.cleaningStatus !== 'PENDING');

    return (
        <ControllerLayout>
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0F172A', marginBottom: '8px' }}>Kontrole</h1>
                <p style={{ color: '#64748B' }}>Weryfikacja czystości i stanu stanowisk</p>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' }}>
                <Card>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ backgroundColor: '#FEF3C7', padding: '12px', borderRadius: '12px' }}>
                            <Clock size={24} color="#D97706" />
                        </div>
                        <div>
                            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0F172A' }}>{pendingInspections.length}</div>
                            <div style={{ color: '#64748B', fontSize: '14px' }}>Oczekujące</div>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ backgroundColor: '#DCFCE7', padding: '12px', borderRadius: '12px' }}>
                            <CheckCircle size={24} color="#16A34A" />
                        </div>
                        <div>
                            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0F172A' }}>
                                {reservations.filter(r => r.cleaningStatus === 'APPROVED').length}
                            </div>
                            <div style={{ color: '#64748B', fontSize: '14px' }}>Zatwierdzone</div>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ backgroundColor: '#FEE2E2', padding: '12px', borderRadius: '12px' }}>
                            <XCircle size={24} color="#DC2626" />
                        </div>
                        <div>
                            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0F172A' }}>
                                {reservations.filter(r => r.cleaningStatus === 'REJECTED').length}
                            </div>
                            <div style={{ color: '#64748B', fontSize: '14px' }}>Odrzucone</div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Pending Inspections */}
            <Card style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#0F172A' }}>
                    <ClipboardCheck size={20} style={{ display: 'inline', marginRight: '8px' }} />
                    Do sprawdzenia
                </h2>
                {pendingInspections.length === 0 ? (
                    <p style={{ color: '#64748B', textAlign: 'center', padding: '24px' }}>Brak oczekujących kontroli 🎉</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {pendingInspections.map(res => {
                            const stand = stands.find(s => s.id === res.standId);
                            return (
                                <div key={res.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: '#FFFBEB', borderRadius: '8px', border: '1px solid #FEF3C7' }}>
                                    <div>
                                        <div style={{ fontWeight: 600, color: '#0F172A' }}>Stanowisko {stand?.number}</div>
                                        <div style={{ fontSize: '13px', color: '#64748B' }}>{res.userName}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <Button size="sm" variant="primary" onClick={() => updateCleaningStatus(res.id, 'APPROVED')}>
                                            ✓ Zatwierdź
                                        </Button>
                                        <Button size="sm" variant="secondary" onClick={() => updateCleaningStatus(res.id, 'REJECTED', 'Wymaga poprawy')}>
                                            ✗ Odrzuć
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </Card>

            {/* Completed */}
            <Card>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#0F172A' }}>Historia kontroli</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {completedInspections.slice(0, 10).map(res => {
                        const stand = stands.find(s => s.id === res.standId);
                        return (
                            <div key={res.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '6px' }}>
                                <div>
                                    <span style={{ fontWeight: 500 }}>Stanowisko {stand?.number}</span>
                                    <span style={{ color: '#64748B', marginLeft: '8px', fontSize: '13px' }}>{res.userName}</span>
                                </div>
                                <Badge variant={res.cleaningStatus === 'APPROVED' ? 'success' : 'danger'}>
                                    {res.cleaningStatus === 'APPROVED' ? 'Zatwierdzone' : 'Odrzucone'}
                                </Badge>
                            </div>
                        );
                    })}
                </div>
            </Card>
        </ControllerLayout>
    );
};
