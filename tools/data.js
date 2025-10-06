export async function loadDB(base = './db/species/') {
  // Lädt die kombinierte species.json (inkl. gehege) + pairings.json
  const [species, pairings] = await Promise.all([
    fetch(base + 'species.json').then(r => r.json()),
    fetch(base + 'pairings.json').then(r => r.json())
  ]);

  const byId = new Map(species.map(s => [s.id, s]));
  const pairsById = new Map(pairings.map(p => [p.species_id, p]));

  return { species, pairings, byId, pairsById };
}
