export type UserRole = 'OFFICE' | 'CONTROLLER' | 'SELLER';

export interface User {
    id: string;
    name: string;
    role: UserRole;
    email: string;
}

export type StandType = 'PERMANENT' | 'TEMPORARY' | 'MOBILE';
export type StandCategory = 'SPOZYWCZE' | 'PRZEMYSLOWE' | 'ROLNO_OGRODNICZE' | 'RZEMIESLNICZE' | 'ANTYKWARIAT' | 'ZWIERZECE' | 'GASTRONOMICZNE';
export type StandStatus = 'AVAILABLE' | 'OCCUPIED' | 'RESERVED' | 'MAINTENANCE';

export interface Stand {
    id: string; // e.g. S-RZ-3
    type: StandType;
    category: StandCategory;
    number: number;
    location: { x: number; y: number }; // For map coordinates
    priceDay: number;
    status: StandStatus;
}

export type CleaningStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type PaymentStatus = 'PAID' | 'UNPAID' | 'OVERDUE';

export interface Reservation {
    id: string;
    standId: string;
    userId: string; // Seller ID
    userName: string; // Denormalized for display
    startDate: string; // ISO Date
    endDate: string;
    totalAmount: number;
    paymentStatus: PaymentStatus;
    cleaningStatus: CleaningStatus; // For daily checks
    cleaningNote?: string;
    createdAt: string;
}

export interface Incident {
    id: string;
    standId?: string;
    reporterId: string;
    type: 'CLEANING' | 'SECURITY' | 'TECHNICAL' | 'OTHER';
    description: string;
    status: 'OPEN' | 'RESOLVED';
    createdAt: string;
}
