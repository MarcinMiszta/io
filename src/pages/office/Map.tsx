import React, { useState } from 'react';
import { OfficeLayout } from '../../components/layout/OfficeLayout';
import { useMarket } from '../../context/MarketContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import type { Stand } from '../../types';
import { X, Building2 } from 'lucide-react';
import '../../../src/components/layout/ResponsiveLayout.css';
import { Input } from '../../components/ui/Input';

export const OfficeMap: React.FC = () => {
    const { stands, reservations, createReservation } = useMarket();
    const [selectedStand, setSelectedStand] = useState<Stand | null>(null);
    const [isReserving, setIsReserving] = useState(false);
    const [formData, setFormData] = useState({ userName: '', days: 1 });

    const activeRes = selectedStand ? reservations.find(r => r.standId === selectedStand.id) : null;

    const handleStandClick = (stand: Stand) => {
        setSelectedStand(stand);
        setIsReserving(false);
    };

    const handleCreateReservation = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedStand) return;
        createReservation({
            standId: selectedStand.id,
            userId: 'NEW-USER',
            userName: formData.userName,
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date().toISOString().split('T')[0],
            totalAmount: selectedStand.priceDay * formData.days,
            cleaningNote: '',
        });
        alert('Rezerwacja utworzona!');
        setIsReserving(false);
        setSelectedStand(null);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'AVAILABLE': return { border: '#059669', bg: '#D1FAE5', text: '#064E3B' };
            case 'OCCUPIED': return { border: '#DC2626', bg: '#FECACA', text: '#7F1D1D' };
            case 'RESERVED': return { border: '#0284C7', bg: '#BAE6FD', text: '#0C4A6E' };
            case 'MAINTENANCE': return { border: '#6B7280', bg: '#E5E7EB', text: '#1F2937' };
            default: return { border: '#64748B', bg: '#F1F5F9', text: '#0F172A' };
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'AVAILABLE': return 'Wolne';
            case 'OCCUPIED': return 'Zajęte';
            case 'RESERVED': return 'Zarezerwowane';
            case 'MAINTENANCE': return 'Serwis';
            default: return status;
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'PERMANENT': return 'Stałe';
            case 'TEMPORARY': return 'Tymczasowe';
            case 'MOBILE': return 'Mobilne';
            default: return type;
        }
    };

    const getCategoryLabel = (cat: string) => {
        switch (cat) {
            case 'SPOZYWCZE': return '🍎 Spożywcze';
            case 'RZEMIESLNICZE': return '🔨 Rzemieślnicze';
            case 'GASTRONOMICZNE': return '🍔 Gastronomiczne';
            case 'ROLNO_OGRODNICZE': return '🥕 Rolno-ogrodnicze';
            default: return cat;
        }
    };

    const getCategoryShort = (cat: string) => {
        switch (cat) {
            case 'SPOZYWCZE': return '🍎 SPOŻ';
            case 'RZEMIESLNICZE': return '🔨 RZEM';
            case 'GASTRONOMICZNE': return '🍔 GAST';
            case 'ROLNO_OGRODNICZE': return '🥕 ROLN';
            default: return cat;
        }
    };

    return (
        <OfficeLayout>
            {/* Header */}
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                <h1 className="page-title" style={{ fontSize: '24px', fontWeight: 'bold', color: '#0F172A' }}>Mapa Targowiska</h1>
                <div className="legend-items" style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                        <span style={{ color: '#64748B', fontSize: '14px' }}>Wolne</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                        <span style={{ color: '#64748B', fontSize: '14px' }}>Zajęte</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#0EA5E9' }} />
                        <span style={{ color: '#64748B', fontSize: '14px' }}>Zarezerwowane</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#9CA3AF' }} />
                        <span style={{ color: '#64748B', fontSize: '14px' }}>Wyłączone</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="map-page-container">
                {/* Map Container */}
                <div className="map-scroll-area">
                    {/* Map Canvas - EXPANDED */}
                    <div className="map-canvas" style={{ width: '850px', height: '700px' }}>
                        {/* Roads - Vertical (between stand columns) */}
                        {/* Stand X: 20, 130, 240, 350, 460, 570, 680 (width 70) */}
                        {/* Roads at: x=100, 210, 320, 430, 540, 650 (width 20) */}
                        <div style={{ position: 'absolute', left: '100px', top: 0, bottom: 0, width: '20px', backgroundColor: '#D1D5DB' }} />
                        <div style={{ position: 'absolute', left: '210px', top: 0, bottom: 0, width: '20px', backgroundColor: '#D1D5DB' }} />
                        <div style={{ position: 'absolute', left: '320px', top: 0, bottom: 0, width: '20px', backgroundColor: '#D1D5DB' }} />
                        <div style={{ position: 'absolute', left: '430px', top: 0, bottom: 0, width: '20px', backgroundColor: '#D1D5DB' }} />
                        <div style={{ position: 'absolute', left: '540px', top: 0, bottom: 0, width: '20px', backgroundColor: '#D1D5DB' }} />
                        <div style={{ position: 'absolute', left: '650px', top: 0, bottom: 0, width: '20px', backgroundColor: '#D1D5DB' }} />

                        {/* Roads - Horizontal (between stand rows) */}
                        {/* Stand Y: 20, 120, 220, 320, 420, 520 (height 70) */}
                        {/* Roads at: y=100, 200, 300, 400, 500 (height 10) */}
                        <div style={{ position: 'absolute', top: '100px', left: 0, right: 0, height: '10px', backgroundColor: '#D1D5DB' }} />
                        <div style={{ position: 'absolute', top: '200px', left: 0, right: 0, height: '10px', backgroundColor: '#D1D5DB' }} />
                        <div style={{ position: 'absolute', top: '300px', left: 0, right: 0, height: '10px', backgroundColor: '#D1D5DB' }} />
                        <div style={{ position: 'absolute', top: '400px', left: 0, right: 0, height: '10px', backgroundColor: '#D1D5DB' }} />
                        <div style={{ position: 'absolute', top: '500px', left: 0, right: 0, height: '10px', backgroundColor: '#D1D5DB' }} />

                        {/* Main Entrance Road - connects entrance to vertical road at x=650 */}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: '650px',
                            width: '20px',
                            height: '100px',
                            backgroundColor: '#D1D5DB'
                        }} />

                        {/* Entrance */}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: '620px',
                            width: '80px',
                            height: '40px',
                            backgroundColor: '#78716C',
                            borderTop: '4px solid #57534E',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            color: 'white',
                            fontSize: '10px',
                            borderRadius: '4px 4px 0 0'
                        }}>
                            WEJŚCIE
                        </div>

                        {/* Office Building */}
                        <div style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            width: '140px',
                            height: '80px',
                            backgroundColor: '#DBEAFE',
                            border: '2px solid #93C5FD',
                            borderRadius: '6px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '8px'
                        }}>
                            <Building2 color="#3B82F6" size={20} />
                            <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#1E40AF', marginTop: '4px' }}>BIURO TARGOWISKA</span>
                        </div>

                        {/* WC */}
                        <div style={{
                            position: 'absolute',
                            bottom: '10px',
                            left: '10px',
                            width: '60px',
                            height: '60px',
                            backgroundColor: '#CFFAFE',
                            border: '2px solid #67E8F9',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: '#0E7490'
                        }}>
                            WC
                        </div>

                        {/* STANDS */}
                        {stands.map(stand => {
                            const colors = getStatusColor(stand.status);
                            const x = stand.location?.x ?? 0;
                            const y = stand.location?.y ?? 0;

                            return (
                                <button
                                    key={stand.id}
                                    onClick={() => handleStandClick(stand)}
                                    style={{
                                        position: 'absolute',
                                        left: `${x}px`,
                                        top: `${y}px`,
                                        width: '70px',
                                        height: '70px',
                                        backgroundColor: colors.bg,
                                        border: `3px solid ${colors.border}`,
                                        borderRadius: '8px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        transition: 'transform 0.15s, box-shadow 0.15s',
                                        boxShadow: selectedStand?.id === stand.id
                                            ? `0 0 0 4px rgba(15, 23, 42, 0.3)`
                                            : '0 2px 4px rgba(0,0,0,0.1)',
                                        transform: selectedStand?.id === stand.id ? 'scale(1.1)' : 'scale(1)',
                                        zIndex: selectedStand?.id === stand.id ? 20 : 10
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = selectedStand?.id === stand.id ? 'scale(1.1)' : 'scale(1)'; }}
                                >
                                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: colors.text }}>{stand.number}</div>
                                    <div style={{ fontSize: '9px', fontWeight: 'bold', color: colors.text, opacity: 0.7 }}>
                                        {getCategoryShort(stand.category)}
                                    </div>
                                    {stand.status === 'OCCUPIED' && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '-8px',
                                            right: '-8px',
                                            backgroundColor: '#EF4444',
                                            color: 'white',
                                            fontSize: '9px',
                                            padding: '2px 6px',
                                            borderRadius: '10px',
                                            fontWeight: 'bold'
                                        }}>
                                            ZAJ
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="map-sidebar">
                    {selectedStand ? (
                        <Card className="h-full">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                                <div>
                                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0F172A' }}>Stanowisko {selectedStand.id}</h2>
                                    <div style={{ color: '#64748B' }}>{getCategoryLabel(selectedStand.category)}</div>
                                </div>
                                <button onClick={() => setSelectedStand(null)} style={{ color: '#64748B', cursor: 'pointer', background: 'none', border: 'none' }}>
                                    <X size={24} />
                                </button>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                                <div>
                                    <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase' }}>Status</div>
                                    <div style={{ fontWeight: 600 }}>{getStatusLabel(selectedStand.status)}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase' }}>Cena/Dzień</div>
                                    <div style={{ fontWeight: 600 }}>{selectedStand.priceDay} PLN</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase' }}>Typ</div>
                                    <div style={{ fontWeight: 600 }}>{getTypeLabel(selectedStand.type)}</div>
                                </div>
                            </div>

                            {activeRes ? (
                                <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                                    <h3 style={{ fontWeight: 'bold', fontSize: '12px', color: '#64748B', textTransform: 'uppercase', marginBottom: '12px' }}>Aktualna Rezerwacja</h3>
                                    <div style={{ fontWeight: 600, fontSize: '18px', marginBottom: '8px' }}>{activeRes.userName}</div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '4px' }}>
                                        <span>Płatność:</span>
                                        <Badge variant={activeRes.paymentStatus === 'PAID' ? 'success' : 'danger'}>{activeRes.paymentStatus === 'PAID' ? 'Opłacone' : 'Nieopłacone'}</Badge>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                        <span>Czystość:</span>
                                        <Badge variant="neutral">{activeRes.cleaningStatus}</Badge>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div style={{ padding: '16px', backgroundColor: '#ECFDF5', color: '#065F46', borderRadius: '8px', fontSize: '14px', marginBottom: '16px' }}>
                                        To stanowisko jest wolne. Możesz utworzyć nową rezerwację.
                                    </div>
                                    {isReserving ? (
                                        <form onSubmit={handleCreateReservation}>
                                            <Input
                                                label="Imię i Nazwisko / Firma"
                                                value={formData.userName}
                                                onChange={e => setFormData({ ...formData, userName: e.target.value })}
                                                required
                                            />
                                            <Input
                                                label="Liczba Dni"
                                                type="number"
                                                value={formData.days}
                                                onChange={e => setFormData({ ...formData, days: parseInt(e.target.value) })}
                                                min={1}
                                                required
                                            />
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '18px', marginTop: '16px', marginBottom: '16px' }}>
                                                <span>Suma:</span>
                                                <span>{selectedStand.priceDay * formData.days} PLN</span>
                                            </div>
                                            <Button type="submit" fullWidth variant="primary">Zatwierdź i Opłać</Button>
                                        </form>
                                    ) : (
                                        <Button fullWidth onClick={() => setIsReserving(true)}>Utwórz Rezerwację</Button>
                                    )}
                                </div>
                            )}
                        </Card>
                    ) : (
                        <Card className="h-full" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '32px', backgroundColor: '#F8FAFC' }}>
                            <div style={{ color: '#64748B' }}>
                                <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.2 }}>🗺️</div>
                                <p>Wybierz stanowisko na mapie,<br />aby zobaczyć szczegóły.</p>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </OfficeLayout>
    );
};
