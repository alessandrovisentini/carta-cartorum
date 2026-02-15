---
name: wiki-notes
description: Crea e aggiorna note wiki per la campagna Universe 2 basandosi sul contenuto della cartella Riepiloghi. Usa per gestire NPC, luoghi, oggetti, fazioni e creature della campagna TTRPG.
allowed-tools: Read, Write, Glob, Grep
argument-hint: "[scan|create|update] [tipo] [nome]"
---

# Wiki Notes - Gestione Note TTRPG

Questo skill crea e aggiorna note wiki per la campagna Universe 2 basandosi esclusivamente sul contenuto della cartella Riepiloghi.

## Invocazione

Usa `/wiki-notes` seguito dal tipo di operazione:
- `/wiki-notes scan` - Analizza i Diari e suggerisce note da creare/aggiornare
- `/wiki-notes create [tipo] [nome]` - Crea una nuova nota
- `/wiki-notes update [nome]` - Aggiorna una nota esistente con nuove informazioni dai Diari

## Percorsi

- **Base campagna:** `Campagne/Universe 2 (WM)/Current Era/`
- **Fonte dati (UNICA):** `Riepiloghi/**/*.md` (tutti i file `.md` in tutte le sottocartelle)
  - Le sottocartelle sono organizzate per personaggio/prospettiva (es. `Ignemir/`, `Opalix/`, `Zamoraz/`)
  - Ogni sottocartella contiene file `Sessione X.md` dalla prospettiva di quel personaggio
  - La stessa sessione può avere resoconti diversi in sottocartelle diverse: sono TUTTI fonti valide
  - File nella root di `Riepiloghi/` (es. `Introduzione.md`) sono anch'essi fonti valide
- **Destinazioni note:**
  - `NPC/` - Personaggi non giocanti
  - `Personaggi/` - Personaggi giocanti
  - `Fazioni/` - Organizzazioni e gruppi
  - `Creature/` - Mostri e creature
  - `Litorale/` - Luoghi e geografia
  - `Oggetti/` - Oggetti e artefatti
  - `Eventi/` - Eventi significativi
  - `Pantheon/` - Divinità e religioni
- **Nuove Destinazioni**
  - Puoi creare nuove destinazioni se inesistenti

## Regole Fondamentali

### Fonte di Verità

**CRITICO:** Usa SOLO i file `.md` nella cartella `Riepiloghi/` e nelle sue sottocartelle come fonte di informazioni. NON usare:
- Note create precedentemente da questo skill
- Altre cartelle o file della wiki
- Recap o riassunti
- Informazioni inventate o dedotte

Se un'informazione non è nei Riepiloghi, non includerla.

### Stile di Scrittura

1. **Scrivi in italiano** - Tutto il contenuto deve essere in italiano
2. **Evita linguaggio artificiale** - Non usare:
   - "È importante notare che..."
   - "Come menzionato precedentemente..."
   - "In conclusione..."
   - "Da notare che..."
   - Frasi ridondanti o di riempimento
3. **Sii conciso** - Preferisci frasi brevi e dirette
4. **Niente ripetizioni** - Non ripetere lo stesso concetto in sezioni diverse
5. **Solo contenuto utile** - Se non c'è abbastanza materiale per una sezione, omettila

### Formato Note

Ogni nota deve seguire questo schema (ometti sezioni vuote):

```markdown
# [Nome]

|                   |                      |
| ----------------- | -------------------- |
| Tipo              | [Categoria]          |
| [Campo specifico] | [Valore]             |
| Prima Apparizione | [[Sessione XX]]      |

## Descrizione

[Descrizione con note a piè di pagina per ogni informazione][^1]

## Storia nelle Sessioni

- **Sessione X**: [Cosa accade, in modo sintetico][^2]

## Note

[Solo se ci sono dettagli aggiuntivi rilevanti]

---

## Fonti

[^1]: [[Sottocartella/Sessione X]]
[^2]: [[Sottocartella/Sessione Y]]
```

### Link Obsidian

- Usa `[[Nome Nota]]` per collegamenti interni
- Usa `[[Nome Nota|Testo Alternativo]]` per alias
- Collega sempre:
  - Personaggi menzionati
  - Luoghi visitati
  - Oggetti importanti
  - Sessioni di riferimento

### Note a Piè di Pagina (Obbligatorie)

Usa il sistema di footnote di Obsidian/Markdown in stile Wikipedia:

1. **Nel testo**: Inserisci `[^N]` dopo ogni informazione citata
2. **In fondo**: Elenca ogni fonte con `[^N]: [[Sottocartella/Sessione X]]`

**Sintassi:**
```markdown
Simon può trasformarsi in mannaro[^1] e ha stretto un'alleanza con il gruppo[^2].

---

## Fonti

[^1]: [[Ignemir/Sessione 5]]
[^2]: [[Zamoraz/Sessione 5]]
```

**Regole:**
- Ogni affermazione significativa deve avere la sua nota
- Indica sempre la sottocartella e la sessione specifica (es. `[[Ignemir/Sessione 5]]`, `[[Opalix/Sessione 17]]`)
- Usa numeri progressivi `[^1]`, `[^2]`, `[^3]`...
- Se più informazioni vengono dallo stesso file, possono condividere la nota
- Se la stessa informazione appare in più prospettive, cita la fonte più dettagliata

## Procedura di Lavoro

