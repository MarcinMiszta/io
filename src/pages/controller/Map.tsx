import React, { useState } from 'react';
import { ControllerLayout } from '../../components/layout/ControllerLayout';
import { useMarket } from '../../context/MarketContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import type { Stand } from '../../types';
import { Building2, X } from 'lucide-react';
import '../../components/layout/ResponsiveLayout.css';

export const ControllerMap: React.FC = () => {
    const { stands, reservations } = useMarket();
    const [selectedStand, setSelectedStand] = useState<Stand | null>(null);

    const activeRes = selectedStand ? reservations.find(r => r.standId === selectedStand.id) : null;

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
        <ControllerLayout>
            <div className="page-header" style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h1 className="page-title" style={{ fontSize: '28px', fontWeight: 'bold', color: '#0F172A', marginBottom: '8px' }}>Mapa Targowiska</h1>
                    <p style={{ color: '#64748B' }}>Podgląd stanowisk i kontrola</p>
                </div>
                <div className="legend-items" style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                        <span style={{ color: '#64748B', fontSize: '13px' }}>Wolne</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                        <span style={{ color: '#64748B', fontSize: '13px' }}>Zajęte</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#0EA5E9' }} />
                        <span style={{ color: '#64748B', fontSize: '13px' }}>Zarezerwowane</span>
                    </div>
                </div>
            </div>

            <div className="map-page-container">
                {/* Map */}
                <div className="map-scroll-area">
                    <div className="map-canvas" style={{ width: '850px', height: '700px' }}>
                        {/* Roads */}
                        <div style={{ position: 'absolute', left: '100px', top: 0, bottom: 0, width: '20px', backgroundColor: '#D1D5DB' }} />
                        <div style={{ position: 'absolute', left: '210px', top: 0, bottom: 0, width: '20px', backgroundColor: '#D1D5DB' }} />
                        <div style={{ position: 'absolute', left: '320px', top: 0, bottom: 0, width: '20px', backgroundColor: '#D1D5DB' }} />
                        <div style={{ position: 'absolute', left: '430px', top: 0, bottom: 0, width: '20px', backgroundColor: '#D1D5DB' }} />
                        <div style={{ position: 'absolute', left: '540px', top: 0, bottom: 0, width: '20px', backgroundColor: '#D1D5DB' }} />
                        <div style={{ position: 'absolute', left: '650px', top: 0, bottom: 0, width: '20px', backgroundColor: '#D1D5DB' }} />
                        <div style={{ position: 'absolute', top: '100px', left: 0, right: 0, height: '10px', backgroundColor: '#D1D5DB' }} />
                        <div style={{ position: 'absolute', top: '200px', left: 0, right: 0, height: '10px', backgroundColor: '#D1D5DB' }} />
                        <div style={{ position: 'absolute', top: '300px', left: 0, right: 0, height: '10px', backgroundColor: '#D1D5DB' }} />
                        <div style={{ position: 'absolute', top: '400px', left: 0, right: 0, height: '10px', backgroundColor: '#D1D5DB' }} />
                        <div style={{ position: 'absolute', top: '500px', left: 0, right: 0, height: '10px', backgroundColor: '#D1D5DB' }} />

                        {/* Office */}
                        <div style={{ position: 'absolute', top: '10px', right: '10px', width: '100px', height: '60px', backgroundColor: '#DBEAFE', border: '2px solid #93C5FD', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                            <Building2 color="#3B82F6" size={20} />
                            <span style={{ fontSize: '9px', fontWeight: 'bold', color: '#1E40AF', marginTop: '2px' }}>BIURO</span>
                        </div>

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

                        {/* Stands */}
                        {stands.map(stand => {
                            const colors = getStatusColor(stand.status);
                            return (
                                <button
                                    key={stand.id}
                                    onClick={() => setSelectedStand(stand)}
                                    style={{
                                        position: 'absolute',
                                        left: `${stand.location?.x ?? 0}px`,
                                        top: `${stand.location?.y ?? 0}px`,
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
                                        boxShadow: selectedStand?.id === stand.id ? '0 0 0 4px rgba(5, 150, 105, 0.4)' : '0 2px 4px rgba(0,0,0,0.1)',
                                        transform: selectedStand?.id === stand.id ? 'scale(1.1)' : 'scale(1)',
                                        zIndex: selectedStand?.id === stand.id ? 20 : 10
                                    }}
                                >
                                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: colors.text, textShadow: '0 1px 0 rgba(255,255,255,0.5)' }}>{stand.number}</div>
                                    <div style={{ fontSize: '14px' }}>{getCategoryShort(stand.category)}</div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="map-sidebar">
                    {selectedStand ? (
                        <Card>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Stanowisko {selectedStand.number}</h2>
                                <button onClick={() => setSelectedStand(null)} style={{ color: '#64748B', background: 'none', border: 'none', cursor: 'pointer' }}>
                                    <X size={20} />
                                </button>
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <Badge variant={selectedStand.status === 'AVAILABLE' ? 'success' : selectedStand.status === 'OCCUPIED' ? 'danger' : 'neutral'}>
                                    {getStatusLabel(selectedStand.status)}
                                </Badge>
                            </div>
                            {activeRes && (
                                <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
                                    <div style={{ fontWeight: 600, marginBottom: '8px' }}>{activeRes.userName}</div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                        <span>Płatność:</span>
                                        <Badge variant={activeRes.paymentStatus === 'PAID' ? 'success' : 'danger'}>
                                            {activeRes.paymentStatus === 'PAID' ? 'Opłacone' : 'Nieopłacone'}
                                        </Badge>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginTop: '4px' }}>
                                        <span>Czystość:</span>
                                        <Badge variant={activeRes.cleaningStatus === 'APPROVED' ? 'success' : activeRes.cleaningStatus === 'REJECTED' ? 'danger' : 'warning'}>
                                            {activeRes.cleaningStatus === 'APPROVED' ? 'OK' : activeRes.cleaningStatus === 'REJECTED' ? 'Odrzucone' : 'Do sprawdzenia'}
                                        </Badge>
                                    </div>
                                </div>
                            )}
                        </Card>
                    ) : (
                        <Card style={{ textAlign: 'center', padding: '32px', color: '#64748B' }}>
                            <p>Wybierz stanowisko na mapie</p>
                        </Card>
                    )}
                </div>
            </div>
        </ControllerLayout>
    );
};
