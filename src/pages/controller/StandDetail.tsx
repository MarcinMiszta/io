import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMarket } from '../../context/MarketContext';
import { ControllerLayout } from '../../components/layout/ControllerLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { CheckCircle, XCircle, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Input } from '../../components/ui/Input';

export const StandDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { stands, reservations, updateCleaningStatus, addIncident } = useMarket();

    const stand = stands.find(s => s.id === id);
    const reservation = reservations.find(r => r.standId === id); // Assuming active for today

    const [note, setNote] = useState('');
    const [showRejectForm, setShowRejectForm] = useState(false);

    if (!stand) return <div className="p-4">Stanowisko nie znalezione</div>;

    const handleCleaningAction = (status: 'APPROVED' | 'REJECTED') => {
        if (!reservation) return;
        if (status === 'REJECTED' && !showRejectForm) {
            setShowRejectForm(true);
            return;
        }
        updateCleaningStatus(reservation.id, status, note);
        setShowRejectForm(false);
    };

    const handleReportIncident = () => {
        // Quick incident report
        addIncident({
            standId: stand.id,
            reporterId: 'CURRENT', // In real app, from user context
            type: 'OTHER',
            description: 'Naruszenie regulaminu zgłoszone przez kontrolera.',
        });
        alert('Zgłoszenie wysłane');
    };

    return (
        <ControllerLayout>
            <Button variant="secondary" size="sm" onClick={() => navigate(-1)} className="mb-4">
                <ArrowLeft size={16} /> Wróć
            </Button>

            <Card className="mb-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-primary">{stand.id}</h1>
                        <div className="text-secondary">{stand.category}</div>
                    </div>
                    <Badge variant={stand.status === 'OCCUPIED' || stand.status === 'RESERVED' ? 'success' : 'neutral'}>
                        {stand.status}
                    </Badge>
                </div>

                {reservation ? (
                    <div className="bg-slate-50 p-4 rounded-md border border-slate-100">
                        <div className="text-xs text-secondary uppercase tracking-wider mb-1">Najemca</div>
                        <div className="font-semibold text-lg">{reservation.userName}</div>
                        <div className="text-sm text-secondary mt-1">
                            Rezerwacja: {reservation.id} <br />
                            Data: {reservation.startDate} - {reservation.endDate}
                        </div>
                    </div>
                ) : (
                    <div className="p-4 bg-orange-50 text-orange-800 rounded-md">
                        Brak aktywnej rezerwacji na to stanowisko dzisiaj.
                    </div>
                )}
            </Card>

            {reservation && (
                <>
                    <h2 className="text-lg font-bold mb-3 text-secondary">Status Opłat</h2>
                    <Card className={`mb-6 flex items-center justify-between ${reservation.paymentStatus === 'PAID' ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
                        <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-full ${reservation.paymentStatus === 'PAID' ? 'bg-emerald-200' : 'bg-red-200'}`}>
                                <DollarSignIcon status={reservation.paymentStatus} />
                            </div>
                            <div>
                                <div className="font-bold text-lg">
                                    {reservation.paymentStatus === 'PAID' ? 'OPŁACONE' : 'NIEOPŁACONE'}
                                </div>
                                <div className="text-sm opacity-80">Kwota: {reservation.totalAmount} PLN</div>
                            </div>
                        </div>
                    </Card>

                    <h2 className="text-lg font-bold mb-3 text-secondary">Kontrola Czystości</h2>
                    <Card className="mb-6">
                        <div className="current-status mb-4 text-center">
                            Status: <strong>
                                {reservation.cleaningStatus === 'PENDING' && 'Do sprawdzenia'}
                                {reservation.cleaningStatus === 'APPROVED' && 'Zatwierdzone'}
                                {reservation.cleaningStatus === 'REJECTED' && 'Odrzucone'}
                            </strong>
                        </div>

                        {showRejectForm ? (
                            <div className="mb-4">
                                <Input
                                    label="Powód odrzucenia (Notatka)"
                                    value={note}
                                    onChange={e => setNote(e.target.value)}
                                    className="mb-2"
                                />
                                <div className="flex gap-2">
                                    <Button variant="danger" fullWidth onClick={() => handleCleaningAction('REJECTED')}>
                                        Potwierdź odrzucenie
                                    </Button>
                                    <Button variant="secondary" fullWidth onClick={() => setShowRejectForm(false)}>
                                        Anuluj
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                <Button
                                    variant={reservation.cleaningStatus === 'APPROVED' ? 'success' : 'secondary'}
                                    className="h-24 flex-col"
                                    onClick={() => handleCleaningAction('APPROVED')}
                                >
                                    <CheckCircle size={32} className="mb-2" />
                                    Zatwierdź
                                </Button>
                                <Button
                                    variant={reservation.cleaningStatus === 'REJECTED' ? 'danger' : 'secondary'}
                                    className="h-24 flex-col text-red-600"
                                    onClick={() => handleCleaningAction('REJECTED')}
                                >
                                    <XCircle size={32} className="mb-2" />
                                    Odrzuć
                                </Button>
                            </div>
                        )}
                    </Card>
                </>
            )}

            <Button variant="danger" fullWidth className="mt-8" onClick={handleReportIncident}>
                <AlertTriangle size={20} /> Zgłoś Incydent
            </Button>
        </ControllerLayout>
    );
};

const DollarSignIcon = ({ status }: { status: string }) => {
    if (status === 'PAID') return <span className="text-emerald-700 font-bold">$</span>
    return <span className="text-red-700 font-bold">!</span>
}
