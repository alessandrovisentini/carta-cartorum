---
name: wiki-notes
description: Crea e aggiorna note wiki per la campagna Universe 2 basandosi sul contenuto della cartella Riepiloghi. Usa per gestire NPC, luoghi, oggetti, fazioni e creature della campagna TTRPG.
allowed-tools: Read, Write, Edit, Glob, Grep
argument-hint: "[scan|create|update|session] [tipo] [nome]"
---

# Wiki Notes

Note wiki brevi e facili da mantenere a mano. La Descrizione dice cosa sappiamo **adesso**, la Storia nelle Sessioni cosa è successo sessione per sessione. I dettagli completi stanno nei Riepiloghi.

## Comandi

- `/wiki-notes scan` - Elenca note da creare o aggiornare in base ai Riepiloghi
- `/wiki-notes create [tipo] [nome]` - Crea una nota
- `/wiki-notes update [nome]` - Aggiorna una nota con le novità dei Riepiloghi
- `/wiki-notes session [N]` - Aggiunge una sessione a Timeline e Presenze

## Percorsi

Tutto sta in `content/`.

- **Fonte (unica):** `Riepiloghi/**/*.md`. Le sottocartelle sono i diari dei personaggi (`Ignemir/`, `Zamoraz/`, ...). Diari diversi della stessa sessione sono tutti validi.
- **Note:** `NPC/`, `Personaggi/`, `Fazioni/`, `Creature/`, `Litorale/` (luoghi), `Oggetti/`, `Eventi/`, `Pantheon/`, `Il Sistema di Mondi/`
- **Timeline:** `Timeline/Timeline.md`
- **Presenze:** `Presenze.md`

Non creare nuove cartelle senza chiedere.

## Regole

- Usa solo i Riepiloghi. Niente informazioni inventate o dedotte.
- Italiano, frasi brevi e dirette. Niente riempitivi ("È importante notare che...", "In conclusione...").
- **Niente note a piè di pagina e niente sezione Fonti.** La sessione è già scritta nella Storia nelle Sessioni.
- Collega con `[[Nome Nota]]` o `[[Nome Nota|testo]]` solo note che esistono.
- Ometti le sezioni vuote.

## Formato Nota

```markdown
# [Nome]

|                   |                                   |
| ----------------- | --------------------------------- |
| Tipo              | [Categoria]                       |
| [Campo]           | [Valore]                          |
| Prima Apparizione | [[Timeline/Timeline\|Sessione XX]] |

## Descrizione

Chi o cosa è, e cosa sappiamo adesso. 3-6 righe.

## [Sezione specifica, se serve]

Es. Capacità, Origine, Relazioni.

## Storia nelle Sessioni

- **Sessione X**: Cosa succede, in una o due frasi.

## Note

- Appunti sparsi
```

## Aggiornare una Nota

1. Leggi la nota e i nuovi Riepiloghi che la citano.
2. Riscrivi la Descrizione con lo stato attuale (es. se un NPC muore, scrivilo lì e aggiorna `Status`).
3. Aggiungi un punto in Storia nelle Sessioni per ogni nuova sessione, in ordine.
4. Non togliere informazioni ancora valide.

## Nuova Sessione

### Timeline

Aggiungi in fondo a `Timeline/Timeline.md`. Se la sessione apre un nuovo blocco, metti prima `# Blocco N`.

```markdown
## Sessione XX - [Titolo breve]

**Data:** GG/MM/AAAA · **Riepiloghi:** [[Riepiloghi/Personaggio/Sessione XX|Personaggio]]

[2-3 frasi, terza persona, tempo presente, solo i fatti principali. Collega le note principali.]
```

Se ci sono più diari, separali con ` - `.

### Presenze

Aggiungi una riga alla tabella in `Presenze.md`:

```markdown
| XX | GG/MM/AAAA | Nome, Nome, Nome |
```

- È presente chi ha un diario per la sessione, chi è la guida, o chi agisce attivamente nei Riepiloghi.
- **Chiedi conferma all'utente** della lista prima di salvare.
- Nomi in ordine alfabetico.
