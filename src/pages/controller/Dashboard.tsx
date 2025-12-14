import React from 'react';
import { useMarket } from '../../context/MarketContext';
import { ControllerLayout } from '../../components/layout/ControllerLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useNavigate } from 'react-router-dom';
import { MapPin, Brush } from 'lucide-react';

export const ControllerDashboard: React.FC = () => {
    const { reservations } = useMarket();
    const navigate = useNavigate();

    // Filter mainly active reservations for today
    const todaysTasks = reservations; // In real app, filter by date = today

    return (
        <ControllerLayout>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Zadania na dziś</h1>

            <div className="flex flex-col gap-4">
                {todaysTasks.map(res => (
                    <Card
                        key={res.id}
                        interactive
                        className="flex flex-col gap-3 border-l-4 border-l-primary"
                        onClick={() => navigate(`/controller/stand/${res.standId}`)}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <MapPin size={16} className="text-secondary" />
                                    <span className="text-xl font-bold text-primary">{res.standId}</span>
                                </div>
                                <div className="text-sm text-secondary font-medium">{res.userName}</div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <Badge variant={res.paymentStatus === 'PAID' ? 'success' : 'danger'}>
                                    {res.paymentStatus === 'PAID' ? 'OPŁACONE' : 'BRAK WPŁATY'}
                                </Badge>
                            </div>
                        </div>

                        <div className="h-px bg-gray-100 my-1" />

                        <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2 text-secondary">
                                <Brush size={16} />
                                <span>Czystość:</span>
                            </div>
                            <div>
                                {res.cleaningStatus === 'PENDING' && <Badge variant="warning">DO SPRAWDZENIA</Badge>}
                                {res.cleaningStatus === 'APPROVED' && <Badge variant="success">ZATWIERDZONE</Badge>}
                                {res.cleaningStatus === 'REJECTED' && <Badge variant="danger">ODRZUCONE</Badge>}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </ControllerLayout>
    );
};