### Per Scansione (`/wiki-notes scan`)

1. Leggi tutti i file `.md` in `Riepiloghi/` e nelle sue sottocartelle (es. `Riepiloghi/Ignemir/*.md`, `Riepiloghi/Opalix/*.md`, `Riepiloghi/Zamoraz/*.md`)
2. Estrai entità menzionate (NPC, luoghi, oggetti, fazioni, creature) da tutte le prospettive
3. Confronta con note esistenti nelle cartelle di destinazione
4. Elenca:
   - Note mancanti da creare
   - Note esistenti da aggiornare con nuove informazioni

### Per Creazione (`/wiki-notes create [tipo] [nome]`)

1. Cerca il nome in tutti i file di tutte le sottocartelle di `Riepiloghi/`
2. Raccogli TUTTE le menzioni e informazioni da ogni prospettiva
3. Annota la sottocartella e sessione esatta di ogni informazione
4. Crea la nota nel formato corretto nella cartella appropriata
5. Inserisci note a piè di pagina `[^N]` per ogni informazione
6. Compila la sezione Fonti con sottocartella e sessione per ogni nota (es. `[[Ignemir/Sessione 5]]`)

### Per Aggiornamento (`/wiki-notes update [nome]`)

1. Leggi la nota esistente
2. Cerca nuove menzioni in tutti i file di tutte le sottocartelle non ancora incluse
3. Annota la sottocartella e sessione esatta di ogni nuova informazione
4. Aggiorna la sezione "Storia nelle Sessioni" con nuove note `[^N]`
5. Aggiungi le nuove fonti alla sezione Fonti (continua la numerazione)
6. NON modificare informazioni esistenti a meno che siano errate

## Esempi di Formato

### NPC

```markdown
# Simon Hatata

|                   |                            |
| ----------------- | -------------------------- |
| Specie            | Umano / Mannaro            |
| Affiliazione      | Evaso della [[Maledizione di Mefisto]] |
| Prima Apparizione | [[Sessione 05]]            |

## Descrizione

Gemello eterozigote, mezza età, capelli corti a caschetto[^1]. Ha due tatuaggi dietro le orecchie: piccole onde che si infrangono contro rocce[^2]. Può trasformarsi in una creatura mannara con peluria, zanne e artigli[^3].

## Storia nelle Sessioni

- **Sessione 5**: Incontrato alla fontana nella foresta mentre faceva il bagno in forma mannara[^3]. Dopo un combattimento in cui uccide Kesi e Zevon[^4], stringe un'alleanza con il gruppo[^5]. Consegna una carta per comunicare e una chiave con labirinto[^6].

---

## Fonti

[^1]: [[Ignemir/Sessione 5]]
[^2]: [[Ignemir/Sessione 5]]
[^3]: [[Ignemir/Sessione 5]]
[^4]: [[Zamoraz/Sessione 5]]
[^5]: [[Zamoraz/Sessione 5]]
[^6]: [[Ignemir/Sessione 5]]
```

### Oggetto

```markdown
# Ancora Spaziale

|                   |                      |
| ----------------- | -------------------- |
| Tipo              | Artefatto magico     |
| Creatrice         | [[Awen Seife]]       |
| Prima Apparizione | [[Sessione 10]]      |

## Descrizione

Amuleto che trasporta suoni, odori, calore e oggetti dal luogo in cui è posizionato al villaggio[^1]. Frase di attivazione: "Merla Vulpercarico"[^1].

## Funzionamento

- Oggetti inanimati: 90% probabilità (100% dopo il patto)[^1][^2]
- Creature: 25% probabilità (100% dopo il patto)[^1][^2]

## Storia nelle Sessioni

- **Sessione 10**: Awen consegna l'ancora al gruppo[^1]. I [[Geni del Fuoco]] la potenziano in cambio di un patto[^2].

---

## Fonti

[^1]: [[Ignemir/Sessione 10]]
[^2]: [[Ignemir/Sessione 10]]
```

### Fazione

```markdown
# Geni del Fuoco

|                   |                      |
| ----------------- | -------------------- |
| Tipo              | Creature elementali  |
| Membri noti       | [[Argan]], [[Asbad]] |
| Sede              | [[Palazzo dei Genii]]|
| Prima Menzione    | [[Sessione 10]]      |

## Descrizione

Creature ibride della Corte Elementale, collegate con angeli e demoni[^1]. Il loro potere sui patti è superiore a quello di altri Geni[^1].

## Il Patto

Vogliono che il gruppo attivi l'[[Ancora Spaziale]] vicino al Toro imprigionato dai [[Clan Oven|giganti]][^2].

---

## Fonti

[^1]: [[Ignemir/Sessione 10]]
[^2]: [[Ignemir/Sessione 10]]
```

## Checklist Qualità

Prima di salvare una nota, verifica:

- [ ] Tutte le informazioni provengono dai Diari
- [ ] Ogni affermazione ha la sua nota a piè di pagina `[^N]`
- [ ] Ogni nota indica sottocartella e sessione specifica (es. `[[Ignemir/Sessione 5]]`)
- [ ] Nessuna frase di riempimento o ridondante
- [ ] Link Obsidian corretti
- [ ] Sezione Fonti presente con tutte le note
- [ ] Italiano corretto
- [ ] Formato tabella metadata corretto
- [ ] Sezioni vuote rimosse
