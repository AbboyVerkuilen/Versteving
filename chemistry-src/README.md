# The Invisible World · Chemistry 101–110

Ten standalone webpages that teach chemistry as a series of detective stories. Each course is a single self-contained file, `chemistry-<id>/index.html`, that opens in any modern browser. There is no server and no build step for readers; only the web fonts load from Google Fonts. Every page links to the others through the **Chem 1xx · courses** menu in its top bar.

| Course | Title | Topic | The culprit |
|---|---|---|---|
| 101 | The Invisible World | Atoms, bonds & reactions | The electron |
| 102 | The Counting Problem | The mole, molar mass, stoichiometry, concentration, gas volumes | The mole |
| 103 | Ghost Light | Photons, spectra & the Bohr model, orbitals, periodic trends, radioactivity | The quantum |
| 104 | The Shape of Things | Lewis structures, VSEPR, polarity, intermolecular forces, giant lattices | Molecular shape |
| 105 | Under Pressure | Gas pressure, Boyle's & Charles's laws, phase diagrams, colligative properties | PV = nRT |
| 106 | The Energy Ledger | Heat capacity, bond enthalpies, calorimetry, Hess's law, entropy & Gibbs | Free energy |
| 107 | The Balance | Rates, activation energy, enzymes, dynamic equilibrium, Le Chatelier & Haber | Dynamic equilibrium |
| 108 | Proton Wars | Strong & weak acids, pH, titration, buffers, ocean acidification | The proton |
| 109 | The Electron Market | Redox, reactivity series, galvanic cells, electrolysis, Li-ion batteries | The electron, on the move |
| 110 | The Carbon Code | Alkanes, isomers & chirality, functional groups, polymers, DNA | Carbon's four hands |

Every course follows the same structure:

- **A mystery**: a prologue poses an everyday puzzle, five case files each collect one clue, and a finale reveals the "culprit".
- **Characters**: elements and scientists appear as characters (Hal, Ola, Cass, Sid, Clo, the Ghost, plus new faces in each course).
- **Live labs**: each case has an interactive simulation drawn on canvas or SVG, such as particle boxes, 3D molecules, titration curves and energy diagrams.
- **Three lenses**: every case shows its idea at the macro, micro and symbolic level, plus an "everyday miracle".
- **Evidence-based practice**:
  - **Pre-testing:** each mystery asks for a hunch before the lesson.
  - **Retrieval quizzes:** answering them correctly unlocks the clue.
  - **Cold-case reviews:** a question from an earlier case at the start of each new one (spaced recall).
  - **Feynman prompts:** write an explanation in your own words, then compare it with model notes.
  - **Leitner flashcards:** spaced repetition, with cards that return later the better you know them.
  - **Final Interrogation:** questions mixed across all topics, with a confidence rating to check how well you know what you know.

Progress, notes and flashcard boxes are saved in the browser's `localStorage`, separately for each course and on that device only.

## Editing and rebuilding

The published HTML files are generated from the sources in this folder:

- `101/`: Chemistry 101, written by hand (its parts are concatenated in order).
- `head.html` + `core.js`: the shared design and engine for 102–110. This covers the page builder, avatars, quizzes, flashcards, interrogation, the particle-box physics, the plotter and the 3D molecule viewer.
- `courses/<id>.js`: one file per course, containing its story, data and five custom labs.

Rebuild after editing (Node is optional and is only used for a syntax check):

```sh
python3 chemistry-src/build.py .            # all courses
python3 chemistry-src/build.py . 104 107    # just some
```
