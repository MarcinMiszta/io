
import express from 'express';
import Database from 'better-sqlite3';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database('market.db');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Initialize DB
db.exec(`
  CREATE TABLE IF NOT EXISTS stands (
    id TEXT PRIMARY KEY,
    type TEXT,
    category TEXT,
    number INTEGER,
    priceDay INTEGER,
    status TEXT,
    x INTEGER,
    y INTEGER
  );

  CREATE TABLE IF NOT EXISTS reservations (
    id TEXT PRIMARY KEY,
    standId TEXT,
    userId TEXT,
    userName TEXT,
    startDate TEXT,
    endDate TEXT,
    totalAmount INTEGER,
    paymentStatus TEXT,
    cleaningStatus TEXT,
    cleaningNote TEXT,
    createdAt TEXT,
    FOREIGN KEY(standId) REFERENCES stands(id)
  );

  CREATE TABLE IF NOT EXISTS incidents (
    id TEXT PRIMARY KEY,
    createdAt TEXT,
    status TEXT
    -- Add other fields as needed
  );
`);

// SEED DATA GENERATOR
const count = db.prepare('SELECT count(*) as count FROM stands').get();

if (count.count === 0) {
    console.log('Seeding database with MASSIVE data...');
    const insertStand = db.prepare(`INSERT INTO stands (id, type, category, number, priceDay, status, x, y) VALUES (@id, @type, @category, @number, @priceDay, @status, @x, @y)`);
    const insertRes = db.prepare(`INSERT INTO reservations (id, standId, userId, userName, startDate, endDate, totalAmount, paymentStatus, cleaningStatus, createdAt) VALUES (@id, @standId, @userId, @userName, @startDate, @endDate, @totalAmount, @paymentStatus, @cleaningStatus, @createdAt)`);

    const categories = [
        { code: 'SP', name: 'SPOZYWCZE', type: 'PERMANENT', price: 60 },
        { code: 'RZ', name: 'RZEMIESLNICZE', type: 'PERMANENT', price: 50 },
        { code: 'GA', name: 'GASTRONOMICZNE', type: 'TEMPORARY', price: 100 },
        { code: 'RO', name: 'ROLNO_OGRODNICZE', type: 'MOBILE', price: 30 },
    ];

    const stands = [];
    const reservations = [];

    // Map is 1100x750px (expanded)
    // Stand size: 70x70px
    // 
    // 7 columns of stands with roads between:
    // X positions: 20, 130, 240, 350, 460, 570, 680
    // Roads at: 100, 210, 320, 430, 540, 650 (width 20px each)
    //
    // 6 rows of stands with roads between:
    // Y positions: 20, 120, 220, 320, 420, 520
    // Roads at: 100, 200, 300, 400, 500 (height 10px each)

    const standXPositions = [20, 130, 240, 350, 460, 570, 680]; // 7 columns
    const standYPositions = [20, 120, 220, 320, 420, 520]; // 6 rows

    let standCounter = 1;
    for (let row = 0; row < standYPositions.length; row++) {
        for (let col = 0; col < standXPositions.length; col++) {
            // Skip top-right corner (office area) - row 0, col 6
            if (row === 0 && col === 6) continue;
            // Skip bottom corners for WC and entrance
            if (row === 5 && col === 0) continue; // WC area
            if (row === 5 && col >= 5) continue; // Entrance area

            const catIndex = Math.floor(Math.random() * categories.length);
            const cat = categories[catIndex];

            let prefix = 'S';
            if (cat.type === 'TEMPORARY') prefix = 'T';
            if (cat.type === 'MOBILE') prefix = 'M';

            const id = `${prefix}-${cat.code}-${standCounter}`;

            const statuses = ['AVAILABLE', 'AVAILABLE', 'OCCUPIED', 'RESERVED', 'MAINTENANCE'];
            const status = statuses[Math.floor(Math.random() * statuses.length)];

            stands.push({
                id,
                type: cat.type,
                category: cat.name,
                number: standCounter,
                priceDay: cat.price,
                status,
                x: standXPositions[col],
                y: standYPositions[row]
            });

            // If Occupied/Reserved, generate fake reservation
            if (status === 'OCCUPIED' || status === 'RESERVED') {
                reservations.push({
                    id: `R-${Date.now()}-${standCounter}`,
                    standId: id,
                    userId: `U-${Math.floor(Math.random() * 1000)}`,
                    userName: `Najemca ${standCounter}`,
                    startDate: new Date().toISOString().split('T')[0],
                    endDate: new Date().toISOString().split('T')[0],
                    totalAmount: cat.price * 7, // week
                    paymentStatus: Math.random() > 0.3 ? 'PAID' : 'UNPAID',
                    cleaningStatus: Math.random() > 0.5 ? 'APPROVED' : 'PENDING',
                    createdAt: new Date().toISOString()
                });
            }
            standCounter++;
        }
    }

    // Insert Stands
    const tx = db.transaction(() => {
        for (const s of stands) insertStand.run(s);
        for (const r of reservations) insertRes.run(r);
    });
    tx();
    console.log(`Seeded ${stands.length} stands and ${reservations.length} reservations.`);
}

// API Routes
app.get('/api/stands', (req, res) => {
    const stands = db.prepare('SELECT * FROM stands').all();
    // Map logic needs x,y nested? No, previously I flat mapped it.
    // Frontend expects location: {x,y}
    const formatted = stands.map(s => ({
        ...s,
        location: { x: s.x, y: s.y }
    }));
    res.json(formatted);
});

app.get('/api/reservations', (req, res) => {
    const reservations = db.prepare('SELECT * FROM reservations').all();
    res.json(reservations);
});

app.post('/api/reservations', (req, res) => {
    const { standId, userId, userName, startDate, endDate, totalAmount, paymentStatus, cleaningStatus } = req.body;
    const id = `R-${Date.now()}`;
    const createdAt = new Date().toISOString();

    const stmt = db.prepare(`
    INSERT INTO reservations (id, standId, userId, userName, startDate, endDate, totalAmount, paymentStatus, cleaningStatus, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

    try {
        stmt.run(id, standId, userId, userName, startDate, endDate, totalAmount, paymentStatus, cleaningStatus, createdAt);

        // Update stand status
        db.prepare('UPDATE stands SET status = ? WHERE id = ?').run('RESERVED', standId);

        res.json({ success: true, id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/reservations/:id/pay', (req, res) => {
    const { id } = req.params;
    db.prepare('UPDATE reservations SET paymentStatus = ? WHERE id = ?').run('PAID', id);
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`API Server running at http://localhost:${port}`);
});
