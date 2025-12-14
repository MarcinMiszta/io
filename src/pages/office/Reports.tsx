
import React from 'react';
import { OfficeLayout } from '../../components/layout/OfficeLayout';
import { useMarket } from '../../context/MarketContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card } from '../../components/ui/Card';

export const OfficeReports: React.FC = () => {
    const { reservations, stands } = useMarket();

    // 1. Calculate Status Counts
    const paidCount = reservations.filter(r => r.paymentStatus === 'PAID').length;
    const unpaidCount = reservations.filter(r => r.paymentStatus === 'UNPAID').length;

    const paymentData = [
        { name: 'Opłacone', value: paidCount, color: '#10B981' }, // Emerald
        { name: 'Nieopłacone', value: unpaidCount, color: '#EF4444' }, // Red
    ];

    // 2. Calculate Occupancy by Category
    const categoryStats = stands.reduce((acc: any, stand) => {
        const cat = stand.category;
        if (!acc[cat]) acc[cat] = { name: cat, total: 0, occupied: 0 };
        acc[cat].total += 1;
        if (stand.status === 'OCCUPIED' || stand.status === 'RESERVED') {
            acc[cat].occupied += 1;
        }
        return acc;
    }, {});

    const occupancyData = Object.values(categoryStats);

    // 3. Financial Summary
    const totalIncome = reservations
        .filter(r => r.paymentStatus === 'PAID')
        .reduce((sum, r) => sum + r.totalAmount, 0);

    const pendingIncome = reservations
        .filter(r => r.paymentStatus === 'UNPAID')
        .reduce((sum, r) => sum + r.totalAmount, 0);

    return (
        <OfficeLayout>
            <h1 className="text-2xl font-bold mb-6 text-primary">Raporty i Statystyki</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 border-l-4 border-emerald-500">
                    <div className="text-secondary text-sm font-semibold uppercase">Przychód (Opłacone)</div>
                    <div className="text-3xl font-bold text-emerald-800 mt-2">{totalIncome} PLN</div>
                </Card>
                <Card className="p-6 border-l-4 border-red-500">
                    <div className="text-secondary text-sm font-semibold uppercase">Oczekujące Wpłaty</div>
                    <div className="text-3xl font-bold text-red-800 mt-2">{pendingIncome} PLN</div>
                    <div className="text-xs text-red-500 mt-1">{unpaidCount} rezerwacji</div>
                </Card>
                <Card className="p-6 border-l-4 border-blue-500">
                    <div className="text-secondary text-sm font-semibold uppercase">Aktywne Rezerwacje</div>
                    <div className="text-3xl font-bold text-blue-800 mt-2">{reservations.length}</div>
                </Card>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Payment Status Chart */}
                <Card className="p-6 bg-white shadow-sm">
                    <h3 className="text-lg font-bold mb-4">Status Płatności</h3>
                    <div style={{ height: 300, width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={paymentData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {paymentData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Occupancy Chart */}
                <Card className="p-6 bg-white shadow-sm">
                    <h3 className="text-lg font-bold mb-4">Zajętość wg Kategorii</h3>
                    <div style={{ height: 300, width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={occupancyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="occupied" fill="#3B82F6" name="Zajęte" />
                                <Bar dataKey="total" fill="#E2E8F0" name="Łącznie" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </OfficeLayout>
    );
};
