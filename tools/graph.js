export function buildGraph(species, pairsById) {
  const N = new Map();
  const W = new Map();

  const addEdge = (a,b,w)=>{
    if(!N.has(a)) N.set(a,new Set());
    if(!N.has(b)) N.set(b,new Set());
    N.get(a).add(b); N.get(b).add(a);
    const key = a<b?`${a}|${b}`:`${b}|${a}`;
    W.set(key, Math.max(W.get(key)||0, w));
  };

  const isBonus = (a,b)=> (pairsById.get(a)?.bonus||[]).includes(b) || (pairsById.get(b)?.bonus||[]).includes(a);
  const isNeutral= (a,b)=> (pairsById.get(a)?.neutral||[]).includes(b) || (pairsById.get(b)?.neutral||[]).includes(a);

  const ids = species.map(s=>s.id);
  for(let i=0;i<ids.length;i++){
    for(let j=i+1;j<ids.length;j++){
      const a=ids[i],b=ids[j];
      if(isBonus(a,b)) addEdge(a,b,2);
      else if(isNeutral(a,b)) addEdge(a,b,1);
    }
  }
  return {N,W};
}

export function maxCliqueWithSeed({N,W}, seed){
  const neigh=v=>N.get(v)||new Set();
  let best=new Set([seed]), bestW=-1;

  const cliqueWeight=set=>{
    const a=[...set]; let w=0;
    for(let i=0;i<a.length;i++){
      for(let j=i+1;j<a.length;j++){
        const k=a[i]<a[j]?`${a[i]}|${a[j]}`:`${a[j]}|${a[i]}`;
        w+=(W.get(k)||0);
      }
    }
    return w;
  };

  function bronk(R,P,X){
    if(P.size===0&&X.size===0){
      const w=cliqueWeight(R);
      if(R.size>best.size||(R.size===best.size&&w>bestW)){best=new Set(R);bestW=w;}
      return;
    }
    const union=new Set([...P,...X]);
    const pivot=union.values().next().value;
    const cand=[...P].filter(v=>!neigh(pivot).has(v));
    for(const v of cand){
      const Nv=neigh(v);
      bronk(new Set([...R,v]), new Set([...P].filter(x=>Nv.has(x))), new Set([...X].filter(x=>Nv.has(x))));
      P.delete(v); X.add(v);
    }
  }
  bronk(new Set([seed]), new Set(neigh(seed)), new Set());
  return [...best];
}
