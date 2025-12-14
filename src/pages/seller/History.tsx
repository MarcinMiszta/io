import React from 'react';
import { SellerLayout } from '../../components/layout/SellerLayout';
import { useMarket } from '../../context/MarketContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { History, Calendar, CreditCard, MapPin } from 'lucide-react';

export const SellerHistory: React.FC = () => {
    const { reservations, stands } = useMarket();

    // All reservations sorted by date (newest first)
    const history = [...reservations].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const getPaymentLabel = (status: string) => status === 'PAID' ? 'Opłacone' : 'Nieopłacone';

    return (
        <SellerLayout>
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0F172A', marginBottom: '8px' }}>
                    Historia
                </h1>
                <p style={{ color: '#64748B' }}>Przeglądaj historię wszystkich rezerwacji i płatności</p>
            </div>

            <Card>
                {history.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '48px', color: '#64748B' }}>
                        <History size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
                        <p>Brak historii. Twoje przyszłe rezerwacje pojawią się tutaj.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', backgroundColor: '#E2E8F0' }}>
                        {history.map((res, idx) => {
                            const stand = stands.find(s => s.id === res.standId);
                            return (
                                <div
                                    key={res.id}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '48px 1fr 1fr 1fr 120px',
                                        alignItems: 'center',
                                        gap: '16px',
                                        padding: '16px',
                                        backgroundColor: 'white'
                                    }}
                                >
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        backgroundColor: res.paymentStatus === 'PAID' ? '#DCFCE7' : '#FEE2E2',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {res.paymentStatus === 'PAID' ? (
                                            <CreditCard size={18} color="#16A34A" />
                                        ) : (
                                            <Calendar size={18} color="#DC2626" />
                                        )}
                                    </div>

                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#0F172A' }}>
                                            <MapPin size={14} color="#D97706" />
                                            Stanowisko {stand?.number || res.standId}
                                        </div>
                                        <div style={{ fontSize: '12px', color: '#64748B' }}>
                                            {res.userName}
                                        </div>
                                    </div>

                                    <div>
                                        <div style={{ fontSize: '13px', color: '#64748B' }}>Okres</div>
                                        <div style={{ fontWeight: 500, color: '#0F172A' }}>
                                            {res.startDate} → {res.endDate}
                                        </div>
                                    </div>

                                    <div>
                                        <div style={{ fontSize: '13px', color: '#64748B' }}>Utworzono</div>
                                        <div style={{ fontWeight: 500, color: '#0F172A' }}>
                                            {new Date(res.createdAt).toLocaleDateString('pl-PL')}
                                        </div>
                                    </div>

                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontWeight: 'bold', color: '#0F172A', marginBottom: '4px' }}>
                                            {res.totalAmount} zł
                                        </div>
                                        <Badge variant={res.paymentStatus === 'PAID' ? 'success' : 'danger'}>
                                            {getPaymentLabel(res.paymentStatus)}
                                        </Badge>
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
