import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Stand, Reservation, Incident, User } from '../types';

interface MarketContextType {
    user: User | null;
    login: (role: User['role']) => void;
    logout: () => void;

    stands: Stand[];
    reservations: Reservation[];
    incidents: Incident[];

    // Actions
    addIncident: (incident: Omit<Incident, 'id' | 'createdAt' | 'status'>) => void;
    updateCleaningStatus: (reservationId: string, status: 'APPROVED' | 'REJECTED', note?: string) => void;
    createReservation: (reservation: Omit<Reservation, 'id' | 'createdAt' | 'paymentStatus' | 'cleaningStatus'>) => void;
    markAsPaid: (reservationId: string) => void;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

const API_URL = 'http://localhost:3000/api';

export const MarketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [stands, setStands] = useState<Stand[]>([]);
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [incidents, setIncidents] = useState<Incident[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const standsRes = await fetch(`${API_URL}/stands`);
                const standsData = await standsRes.json();
                setStands(standsData);

                const reservationsRes = await fetch(`${API_URL}/reservations`);
                const reservationsData = await reservationsRes.json();
                setReservations(reservationsData);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        fetchData();
    }, []);

    const login = (role: User['role']) => {
        const userData = {
            OFFICE: { name: 'Admin Biura', email: 'admin@targowisko.pl' },
            CONTROLLER: { name: 'Kontroler Terenowy', email: 'kontroler@targowisko.pl' },
            SELLER: { name: 'Jan Kowalski', email: 'sprzedawca@targowisko.pl' },
        };
        setUser({
            id: 'CURRENT_USER',
            name: userData[role].name,
            email: userData[role].email,
            role,
        });
    };

    const logout = () => setUser(null);

    const addIncident = (data: Omit<Incident, 'id' | 'createdAt' | 'status'>) => {
        // Optimistic UI update
        const newIncident: Incident = {
            ...data,
            id: `INC-${Date.now()}`,
            createdAt: new Date().toISOString(),
            status: 'OPEN',
        };
        setIncidents(prev => [newIncident, ...prev]);
        // TODO: Persist incident to API
    };

    const updateCleaningStatus = (reservationId: string, status: 'APPROVED' | 'REJECTED', note?: string) => {
        // Optimistic
        setReservations(prev => prev.map(res =>
            res.id === reservationId
                ? { ...res, cleaningStatus: status, cleaningNote: note }
                : res
        ));
        // TODO: API Call
    };

    const createReservation = async (data: Omit<Reservation, 'id' | 'createdAt' | 'paymentStatus' | 'cleaningStatus'>) => {
        try {
            const res = await fetch(`${API_URL}/reservations`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await res.json();

            if (result.success) {
                // Refresh data
                const standsRes = await fetch(`${API_URL}/stands`);
                setStands(await standsRes.json());

                const resRes = await fetch(`${API_URL}/reservations`);
                setReservations(await resRes.json());
            }
        } catch (error) {
            console.error("Error creating reservation", error);
            alert("Błąd podczas tworzenia rezerwacji");
        }
    };

    const markAsPaid = async (reservationId: string) => {
        // Optimistic
        setReservations(prev => prev.map(res =>
            res.id === reservationId ? { ...res, paymentStatus: 'PAID' } : res
        ));

        try {
            await fetch(`${API_URL}/reservations/${reservationId}/pay`, { method: 'PUT' });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <MarketContext.Provider value={{
            user,
            login,
            logout,
            stands,
            reservations,
            incidents,
            addIncident,
            updateCleaningStatus,
            createReservation,
            markAsPaid,
        }}>
            {children}
        </MarketContext.Provider>
    );
};

export const useMarket = () => {
    const context = useContext(MarketContext);
    if (context === undefined) {
        throw new Error('useMarket must be used within a MarketProvider');
    }
    return context;
};
