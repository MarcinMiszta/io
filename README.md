# 🏪 Targowisko Miejskie - System Zarządzania

System zarządzania targowiskiem miejskim z trzema panelami użytkowników: Biuro, Kontroler i Sprzedawca.

## 🚀 Uruchomienie projektu

### Wymagania
- Node.js (v18+)
- npm lub yarn
- Git

### Instalacja i uruchomienie

```bash
# 1. Sklonuj repozytorium
git clone https://github.com/MarcinMiszta/io.git

# 2. Przejdź do folderu projektu
cd targowisko-miejskie

# 3. Zainstaluj zależności
npm install

# 4. Uruchom aplikację (frontend + backend)
npm run dev
```

Aplikacja będzie dostępna pod adresem: **http://localhost:5173**

## 📋 Funkcjonalności

### Panel Biura (Office)
- Dashboard z KPI i wykresami
- Interaktywna mapa targowiska
- Moduł kasjera do obsługi płatności
- Raporty i statystyki

### Panel Kontrolera
- Mapa targowiska z podglądem stanowisk
- Weryfikacja czystości stanowisk
- Zgłaszanie i przeglądanie incydentów
- Lista kontroli do wykonania

### Panel Sprzedawcy/Klienta
- Przeglądanie dostępnych stanowisk
- Rezerwacja stanowisk
- Historia rezerwacji
- Płatności online

## 🗂️ Struktura projektu

```
io/
├── server/           # Backend (Express.js + SQLite)
│   └── index.js
├── src/
│   ├── components/   # Komponenty UI
│   │   ├── layout/   # Layouty dla ról
│   │   └── ui/       # Button, Card, Badge, Input
│   ├── context/      # MarketContext (stan aplikacji)
│   ├── pages/        # Strony aplikacji
│   │   ├── controller/
│   │   ├── office/
│   │   └── seller/
│   ├── styles/       # Style globalne
│   └── types/        # Definicje TypeScript
├── package.json
└── README.md
```

## 🛠️ Technologie

- **Frontend**: React 18, TypeScript, Vite
- **Backend**: Express.js, SQLite (better-sqlite3)
- **Wykresy**: Recharts
- **Ikony**: Lucide React
- **Style**: CSS (Vanilla)

## 📱 Responsywność

Aplikacja jest w pełni responsywna:
- Desktop: sidebar nawigacyjny
- Mobile: hamburger menu z wysuwanym panelem

## 🔐 Logowanie

Na stronie głównej wybierz rolę i podaj dowolny login/hasło:
- **Kontroler** → Panel kontrolera terenowego
- **Biuro** → Panel administracyjny
- **Sprzedawca** → Panel klienta

---

Autor: System Targowiska Miejskiego
