# Ligalytics - Team-Pairing-Verwaltung

## Kurze Erklärung der Lösung

Diese Anwendung ermöglicht es Benutzern, Paarungswünsche zwischen Teams zu erfassen und zu verwalten. Die Lösung besteht aus drei Hauptkomponenten:

### Kernfunktionalitäten:

1. **Formular zum Erstellen von Pairings**: Modal-Dialog mit validierter Eingabe
2. **Interaktive Tabelle zur Darstellung**: Sortierbare und gruppierbare Datenansicht
3. **Lokale Datenpersistierung**: im Local Storage

### Technische Architektur:

- **Frontend**: React 19.1.1 mit TypeScript
- **UI-Komponenten**: shadcn/ui Komponenten
- **Styling**: TailwindCSS
- **Datenvalidierung**: Zod Schema Validation mit react-hook-form
- **Tabellenfunktionalität**: TanStack Table v8 für erweiterte Sortier- und Gruppierungsoptionen

### Datenmodell:

```typescript
interface Pairing {
    id: number;
    teamA: string;
    teamB: string;
    startDate: Date;
    endDate: Date;
    rule:
        | "am gleichen Tag zuhause"
        | "am gleichen Wochenende zuhause"
        | "nicht am gleichen Tag zuhause"
        | "nicht am gleichen Wochenende zuhause";
    commentary?: string;
    createdAt: string;
}
```

## Gewählte Visualisierungsmethode und Begründung

### Interaktive Daten-Tabelle mit erweiterten Funktionen

**Begründung für diese Lösung:**

1. **Übersichtlichkeit**: Tabellenformat bietet die beste Lesbarkeit für strukturierte Daten mit mehreren Attributen
2. **Skalierbarkeit**: Kann problemlos hunderte von Pairings darstellen ohne Performance-Einbußen
3. **Interaktivität**:
    - **Sortierung**: Spalten sind sortierbar (aufsteigend/absteigend)
    - **Gruppierung**: Dynamisches Gruppieren nach Team A, Team B oder Regel

### Spezifische UI/UX-Entscheidungen:

1. **Modal-Dialog für Eingaben**:
    - Vermeidet Seitenwechsel
    - Fokussierte Eingabeerfahrung
    - Automatisches Schließen nach erfolgreichem Speichern

2. **Toast-Notifications**:
    - Sofortiges Feedback für Benutzeraktionen
    - Erfolgs- und Fehlermeldungen mit Details

3. **Tooltips und Hover-States**:
    - Kontextuelle Hilfe für Buttons
    - Verbesserte Accessibility

## Geschätzter Zeitaufwand

### Gesamtaufwand: 1.5 Stunden

## Was ich mit mehr Zeit noch ergänzt hätte

**Konfliktlogik implementieren**

**Erweiterte Datenvalidierung**:

- Prüfung auf doppelte Pairings
- Business-Rule Validierung
- Warnung bei kritischen Überschneidungen

**Performance-Optimierungen**:

- Virtual Scrolling für große Datenmengen

**Erweiterte Visualisierungen**:

- Kalender-View für zeitbasierte Analyse
- Gantt-Chart für Zeitraum-Übersicht
- Dashboard mit Statistiken

**Testing-Suite**:

- Unit Tests (Jest + React Testing Library)
- Integration Tests
- E2E Tests (Playwright/Cypress)
- Visual Regression Tests

### Technische Verbesserungen:

**Zugänglichkeit (a11y)**:

- Screen Reader Support
- Keyboard Navigation
- ARIA Labels und Descriptions
- High Contrast Mode

**Internationalisierung**:

- i18n Support (react-i18next)
- Mehrsprachigkeit
- Lokalisierte Datums-/Zeitformate
