import React from 'react';
import { OfficeLayout } from '../../components/layout/OfficeLayout';
import { useMarket } from '../../context/MarketContext';
import { Card } from '../../components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'; // Mock charts
import { TrendingUp, Users, AlertCircle, DollarSign } from 'lucide-react';

const COLORS = ['#10B981', '#EF4444', '#F59E0B', '#64748B'];

export const OfficeDashboard: React.FC = () => {
    const { reservations, stands } = useMarket();

    // Calculate mock stats
    const totalRevenue = reservations.reduce((acc, curr) => acc + curr.totalAmount, 0);
    const paidReservations = reservations.filter(r => r.paymentStatus === 'PAID').length;
    const occupancyRate = Math.round((reservations.length / stands.length) * 100);

    const chartData = [
        { name: 'Spożywcze', value: 400 },
        { name: 'Przemysłowe', value: 300 },
        { name: 'Rękodzieło', value: 300 },
        { name: 'Inne', value: 200 },
    ];

    return (
        <OfficeLayout>
            <h1 className="text-3xl font-bold mb-8 text-primary">Pulpit Zarządczy</h1>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatsCard
                    title="Dzisiejszy Przychód"
                    value={`${totalRevenue} PLN`}
                    icon={<DollarSign size={24} className="text-emerald-500" />}
                    trend="+12% wczoraj"
                />
                <StatsCard
                    title="Zajętość Targu"
                    value={`${occupancyRate}%`}
                    icon={<Users size={24} className="text-blue-500" />}
                    trend="4 wolne miejsca"
                />
                <StatsCard
                    title="Opłacone Rezerwacje"
                    value={`${paidReservations} / ${reservations.length}`}
                    icon={<TrendingUp size={24} className="text-purple-500" />}
                />
                <StatsCard
                    title="Aktywne Incydenty"
                    value="0"
                    icon={<AlertCircle size={24} className="text-red-500" />}
                    highlight
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="h-96">
                    <h3 className="font-bold text-lg mb-4 text-secondary">Przychody wg Kategorii</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>

                <Card className="h-96">
                    <h3 className="font-bold text-lg mb-4 text-secondary">Status Płatności</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={[
                                    { name: 'Opłacone', value: paidReservations },
                                    { name: 'Nieopłacone', value: reservations.length - paidReservations }
                                ]}
                                innerRadius={60}
                                outerRadius={100}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {[0, 1].map((_entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </Card>
            </div>
        </OfficeLayout>
    );
};

const StatsCard = ({ title, value, icon, trend, highlight }: any) => (
    <Card className={`flex flex-col justify-between ${highlight ? 'border-red-200 bg-red-50' : ''}`}>
        <div className="flex justify-between items-start mb-4">
            <div>
                <div className="text-secondary text-sm font-medium mb-1">{title}</div>
                <div className="text-3xl font-bold text-primary">{value}</div>
            </div>
            <div className="p-2 bg-white rounded-lg shadow-sm">
                {icon}
            </div>
        </div>
        {trend && <div className="text-xs text-secondary font-medium">{trend}</div>}
    </Card>
);
