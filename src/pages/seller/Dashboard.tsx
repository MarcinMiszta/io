import React from 'react';
import { SellerLayout } from '../../components/layout/SellerLayout';
import { useMarket } from '../../context/MarketContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { MapPin, CreditCard, AlertCircle, TrendingUp } from 'lucide-react';

export const SellerDashboard: React.FC = () => {
    const { user, reservations, stands } = useMarket();

    // Mock: get user's reservations (in real app would filter by userId)
    const myReservations = reservations.slice(0, 5);
    const paidCount = myReservations.filter(r => r.paymentStatus === 'PAID').length;
    const unpaidCount = myReservations.filter(r => r.paymentStatus !== 'PAID').length;
    const totalSpent = myReservations.filter(r => r.paymentStatus === 'PAID').reduce((sum, r) => sum + r.totalAmount, 0);

    return (
        <SellerLayout>
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0F172A', marginBottom: '8px' }}>
                    Witaj, {user?.name}!
                </h1>
                <p style={{ color: '#64748B' }}>Zarządzaj swoimi rezerwacjami i płatnościami</p>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
                <Card>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ backgroundColor: '#FEF3C7', padding: '12px', borderRadius: '12px' }}>
                            <MapPin size={24} color="#D97706" />
                        </div>
                        <div>
                            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0F172A' }}>{myReservations.length}</div>
                            <div style={{ color: '#64748B', fontSize: '14px' }}>Aktywne rezerwacje</div>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ backgroundColor: '#DCFCE7', padding: '12px', borderRadius: '12px' }}>
                            <CreditCard size={24} color="#16A34A" />
                        </div>
                        <div>
                            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0F172A' }}>{paidCount}</div>
                            <div style={{ color: '#64748B', fontSize: '14px' }}>Opłacone</div>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ backgroundColor: '#FEE2E2', padding: '12px', borderRadius: '12px' }}>
                            <AlertCircle size={24} color="#DC2626" />
                        </div>
                        <div>
                            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0F172A' }}>{unpaidCount}</div>
                            <div style={{ color: '#64748B', fontSize: '14px' }}>Do opłacenia</div>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ backgroundColor: '#E0E7FF', padding: '12px', borderRadius: '12px' }}>
                            <TrendingUp size={24} color="#4F46E5" />
                        </div>
                        <div>
                            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0F172A' }}>{totalSpent} zł</div>
                            <div style={{ color: '#64748B', fontSize: '14px' }}>Suma wydatków</div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Recent Reservations */}
            <Card>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#0F172A' }}>
                    Ostatnie Rezerwacje
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {myReservations.length === 0 ? (
                        <p style={{ color: '#64748B', textAlign: 'center', padding: '32px' }}>
                            Brak rezerwacji. Przejdź do "Dostępne Stanowiska" aby zarezerwować.
                        </p>
                    ) : (
                        myReservations.map(res => {
                            const stand = stands.find(s => s.id === res.standId);
                            return (
                                <div
                                    key={res.id}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '16px',
                                        backgroundColor: '#F8FAFC',
                                        borderRadius: '8px',
                                        border: '1px solid #E2E8F0'
                                    }}
                                >
                                    <div>
                                        <div style={{ fontWeight: 600, color: '#0F172A', marginBottom: '4px' }}>
                                            Stanowisko {stand?.number || res.standId}
                                        </div>
                                        <div style={{ fontSize: '13px', color: '#64748B' }}>
                                            {res.startDate} → {res.endDate}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <div style={{ fontWeight: 'bold', color: '#0F172A' }}>{res.totalAmount} zł</div>
                                        <Badge variant={res.paymentStatus === 'PAID' ? 'success' : 'danger'}>
                                            {res.paymentStatus === 'PAID' ? 'Opłacone' : 'Nieopłacone'}
                                        </Badge>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </Card>
        </SellerLayout>
    );
};
