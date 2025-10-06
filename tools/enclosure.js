export function sumEnclosure(groupCounts, species){
  let land=0, wasser=0, tief=0, kletter=0;
  const unknown=[];
  const byId=new Map(species.map(s=>[s.id,s]));

  for(const {id,count} of groupCounts){
    const s=byId.get(id);
    const g=s?.gehege;
    if(!g){ unknown.push(id); continue; }
    const c=Math.max(0,Math.floor(Number(count)||0));
    if(c<=0) continue;
    land   += (g.land_m2_min||0)+(Math.max(0,c-1)*(g.extra_pro_tier_land_m2||0));
    wasser += (g.wasser_m2_min||0)+(Math.max(0,c-1)*(g.extra_pro_tier_wasser_m2||0));
    tief   += g.tiefwasser_m2_min||0;
    kletter+= g.kletter_m2_min||0;
  }
  return {land, wasser, tief, kletter, unknown};
}
