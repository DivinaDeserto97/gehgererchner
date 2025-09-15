## 2) `begriffe.md`

> **Bitte exakt diese Begriffe** verwenden. Gross-/Kleinschreibung beachten.

### Pflichtfelder pro Tier

* `id` – kurze, eindeutige ID in **kleinbuchstaben** (a–z, `_` erlaubt), z. B. `capybara`, `blauzungenskink`.
* `name` – Klarname, z. B. `Capybara`.
* `besucher` – **nur diese Werte sind gültig**:

  * `geschlossen` – normales, nicht begehbares Gehege / Vivarium
  * `begehbar` – begehbares Gehege (Walkthrough), **ohne** Interaktionspunkte
  * `begehbar+interaktion` – begehbar **mit** Interaktion (Streicheln/Füttern, nicht unterschieden)
* `kontinente` – Liste der Kontinente (deutsch):

  * `Afrika`, `Asien`, `Europa`, `Nordamerika`, `Südamerika`, `Ozeanien`
* `biome` – Liste der Biome (deutsch, klein):

  * `tropisch`, `gemässigt`, `wüste`, `taiga`, `tundra`, `grasland`, `feuchtgebiet`
* `interspezifisch_ids` – **BONUS**-Kombis: Array von **Tier‑IDs** (z. B. `["capybara", "llama"]`).
* `neutral_ids` – **NEUTRAL**-Kombis: Array von **Tier‑IDs**.

### Grundregel (Default‑Deny)

* Ein Tierpaar ist **nur erlaubt**, wenn es **in mindestens einer** der Listen `interspezifisch_ids` (BONUS) oder `neutral_ids` (NEUTRAL) vorkommt (Richtung egal).
* Steht ein Paar **in keiner** der Listen → **NICHT erlaubt** (Beute, anderes Biom, keine natürliche Begegnung, etc.).

### Tipps

* **Symmetrie**: Trage Paare **beidseitig** ein (A↔B). Das Tool findet Asymmetrien und kann sie automatisch ergänzen.
* **Vivarium klassisch**: Lass `interspezifisch_ids`/`neutral_ids` leer → bleibt automatisch allein.
* **IDs statt Nummern** verwenden (lesbarer, stabiler).
