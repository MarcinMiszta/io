import React, { useState } from 'react';
import { SellerLayout } from '../../components/layout/SellerLayout';
import { useMarket } from '../../context/MarketContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Store, Search } from 'lucide-react';

export const SellerStands: React.FC = () => {
    const { stands, createReservation } = useMarket();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStand, setSelectedStand] = useState<typeof stands[0] | null>(null);
    const [formData, setFormData] = useState({ userName: '', days: 1 });

    const availableStands = stands.filter(s =>
        s.status === 'AVAILABLE' &&
        (searchTerm === '' || s.number.toString().includes(searchTerm) || s.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const getCategoryLabel = (cat: string) => {
        switch (cat) {
            case 'SPOZYWCZE': return 'Spożywcze';
            case 'RZEMIESLNICZE': return 'Rzemieślnicze';
            case 'GASTRONOMICZNE': return 'Gastronomiczne';
            case 'ROLNO_OGRODNICZE': return 'Rolno-ogrodnicze';
            default: return cat;
        }
    };

    const handleReserve = () => {
        if (!selectedStand || !formData.userName) return;
        createReservation({
            standId: selectedStand.id,
            userId: 'CURRENT_USER',
            userName: formData.userName,
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date().toISOString().split('T')[0],
            totalAmount: selectedStand.priceDay * formData.days,
            cleaningNote: '',
        });
        alert('Rezerwacja utworzona!');
        setSelectedStand(null);
        setFormData({ userName: '', days: 1 });
    };

    return (
        <SellerLayout>
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0F172A', marginBottom: '8px' }}>
                    Dostępne Stanowiska
                </h1>
                <p style={{ color: '#64748B' }}>Przeglądaj i rezerwuj wolne stanowiska</p>
            </div>

            <div style={{ display: 'flex', gap: '24px' }}>
                {/* Stands List */}
                <div style={{ flex: 1 }}>
                    <Card>
                        <div style={{ marginBottom: '16px', position: 'relative' }}>
                            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                            <input
                                type="text"
                                placeholder="Szukaj po numerze lub kategorii..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 12px 12px 40px',
                                    border: '1px solid #E2E8F0',
                                    borderRadius: '8px',
                                    fontSize: '14px'
                                }}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                            {availableStands.length === 0 ? (
                                <p style={{ gridColumn: 'span 3', textAlign: 'center', color: '#64748B', padding: '32px' }}>
                                    Brak dostępnych stanowisk
                                </p>
                            ) : (
                                availableStands.map(stand => (
                                    <div
                                        key={stand.id}
                                        onClick={() => setSelectedStand(stand)}
                                        style={{
                                            padding: '16px',
                                            backgroundColor: selectedStand?.id === stand.id ? '#FEF3C7' : '#F8FAFC',
                                            border: selectedStand?.id === stand.id ? '2px solid #D97706' : '1px solid #E2E8F0',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            transition: 'all 0.15s'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#0F172A' }}>#{stand.number}</span>
                                            <Badge variant="success">Wolne</Badge>
                                        </div>
                                        <div style={{ fontSize: '13px', color: '#64748B', marginBottom: '8px' }}>
                                            {getCategoryLabel(stand.category)}
                                        </div>
                                        <div style={{ fontSize: '16px', fontWeight: 600, color: '#D97706' }}>
                                            {stand.priceDay} zł/dzień
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </Card>
                </div>

                {/* Reservation Form */}
                <div style={{ width: '350px' }}>
                    <Card>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#0F172A' }}>
                            Rezerwacja
                        </h3>

                        {selectedStand ? (
                            <div>
                                <div style={{ padding: '16px', backgroundColor: '#FEF3C7', borderRadius: '8px', marginBottom: '16px' }}>
                                    <div style={{ fontWeight: 'bold', color: '#92400E' }}>
                                        Stanowisko #{selectedStand.number}
                                    </div>
                                    <div style={{ fontSize: '13px', color: '#A16207' }}>
                                        {getCategoryLabel(selectedStand.category)} • {selectedStand.priceDay} zł/dzień
                                    </div>
                                </div>

                                <Input
                                    label="Nazwa firmy / Imię i nazwisko"
                                    value={formData.userName}
                                    onChange={e => setFormData({ ...formData, userName: e.target.value })}
                                    fullWidth
                                />

                                <Input
                                    label="Liczba dni"
                                    type="number"
                                    min={1}
                                    value={formData.days}
                                    onChange={e => setFormData({ ...formData, days: parseInt(e.target.value) || 1 })}
                                    fullWidth
                                />

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '16px',
                                    backgroundColor: '#F1F5F9',
                                    borderRadius: '8px',
                                    marginBottom: '16px'
                                }}>
                                    <span style={{ fontWeight: 500 }}>Suma do zapłaty:</span>
                                    <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#D97706' }}>
                                        {selectedStand.priceDay * formData.days} zł
                                    </span>
                                </div>

                                <Button
                                    variant="primary"
                                    fullWidth
                                    onClick={handleReserve}
                                    disabled={!formData.userName}
                                >
                                    Zarezerwuj i Opłać
                                </Button>
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '32px', color: '#64748B' }}>
                                <Store size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
                                <p>Wybierz stanowisko z listy, aby zarezerwować</p>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </SellerLayout>
    );
};
