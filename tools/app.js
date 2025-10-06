import { buildGraph, maxCliqueWithSeed } from './graph.js';
import { sumEnclosure } from './enclosure.js';

export function mountApp(root, db){
  root.innerHTML=`
    <section class="card">
      <label>Starttier</label>
      <select id="seed">
        ${db.species.map(s=>`<option value="${s.id}">${s.name!=="???"?s.name:s.slug} (#${s.id})</option>`).join('')}
      </select>
      <button id="btnClique" class="primary">Grösste Gruppe</button>
      <pre id="outClique" class="mono"></pre>
      <hr/>
      <div id="counts"></div>
      <button id="btnEnc" class="primary">Gehege berechnen</button>
      <pre id="outEnc" class="mono"></pre>
    </section>`;

  const graph=buildGraph(db.species, db.pairsById);
  const outClique=root.querySelector('#outClique');
  const countsBox=root.querySelector('#counts');
  const outEnc=root.querySelector('#outEnc');

  root.querySelector('#btnClique').addEventListener('click',()=>{
    const seed=Number(root.querySelector('#seed').value);
    const clique=maxCliqueWithSeed(graph,seed);
    outClique.textContent='Grösste Gruppe: '+clique.map(id=>db.byId.get(id).name||id).join(', ');
    countsBox.innerHTML=clique.map(id=>{
      const s=db.byId.get(id);
      return `<div><label>${s.name!=="???"?s.name:s.slug} (#${id})</label>
              <input type="number" min="0" value="1" data-id="${id}"/></div>`;
    }).join('');
  });

  root.querySelector('#btnEnc').addEventListener('click',()=>{
    const inputs=[...root.querySelectorAll('#counts input[data-id]')];
    const groupCounts=inputs.map(inp=>({id:Number(inp.dataset.id),count:Number(inp.value||0)}));
    const res=sumEnclosure(groupCounts, db.species);
    const lines=[
      `Land:   ${res.land} m²`,
      `Wasser: ${res.wasser} m²`
    ];
    if(res.tief>0)lines.push(`Tiefwasser: ${res.tief} m²`);
    if(res.kletter>0)lines.push(`Kletter: ${res.kletter} m²`);
    if(res.unknown.length)lines.push(`Fehlende Basiswerte bei IDs: ${res.unknown.join(', ')}`);
    outEnc.textContent=lines.join('\\n');
  });
}
