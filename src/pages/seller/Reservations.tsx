import React from 'react';
import { SellerLayout } from '../../components/layout/SellerLayout';
import { useMarket } from '../../context/MarketContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Calendar, MapPin } from 'lucide-react';

export const SellerReservations: React.FC = () => {
    const { reservations, stands, markAsPaid } = useMarket();

    // Mock: all reservations for demo
    const myReservations = reservations;

    const getPaymentLabel = (status: string) => status === 'PAID' ? 'Opłacone' : 'Nieopłacone';
    const getCleaningLabel = (status: string) => {
        switch (status) {
            case 'APPROVED': return 'Zatwierdzone';
            case 'PENDING': return 'Oczekuje';
            case 'REJECTED': return 'Odrzucone';
            default: return status;
        }
    };

    return (
        <SellerLayout>
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0F172A', marginBottom: '8px' }}>
                    Moje Rezerwacje
                </h1>
                <p style={{ color: '#64748B' }}>Przeglądaj i zarządzaj swoimi rezerwacjami</p>
            </div>

            <Card>
                {myReservations.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '48px', color: '#64748B' }}>
                        <Calendar size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
                        <p>Nie masz jeszcze żadnych rezerwacji.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {myReservations.map(res => {
                            const stand = stands.find(s => s.id === res.standId);
                            return (
                                <div
                                    key={res.id}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr 1fr auto',
                                        alignItems: 'center',
                                        gap: '24px',
                                        padding: '20px',
                                        backgroundColor: '#F8FAFC',
                                        borderRadius: '12px',
                                        border: '1px solid #E2E8F0'
                                    }}
                                >
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                            <MapPin size={16} color="#D97706" />
                                            <span style={{ fontWeight: 600, color: '#0F172A' }}>
                                                Stanowisko {stand?.number || res.standId}
                                            </span>
                                        </div>
                                        <div style={{ fontSize: '13px', color: '#64748B' }}>
                                            ID: {res.id}
                                        </div>
                                    </div>

                                    <div>
                                        <div style={{ fontSize: '13px', color: '#64748B', marginBottom: '4px' }}>Okres</div>
                                        <div style={{ fontWeight: 500, color: '#0F172A' }}>
                                            {res.startDate} → {res.endDate}
                                        </div>
                                    </div>

                                    <div>
                                        <div style={{ fontSize: '13px', color: '#64748B', marginBottom: '4px' }}>Status</div>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <Badge variant={res.paymentStatus === 'PAID' ? 'success' : 'danger'}>
                                                {getPaymentLabel(res.paymentStatus)}
                                            </Badge>
                                            <Badge variant="neutral">
                                                {getCleaningLabel(res.cleaningStatus)}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#0F172A', marginBottom: '8px' }}>
                                            {res.totalAmount} zł
                                        </div>
                                        {res.paymentStatus !== 'PAID' && (
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                onClick={() => markAsPaid(res.id)}
                                            >
                                                Opłać teraz
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </Card>
        </SellerLayout>
    );
};
