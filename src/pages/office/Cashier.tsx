import React, { useState } from 'react';
import { OfficeLayout } from '../../components/layout/OfficeLayout';
import { useMarket } from '../../context/MarketContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Search, CreditCard, Banknote } from 'lucide-react';

export const OfficeCashier: React.FC = () => {
    const { reservations, markAsPaid } = useMarket();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredReservations = reservations.filter(r =>
        r.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <OfficeLayout>
            <h1 className="text-3xl font-bold mb-8 text-primary">Kasjer</h1>

            <div className="max-w-3xl mx-auto">
                <Card className="mb-6">
                    <div className="flex gap-4 items-center">
                        <div className="flex-1 relative flex items-center">
                            <Search className="absolute left-3 text-gray-400 pointer-events-none" size={20} />
                            <input
                                type="text"
                                placeholder="Szukaj po nazwisku lub numerze rezerwacji..."
                                className="form-input pl-10 w-full"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button>Szukaj</Button>
                    </div>
                </Card>

                <div className="space-y-4">
                    {filteredReservations.map(res => (
                        <Card key={res.id} className="flex justify-between items-center transition-all hover:shadow-md">
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="font-mono text-sm bg-slate-100 px-2 py-1 rounded">{res.id}</span>
                                    <span className="font-bold text-primary">{res.userName}</span>
                                </div>
                                <div className="text-sm text-secondary">
                                    Stanowisko: {res.standId} | Kwota: <strong>{res.totalAmount} PLN</strong>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                {res.paymentStatus === 'PAID' ? (
                                    <Badge variant="success" className="px-4 py-2 text-sm">Opłacone</Badge>
                                ) : (
                                    <div className="flex gap-2">
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            onClick={() => markAsPaid(res.id)}
                                            leftIcon={<Banknote size={16} />}
                                        >
                                            Gotówka
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => markAsPaid(res.id)}
                                            leftIcon={<CreditCard size={16} />}
                                        >
                                            Karta
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </Card>
                    ))}

                    {filteredReservations.length === 0 && (
                        <div className="text-center text-secondary py-12 opacity-50">
                            Brak wyników wyszukiwania
                        </div>
                    )}
                </div>
            </div>
        </OfficeLayout>
    );
};
