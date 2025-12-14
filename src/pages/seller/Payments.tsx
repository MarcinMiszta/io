import React from 'react';
import { SellerLayout } from '../../components/layout/SellerLayout';
import { useMarket } from '../../context/MarketContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { CreditCard, CheckCircle, XCircle } from 'lucide-react';

export const SellerPayments: React.FC = () => {
    const { reservations, markAsPaid } = useMarket();

    const unpaidReservations = reservations.filter(r => r.paymentStatus !== 'PAID');
    const totalUnpaid = unpaidReservations.reduce((sum, r) => sum + r.totalAmount, 0);

    return (
        <SellerLayout>
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0F172A', marginBottom: '8px' }}>
                    Płatności
                </h1>
                <p style={{ color: '#64748B' }}>Zarządzaj płatnościami za rezerwacje</p>
            </div>

            {/* Summary Card */}
            <Card style={{ marginBottom: '24px', background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontSize: '14px', color: '#92400E', marginBottom: '4px' }}>Do zapłaty łącznie</div>
                        <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#78350F' }}>{totalUnpaid} zł</div>
                        <div style={{ fontSize: '14px', color: '#A16207' }}>{unpaidReservations.length} nieopłaconych rezerwacji</div>
                    </div>
                    {unpaidReservations.length > 0 && (
                        <Button variant="primary" size="lg">
                            Opłać wszystkie
                        </Button>
                    )}
                </div>
            </Card>

            {/* Payments List */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {/* Unpaid */}
                <Card>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <XCircle size={24} color="#DC2626" />
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0F172A' }}>Do opłacenia</h3>
                    </div>

                    {unpaidReservations.length === 0 ? (
                        <p style={{ color: '#64748B', textAlign: 'center', padding: '24px' }}>
                            Wszystkie płatności uregulowane! 🎉
                        </p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {unpaidReservations.map(res => (
                                <div
                                    key={res.id}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '12px',
                                        backgroundColor: '#FEF2F2',
                                        borderRadius: '8px',
                                        border: '1px solid #FECACA'
                                    }}
                                >
                                    <div>
                                        <div style={{ fontWeight: 600, color: '#0F172A' }}>Stanowisko {res.standId}</div>
                                        <div style={{ fontSize: '12px', color: '#64748B' }}>{res.startDate}</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span style={{ fontWeight: 'bold', color: '#DC2626' }}>{res.totalAmount} zł</span>
                                        <Button size="sm" variant="primary" onClick={() => markAsPaid(res.id)}>
                                            Opłać
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>

                {/* Paid */}
                <Card>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <CheckCircle size={24} color="#16A34A" />
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0F172A' }}>Opłacone</h3>
                    </div>

                    {reservations.filter(r => r.paymentStatus === 'PAID').length === 0 ? (
                        <p style={{ color: '#64748B', textAlign: 'center', padding: '24px' }}>
                            Brak opłaconych rezerwacji
                        </p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {reservations.filter(r => r.paymentStatus === 'PAID').map(res => (
                                <div
                                    key={res.id}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '12px',
                                        backgroundColor: '#F0FDF4',
                                        borderRadius: '8px',
                                        border: '1px solid #BBF7D0'
                                    }}
                                >
                                    <div>
                                        <div style={{ fontWeight: 600, color: '#0F172A' }}>Stanowisko {res.standId}</div>
                                        <div style={{ fontSize: '12px', color: '#64748B' }}>{res.startDate}</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontWeight: 'bold', color: '#16A34A' }}>{res.totalAmount} zł</span>
                                        <Badge variant="success">Opłacone</Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>
            </div>
        </SellerLayout>
    );
};
