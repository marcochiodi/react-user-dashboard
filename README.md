# Mini User Dashboard — React + TypeScript

## English Version

### 📦 Project Overview
This project was developed as a technical assessment.  
The goal was to create a mini user dashboard in React with:

- responsive UI
- infinite scrolling
- user detail modal
- filtering by name & role
- global loading indicator
- dark/light mode

---

### 🛠️ Tech Stack

- React + TypeScript
- Zustand
- Axios
- Bootstrap 5 + Bootstrap Icons
- DummyJSON API

---

### 🎯 Technical Decisions

- Zustand chosen over Redux → simpler, no boilerplate, fast
- Infinite scroll triggered on page bottom → simple & effective
- Pure Bootstrap instead of react-bootstrap → full control, cleaner CSS
- Theme via `data-bs-theme` → automatic Bootstrap dark/light adaptation
- Axios interceptors → global loading state
- DummyJSON → realistic mock user dataset

---

### ✅ Features

- User list & modal detail
- Role & text filters
- Infinite scroll
- Theme toggle
- Loading overlay
- Responsive layout

---

### 📝 Conclusion

The focus was on:

- clean architecture
- good developer experience
- real-world front-end patterns
- maintainable and scalable structure

Future improvements: Testing, React Query, Error boundary system.

## Italian Version

## 📦 Panoramica del progetto

Questo progetto è stato sviluppato come test tecnico.  
L'obiettivo era realizzare una mini dashboard in **React** per visualizzare, filtrare e gestire una lista utenti con:

- ✅ design moderno e responsive
- ✅ dark/light mode
- ✅ infinite scrolling
- ✅ filtro utenti per nome e ruolo
- ✅ dettaglio utente in modal
- ✅ indicatori di caricamento globali

Il risultato è un'applicazione semplice, pulita ed estensibile, progettata secondo buone pratiche.

---

## 🛠️ Stack Tecnologico

| Tecnologia | Motivazione |
|-----------|-------------|
| **React + TypeScript** | Tipizzazione forte, leggibilità e qualità del codice |
| **Zustand** | State management leggero, intuitivo, zero boilerplate |
| **Axios** | Gestione HTTP semplificata + interceptors per loading globale |
| **Bootstrap 5** | Rapid UI, responsive design, classi utili |
| **Bootstrap Icons** | Set icone semplice e coerente con Bootstrap |
| **DummyJSON API** | Mock API veloce per utenti realistici |

---

## 🎯 Scelte Tecniche e Motivazioni

### ✅ Zustand per gestione stato
Scelto al posto di Redux per:

- codice molto più semplice
- API intuitiva
- no boilerplate
- aggiornamenti dello stato chiari e leggibili

> Approccio vicino al pattern BehaviorSubject usato in Angular, quindi familiare ed efficiente.

---

### ✅ Infinite scroll basato sullo scroll della pagina
Implementato in modo semplice:

- quando l'utente raggiunge la fine della pagina → incremento `limit`
- rieseguo la fetch con un nuovo limite
- nessuna complessità aggiuntiva

Perfetto per una demo: chiaro, lineare, facilmente estensibile.

---

### ✅ Bootstrap "puro"
Nessun uso di `react-bootstrap`.  
Motivi:

- pieno controllo del markup e del CSS
- meno dipendenze
- stilizzazione chiara e più vicina a progetti reali enterprise
- codice più leggero

---

### ✅ Dark/Light theme tramite `data-bs-theme`
Tema globale impostato su `<html>`:

```ts
document.documentElement.setAttribute(
  "data-bs-theme",
  theme ? "dark" : "light"
);
```

Vantaggi:

- bootstrap cambia tema automaticamente
- niente if dentro i componenti
- soluzione scalabile e pulita

---

### ✅ DummyJSON per mock dati utenti
Scelta per:

- accesso immediato a dati realistici
- supporto `limit` per simulare infinite scroll
- ritorno di molti campi utili per dettaglio utente

Ho estratto l'interfaccia `User` dai dati JSON e l'ho mantenuta nel folder `models/`.

---

## 🚀 Funzionalità implementate

| Funzione | Dettaglio |
|--------|---------|
Lista utenti | ✅
Filtro per nome | ✅
Filtro per ruolo | ✅
Dettaglio utente in modal | ✅
Modal responsive | ✅
Dark/Light mode toggle | ✅
Infinite scrolling | ✅
Spinner globale | ✅ (via Axios interceptors)
UI responsive | ✅

---

## 📁 Struttura progetto (semplificata)

```
src/
 ├─ assets/
 ├─ components/
 ├─ store/
 ├─ models/
 ├─ api/
 ├─ styles/
 └─ App.tsx
```

---

## 🧪 Test
I test unitari possono essere aggiunti tramite:

- React Testing Library
- Jest

> Sviluppo previsto come step successivo

---

## 🚧 Possibili evoluzioni

| Miglioria | Motivazione |
|-----------|-------------|
React Query | Cache, stato server avanzato |
Test E2E (Cypress) | Validazione flussi reali |
Persistenza tema utente | UX migliorata |
Gestione errori API | Alert/Toast personalizzati |

---

