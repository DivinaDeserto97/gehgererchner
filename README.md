# Planet Zoo – Gehege-Rechner & Gruppentool

Dieses Projekt ist komplett **lokal im Browser** lauffähig.  
Keine Installation, kein Python, keine Node-Tools.

---

## 📂 Struktur

```
planet-zoo/
├─ index.html
├─ db/
│  ├─ species/
│  │  ├─ species.json
│  │  └─ pairings.json
│  └─ mieneSpecies/
│     ├─ species.json
│     └─ pairings.json
├─ tools/
│  ├─ data.js
│  ├─ graph.js
│  ├─ enclosure.js
│  └─ app.js
├─ style/
│  └─ main.css
└─ README.md
```

---

## 🚀 Nutzung

1. Öffne die Datei **`index.html`** direkt im Browser  
   *(Doppelklick oder „Mit Browser öffnen“)*

2. In der Datei `index.html` kannst du wählen, welche Datenvariante geladen wird:
   ```js
   const base = './db/species/';
   // oder './db/mieneSpecies/';
   ```

3. Nach dem Laden erscheint im Browser eine kleine Oberfläche:

   - Dropdown: Starttier auswählen  
   - „Grösste Gruppe“ berechnet automatisch die grösste kompatible Kombination  
   - Danach Anzahl Tiere pro Art eingeben  
   - „Gehege berechnen“ zeigt die aufsummierten Mindestflächen

---

## 💾 Datenstruktur

### species.json

Enthält alle Arten mit ihren Eigenschaften und eingebetteten Gehegedaten.

```json
{
  "id": 12,
  "slug": "elch",
  "name": "Elch",
  "besucher": "geschlossen",
  "kontinente": ["Europa", "Asien"],
  "biome": ["taiga", "gemässigt"],
  "gehege": {
    "land_m2_min": 600,
    "wasser_m2_min": 80,
    "tiefwasser_m2_min": 0,
    "kletter_m2_min": 0,
    "extra_pro_tier_land_m2": 150,
    "extra_pro_tier_wasser_m2": 20
  }
}
```

### pairings.json

Definiert kompatible Paare per numerischer ID:

```json
{
  "species_id": 12,
  "bonus": [13, 15],
  "neutral": [14]
}
```

---

## ⚙️ Technologien

- **HTML5** für Struktur  
- **CSS3** für Layout & Theme  
- **ES-Module (Vanilla JS)** für Logik  
  - `data.js` → lädt JSON-Dateien  
  - `graph.js` → berechnet Beziehungen (Default-Deny-Regel)  
  - `enclosure.js` → summiert Gehegeflächen  
  - `app.js` → verbindet UI mit Logik

---

## 🧩 Kompatibilität

Läuft in allen modernen Browsern (Chrome, Edge, Firefox, Safari) – **ohne Server**.  
Falls dein Browser lokale `fetch()`-Aufrufe blockiert, kannst du:
- die Dateien auf einen Webspace legen, **oder**
- mit einem beliebigen statischen Server (z. B. VS Code Live Server) öffnen.  
  *(Das ist optional, kein Python nötig.)*
