(() => {
const SK = window.BB_SKILLS, RU = window.BB_RULES, TB = window.BB_TABLES, MO = window.BB_MODS, TE = window.BB_TEAMS, TR = window.BB_TEAM_RULES, ST = window.BB_STARS || [];
const CATS = {A:"Agilité",F:"Force",G:"Générale",M:"Mutation",P:"Passe",S:"Scélérate",T:"Trait"};
const $ = s => document.querySelector(s);
const norm = s => s.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();
const esc = s => s.replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const strip = h => h.replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();

SK.forEach(s => { s.id = "s-" + norm(s.n).replace(/[^a-z0-9]+/g,"-"); s.kind = "skill"; });
RU.forEach(r => { r.kind = "rule"; r.id = "r-" + r.id; });
const TEMO = window.BB_TABLE_EMOJI || {};
TB.forEach(t => { const m = TEMO[t.id] || {}; t.e = m.e || "🎲"; t.re = m.r || {}; t.kind = "table"; t.id = "t-" + t.id; });
const slug = s => norm(s).replace(/[^a-z0-9]+/g,"-");
TE.forEach(t => { t.kind = "team"; t.id = "e-" + slug(t.n); });
Object.entries(TR).forEach(([k,v]) => { const r = {kind:"trule", id:"x-"+slug(k), t:k, d:v}; TR[k] = r; });
ST.forEach(s => { s.kind = "star"; s.id = "p-" + slug(s.n); s.lg = s.lg || []; s.te = s.te || []; s.ex = s.ex || []; });
const BY = {}; [...SK,...RU,...TB,...TE,...Object.values(TR),...ST].forEach(x => BY[x.id] = x);
// Associe "Solitaire (4+)" → Solitaire (X+), "Haine (Troll)" → Haine (X), etc.
const skKey = s => norm(s.replace(/\(.*?\)/g,"")).replace(/[^a-z]/g,"");
const SKMAP = {}; SK.forEach(s => SKMAP[skKey(s.n)] = s.id);
const trKey = s => { if (/^Favoris de/.test(s)) return "x-favoris-de"; const k = Object.keys(TR).find(k => norm(s).startsWith(norm(k))); return k ? TR[k].id : null; };


// ---------- Rendu d'une ligne ----------
const dot = s => `<span class="dot" style="background:var(--c${s.cat})">${s.cat==="T"?"T":s.cat}</span>`;
function skillTags(s){
  let t = `<span class="tag">${s.act?"Actif":"Passif"}</span>`;
  if (s.obl) t += `<span class="tag ob" title="Obligatoire">Oblig.</span>`;
  if (s.elite) t += `<span class="tag el" title="Élite">Élite</span>`;
  return t;
}
function rowSkill(s, hl){
  const sub = hl ? highlight(snippet(s.d, hl), hl) : esc(CATS[s.cat]) + (s.cat==="T"?"":" · compétence");
  return `<button class="item" data-id="${s.id}">${dot(s)}<span class="main"><span class="name">${hl?highlight(esc(s.n),hl):esc(s.n)}</span><span class="sub">${sub}</span></span><span class="tags">${skillTags(s)}</span></button>`;
}
function rowRule(r, hl){
  const txt = strip(r.b);
  const sub = hl ? highlight(snippet(txt, hl), hl) : "";
  const icon = r.kind==="table" ? `<span class="dot emo">${r.e}</span>` : "";
  return `<button class="item" data-id="${r.id}">${icon}<span class="main"><span class="name">${hl?highlight(esc(r.t),hl):esc(r.t)}</span>${sub?`<span class="sub">${sub}</span>`:""}</span></button>`;
}
function snippet(text, q){
  const i = norm(text).indexOf(norm(q).split(" ")[0]);
  if (i < 0) return esc(text.slice(0,90));
  const a = Math.max(0, i-30);
  return (a?"…":"") + esc(text.slice(a, a+100));
}
function highlight(html, q){
  const words = norm(q).split(/\s+/).filter(w => w.length > 1);
  if (!words.length) return html;
  const n = norm(html);
  const marks = [];
  words.forEach(w => { let i = -1; while ((i = n.indexOf(w, i+1)) >= 0) marks.push([i, i+w.length]); });
  marks.sort((a,b)=>a[0]-b[0]);
  let out = "", last = 0;
  marks.forEach(([a,b]) => { if (a < last) return; out += html.slice(last,a) + "<mark>" + html.slice(a,b) + "</mark>"; last = b; });
  return out + html.slice(last);
}

// ---------- Vues ----------
let cat = "all", act = "all";
function renderChips(){
  const list = [["all","Tout"],...Object.entries(CATS)];
  $("#chips").innerHTML = list.map(([k,v]) => `<button class="chip${cat===k?" on":""}" data-cat="${k}">${k!=="all"?`<i style="background:var(--c${k})"></i>`:""}${v}${k==="T"?"s":""}</button>`).join("");
  $("#achips").innerHTML = [["all","Actifs et passifs"],["a","Actifs"],["p","Passifs"]].map(([k,v]) => `<button class="chip${act===k?" on":""}" data-act="${k}">${v}</button>`).join("");
}
function renderSkills(){
  const list = SK.filter(s => (cat==="all" || s.cat===cat) && (act==="all" || s.act===(act==="a"))).sort((a,b)=>a.n.localeCompare(b.n,"fr"));
  const fem = cat!=="all" && cat!=="T";
  const adj = act==="all" ? "" : " " + (act==="a" ? (fem ? "actives" : "actifs") : (fem ? "passives" : "passifs"));
  let lbl = (cat==="T"?"traits":cat==="all"?"compétences et traits":"compétences") + adj;
  if (list.length < 2) lbl = lbl.replace(/s\b/g, "");
  let html = `<div class="count">${list.length} ${lbl}${act!=="all" ? ` · <a class="x" data-act="all">tout afficher</a>` : ""}</div>`, L = "";
  list.forEach(s => { const l = norm(s.n[0]).toUpperCase(); if (l !== L) { L = l; html += `<div class="letter">${l}</div>`; } html += rowSkill(s); });
  $("#v-skills").innerHTML = html;
}
// Émoji affiché devant chaque catégorie de l'onglet Règles
const RULE_ICONS = {"Le Tour":"⏱️","Mouvement":"🏃","Blocage":"💥","Blessures":"🩹","Agression":"🥾","Ballon":"🏈","Match":"🏟️","Ligue":"🏆"};
function renderRules(){
  // Catégories repliées par défaut : toucher un titre déplie son contenu
  const groups = [];
  RU.forEach(r => { let g = groups.find(x => x.g === r.g); if (!g) groups.push(g = {g: r.g, l: []}); g.l.push(r); });
  $("#v-rules").innerHTML = groups.map(({g, l}) => `<details class="rgrp"><summary>${RULE_ICONS[g] ? `<b class="ico">${RULE_ICONS[g]}</b>` : ""}<span>${esc(g)}</span><i>${l.length}</i></summary><div class="rgl">${l.map(r => rowRule(r)).join("")}</div></details>`).join("");
}
// Bloc repliable (fermé par défaut) avec, à droite, l'indication des dés
const fold = (title, dice, inner) => `<details class="rgrp tgrp"><summary><span>${title}</span>${dice ? `<b class="dice">${dice}</b>` : ""}</summary><div class="rgl">${inner}</div></details>`;
function tableCard(t){
  return `<div class="card"><h3><span>${t.e} ${esc(t.t)}</span> <span class="dice">${t.dice}</span></h3>${tableRows(t)}</div>`;
}
function tableRows(t){
  return `${t.rows.map(r=>`<div class="row"><span class="r">${r[0]}</span><div><b>${t.re[r[1]] ? t.re[r[1]] + " " : ""}${esc(r[1])}</b><span>${esc(r[2])}</span></div></div>`).join("")}`;
}
// ---------- Passes : diagramme des portées ----------
const PASSCOL = {R:"#5fbf7a", C:"#e3c84a", L:"#e8893a", B:"#d4232f"};
function passZone(x, y){
  if (!x && !y) return "P";
  const d = Math.hypot(x, y);
  if (d < 3.5) return "R"; if (d < 7) return "C"; if (d < 10.25) return "L";
  if (d < 12.9 || (Math.max(x,y) === 13 && Math.min(x,y) <= 2)) return "B";
  return "";
}
function passChart(){
  const s = 22, o = 20, n = 14, W = o + n*s;
  let g = "";
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    const z = passZone(x, y), px = o + x*s, py = (n-1-y)*s;
    const fill = z === "P" ? "#f1ebdd" : z ? PASSCOL[z] : "rgba(255,255,255,.04)";
    g += `<rect x="${px+1}" y="${py+1}" width="${s-2}" height="${s-2}" rx="3" fill="${fill}"${z && z!=="P" ? ' fill-opacity=".9"' : ""}/>`;
    if (z === "P") g += `<text x="${px+s/2}" y="${py+s/2+4}" text-anchor="middle" font-size="12">🏈</text>`;
  }
  for (let i = 0; i < n; i++) {
    g += `<text x="${o+i*s+s/2}" y="${n*s+14}" text-anchor="middle" class="ax">${i}</text>`;
    g += `<text x="${o-6}" y="${(n-1-i)*s+s/2+4}" text-anchor="end" class="ax">${i}</text>`;
  }
  return `<svg class="pchart" viewBox="0 0 ${W} ${n*s+20}" role="img" aria-label="Diagramme des portées de passe">${g}</svg>`;
}
function passCard(){
  const leg = [["R","Rapide","0"],["C","Courte","−1"],["L","Longue","−2"],["B","Longue Bombe","−3"]]
    .map(([k,t,m]) => `<div class="pz"><i style="background:${PASSCOL[k]}"></i><b>${t}</b><span>${m}</span></div>`).join("");
  return `<div class="card pass">
    <h3><span>🎯 Portées de passe</span> <span class="dice">CP</span></h3>
    <div class="pleg">${leg}</div>
    ${passChart()}
    <p class="pnote">🏈 = le passeur. Cases d'écart vers la cible, dans n'importe quelle direction (le diagramme se retourne). Case à cheval sur deux zones : on prend la plus lointaine.</p>
    <div class="m"><b>➖ Par adversaire qui Marque le passeur</b><span>−1</span></div>
    <div class="m"><b>☀️ Très ensoleillé</b><span>−1</span></div>
    <div class="m"><b>❄️ Blizzard</b><span>Rapide ou Courte seulement</span></div>
    <div class="m"><b>🚀 Lancer de coéquipier</b><span>Rapide 0 · Courte −1 seulement</span></div>
    <div class="sub3">Résultat du test</div>
    <div class="m"><b>✅ Précise</b><span>Réussi ou 6 naturel : arrive sur la cible</span></div>
    <div class="m"><b>↗️ Imprécise</b><span>Raté : Valdingue (3) depuis la cible</span></div>
    <div class="m"><b>💥 Maladresse</b><span>1 (modifié ou naturel) : Rebond depuis le passeur + Turnover</span></div>
    <div class="sub3">Interception & réception (AG)</div>
    <div class="m"><b>🛑 Intercepter</b><span>Précise −3 · Imprécise −2 · −1 / Marqueur</span></div>
    <div class="m"><b>🙌 Réceptionner</b><span>−1 / Marqueur · Rebond −1 · Renvoi −1</span></div>
  </div>`;
}
function renderTables(){
  let html = fold("🎲 Antisèche des jets", "", `<div class="card mods">${MO.map(m=>`<div class="m"><b>${m.e ? m.e + " " : ""}${esc(m.t)}</b><span>${esc(m.v)}</span></div>`).join("")}</div>`);
  html += TB.map(t => fold(`${t.e} ${esc(t.t)}`, t.dice, `<div class="card">${tableRows(t)}</div>`)).join("");
  html += fold("🎯 Portées de passe", "CP", passCard().replace(/\s*<h3>.*?<\/h3>/, ""));
  $("#v-tables").innerHTML = html;
  document.querySelectorAll("#v-tables .card").forEach(c => linkDom(c));
}

// ---------- Équipes ----------
const fmtK = k => k >= 1000 ? (k/1000).toLocaleString("fr-FR") + " M" : k + " k";
function rowTeam(t, sub){
  const emo = (window.BB_TEAM_EMOJI||{})[t.n] || "🏈";
  return `<button class="item" data-id="${t.id}"><span class="dot emo">${emo}</span><span class="main"><span class="name">${esc(t.n)}</span>${sub?`<span class="sub">${sub}</span>`:""}</span></button>`;
}
let teamSeg = "teams", starLg = "all", starTeam = "all", starSort = "n", starDir = 1;
function renderTeams(){
  const seg = `<div class="seg"><button data-seg="teams"${teamSeg==="teams"?' class="on"':""}>Équipes</button><button data-seg="stars"${teamSeg==="stars"?' class="on"':""}>Star Players</button></div>`;
  let html;
  if (teamSeg === "teams") html = `<div class="count">${TE.length} équipes · touchez pour voir les joueurs</div>` + TE.map(t => rowTeam(t)).join("");
  else if (!ST.length) html = `<div class="empty">Les Star Players arrivent bientôt.</div>`;
  else {
    const all = [...new Set(TE.flatMap(teamLeagues))].sort((a,b)=>a.localeCompare(b,"fr"));
    const team = TE.find(t => t.n === starTeam);
    const list = ST.filter(s => (!team || starPlaysFor(s, team) !== false)).filter(s => starLg==="all" || (s.lg.includes("Toutes") ? !s.ex.includes(starLg) : s.lg.includes(starLg) || (starLg==="Clash du Chaos" && s.te.some(x=>/Khorne|Nurgle/.test(x))) || (starLg==="Bagarre des Terres Arides" && s.te.includes("Favoris de Hashut")))).sort((a,b)=>starDir*(starSort==="c" ? (a.c-b.c || a.n.localeCompare(b.n,"fr")) : a.n.localeCompare(b.n,"fr")));
    html = `<details class="card sprules"><summary>ℹ️ Règles d'embauche</summary>
      <p>Un Star Player ne joue que pour une équipe de l'une des ligues de sa ligne « Joue pour ». S'il demande une règle « Favoris de… », l'équipe doit avoir cette règle (et ce dieu précis).</p>
      <p><b>En Ligue :</b> il s'embauche comme Coup de Pouce (p. 142). <b>Jeu Égal / Hors-concours :</b> sur le budget de sélection de l'équipe, avec des Points de Compétence (p. 112).</p>
      <p>Les paires (Grak & Crumbleberry, Dribl & Drull, jumeaux Swift) s'embauchent ensemble, pour le prix indiqué.</p>
      <div class="src">Résumé · livre de règles p. 194</div></details>
      <p class="flbl">Ligue</p><div class="chips in">${[["all","Toutes"],...all.map(l=>[l,l])].map(([k,v]) => `<button class="chip${starLg===k?" on":""}" data-slg="${esc(k)}">${esc(v)}</button>`).join("")}</div>
      <p class="flbl">Équipe</p><div class="chips in">${[["all","Toutes"],...TE.map(t=>[t.n,((window.BB_TEAM_EMOJI||{})[t.n]?(window.BB_TEAM_EMOJI||{})[t.n]+" ":"")+t.n])].map(([k,v]) => `<button class="chip${starTeam===k?" on":""}" data-steam="${esc(k)}">${esc(v)}</button>`).join("")}</div>
      <p class="flbl">Trier</p><div class="chips in"><button class="chip${starSort==="n"?" on":""}" data-ssort="n">Nom ${starSort==="n" && starDir<0 ? "Z→A" : "A→Z"}</button><button class="chip${starSort==="c"?" on":""}" data-ssort="c">Prix ${starSort==="c" && starDir<0 ? "décroissant ↓" : "croissant ↑"}</button></div>
      <div class="count">${list.length} Star Player${list.length>1?"s":""}${[starLg,starTeam].filter(x=>x!=="all").map(x=>" · "+esc(x)).join("")}${(starLg+starTeam)!=="allall" ? ` · <a class="x" data-sreset="1">tout afficher</a>` : ""}</div>` + (list.length ? list.map(s => team ? rowStar(s, starPlaysFor(s, team) ? esc(starPlaysFor(s, team)) : undefined) : rowStar(s)).join("") : `<div class="empty">Aucun Star Player avec ces filtres.</div>`);
  }
  $("#v-teams").innerHTML = seg + html;
  // garde la puce sélectionnée visible dans chaque rangée de filtres
  document.querySelectorAll("#v-teams .chips").forEach(row => { const on = row.querySelector(".chip.on"); if (on) row.scrollLeft = on.offsetLeft - row.offsetLeft - 16; });
}
// ---------- Star Players ----------
const teamLeagues = t => t.lg.split(/\s+ou\s+/);
// Renvoie false si le Star Player ne peut pas jouer pour l'équipe, "" s'il peut, ou une condition ("si …")
function starPlaysFor(s, t){
  const lgs = teamLeagues(t);
  if (s.lg.includes("Toutes")) return lgs.every(l => s.ex.includes(l)) ? false : (lgs.some(l => s.ex.includes(l)) ? "sauf en " + s.ex.join(", ") : "");
  const conds = [];
  if (lgs.some(l => s.lg.includes(l))) conds.push(lgs.every(l => s.lg.includes(l)) ? "" : "si " + lgs.filter(l => s.lg.includes(l)).join(" ou "));
  for (const req of s.te) {
    const god = norm(req.replace(/^Favoris de\s*/,""));
    const r = t.sr.find(x => norm(x).startsWith("favoris de") && (norm(x).includes(god) || (norm(x).includes("au choix") && god !== "hashut")));
    if (r) conds.push(norm(r) === norm(req) ? "" : "si " + req);
  }
  if (!conds.length) return false;
  return conds.includes("") ? "" : conds.join(" ou ").replace(/ ou si /g, " ou ");
}
const starWho = s => s.lg.includes("Toutes") ? "Toute équipe" + (s.ex.length ? " sauf " + s.ex.join(", ") : "") : [...s.lg, ...s.te].join(" · ");
const starCost = s => s.pair ? `${fmtK(s.c)} les deux` : fmtK(s.c);
function rowStar(s, sub){
  return `<button class="item" data-id="${s.id}"><span class="dot emo">⭐</span><span class="main"><span class="name">${esc(s.n)}</span><span class="sub">${sub || esc(starWho(s))}</span></span><span class="tags"><span class="tag">${starCost(s)}</span></span></button>`;
}
function starBody(s){
  return `<div class="pl"><div class="st"><div><small>M</small>${s.M}</div><div><small>F</small>${s.F}</div><div><small>AG</small>${s.AG}</div><div><small>CP</small>${s.CP}</div><div><small>AR</small>${s.AR}</div></div>
  <div class="sks">${skillChips(s.sk)}</div></div>
  ${s.pair ? `<p class="note">👥 S'embauche obligatoirement avec <a class="x" data-id="p-${slug(s.pair)}">${esc(s.pair)}</a> : ${s.c} 000 po pour les deux.</p>` : ""}
  ${s.nt ? `<p class="note">⚠️ ${esc(s.nt)}</p>` : ""}
  ${s.sr ? `<p class="lbl">⭐ ${esc(s.sr.t)}</p><p>${linkify(s.sr.d)}</p>` : ""}
  <p class="lbl">Joue pour</p><p>${esc(starWho(s))}</p>
  <p class="lbl">Mots-clés</p><p>${esc(s.kw)}</p>
  <div class="src">${s.src==="pdf" ? "Résumé · PDF Star Players 3e Saison" : "Résumé · livre de règles p. " + s.p}${s.faq ? " · mis à jour FAQ mai 2026" : ""}</div>`;
}
function skillChips(str){
  if (str === "—") return `<span class="none">Aucune</span>`;
  const one = s => { const id = SKMAP[skKey(s)]; return id ? `<a class="sk" data-id="${id}">${esc(s)}</a>` : `<span class="sk off">${esc(s)}</span>`; };
  return str.split(/,\s*/).map(s => s.includes(" ou ") ? `<span class="skor">${s.split(" ou ").map(one).join("<i>ou</i>")}</span>` : one(s)).join("");
}
function playerCard(p){
  const [q,n,kw,cost,M,F,AG,CP,AR,sk,pr,se] = p;
  return `<div class="pl"><div class="plh"><span class="q">${q}</span><span class="pn">${esc(n)}</span><span class="pc">${cost} k</span></div>
  <div class="kw">${esc(kw)}</div>
  <div class="st"><div><small>M</small>${M}</div><div><small>F</small>${F}</div><div><small>AG</small>${AG}</div><div><small>CP</small>${CP}</div><div><small>AR</small>${AR}</div></div>
  <div class="sks">${skillChips(sk)}</div>
  <div class="acc"><span><b>Principales</b> ${esc(pr)}</span><span><b>Secondaires</b> ${esc(se)}</span></div></div>`;
}
function teamBody(t){
  const rules = t.sr.length ? t.sr.map(s => { const id = trKey(s); return id ? `<a class="sk" data-id="${id}">${esc(s)}</a>` : `<span class="sk off">${esc(s)}</span>`; }).join("") : `<span class="none">Aucune</span>`;
  return `<div class="tinfo"><div><small>Relance d'équipe</small><b>${t.rr} 000 po</b><span>0-8</span></div><div><small>Apothicaire</small><b>${t.apo?"Oui":"Non"}</b></div></div>
  <p class="lbl">Ligues</p><p>${esc(t.lg)}</p>
  <p class="lbl">Règles spéciales</p><div class="sks">${rules}</div>
  ${t.bigNote?`<p class="note">${esc(t.bigNote)}</p>`:""}
  <p class="lbl">Joueurs</p>${t.pl.map(playerCard).join("")}
  ${(() => { const ss = ST.map(s => [s, starPlaysFor(s, t)]).filter(([,c]) => c !== false).sort((a,b)=>a[0].n.localeCompare(b[0].n,"fr")); return ss.length ? `<p class="lbl">Star Players disponibles · ${ss.length}</p>` + ss.map(([s,c]) => rowStar(s, c ? esc(c) : `M${s.M} F${s.F} AG${s.AG} CP${s.CP} AR${s.AR}`)).join("") : ""; })()}
  <p class="note">Compétences : A Agilité · F Force · G Générale · M Mutation · P Passe · S Scélérate.</p>
  <div class="src">Fiche d'équipe · livre de règles p. ${t.p}</div>`;
}

// ---------- Recherche ----------
function score(text, words){ const n = norm(text); return words.every(w => n.includes(w)); }
function renderSearch(q){
  const words = norm(q).split(/\s+/).filter(Boolean);
  const nameHits = [], textHits = [];
  SK.forEach(s => { if (score(s.n, words)) nameHits.push(s); else if (score(s.n+" "+s.d+" "+CATS[s.cat], words)) textHits.push(s); });
  const ruleName = [], ruleText = [];
  [...RU,...TB].forEach(r => {
    const body = r.kind==="table" ? r.rows.map(x=>x.join(" ")).join(" ") : strip(r.b);
    if (score(r.t+" "+(r.k||""), words)) ruleName.push(r); else if (score(body, words)) ruleText.push(r);
  });
  const teamHits = [];
  TE.forEach(t => {
    if (score(t.n+" "+t.lg+" "+t.sr.join(" "), words)) { teamHits.push([t, null]); return; }
    const pls = t.pl.filter(p => score(p[1]+" "+p[2], words));
    if (pls.length) teamHits.push([t, pls.map(p=>p[1]).join(", ")]);
  });
  const starHits = ST.filter(s => score(s.n+" "+s.sk+" "+(s.sr?s.sr.t+" "+s.sr.d:""), words));
  const sk = [...nameHits, ...textHits], ru = [...ruleName, ...ruleText];
  let html = "";
  if (sk.length) html += `<h2 class="group">Compétences & Traits · ${sk.length}</h2>` + sk.map(s=>rowSkill(s, nameHits.includes(s)?null:q)).join("");
  if (teamHits.length) html += `<h2 class="group">Équipes · ${teamHits.length}</h2>` + teamHits.map(([t,s]) => rowTeam(t, s ? highlight(esc(s), q) : null)).join("");
  if (starHits.length) html += `<h2 class="group">Star Players · ${starHits.length}</h2>` + starHits.map(s => rowStar(s)).join("");
  if (ru.length) html += `<h2 class="group">Règles & Tableaux · ${ru.length}</h2>` + ru.map(r=>rowRule(r, q)).join("");
  $("#v-search").innerHTML = html || `<div class="empty">Rien trouvé pour « ${esc(q)} ».</div>`;
}

// ---------- Fiche détaillée ----------
const NOLINK = new Set(["Passe","Blocage","Réception","Saut","Lancer de Coéquipier"]);
const NAMES = SK.filter(s => !NOLINK.has(s.n)).map(s => ({id:s.id, re: s.n.replace(/ \(X\+?\)/,"")})).sort((a,b)=>b.re.length-a.re.length);
NAMES.forEach(n => n.rx = new RegExp(`(?<!Zones? de)(^|[\\s(«"'’])(${n.re.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})(?![\\wÀ-ÿ])`));
function linkify(text, selfId){
  let html = esc(text);
  const used = new Set();
  NAMES.forEach(({id,re}) => {
    if (id === selfId || used.has(id)) return;
    const rx = new RegExp(`(^|[\\s(])(${re.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})(?![\\wÀ-ÿ])`);
    if (rx.test(html)) { html = html.replace(rx, `$1<a class="x" data-id="${id}">$2</a>`); used.add(id); }
  });
  return html;
}
// Ajoute des liens vers les compétences/traits cités dans un bloc déjà affiché
// (1re mention de chaque compétence par bloc ; on ne touche ni aux liens existants ni aux boutons)
function linkDom(root, selfId){
  if (!root) return;
  const used = new Set([selfId, ...[...root.querySelectorAll("[data-id]")].map(a => a.dataset.id)]);
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: n =>
    n.parentElement.closest("a,button,.src,summary,h3,.dice,.r") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
  const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
  while (nodes.length) {
    const node = nodes.shift(), txt = node.nodeValue;
    let best = null;
    for (const n of NAMES) {
      if (used.has(n.id)) continue;
      const m = n.rx.exec(txt);
      if (m && (!best || m.index + m[1].length < best.i)) best = {n, i: m.index + m[1].length, len: m[2].length};
    }
    if (!best) continue;
    used.add(best.n.id);
    const a = document.createElement("a");
    a.className = "x"; a.dataset.id = best.n.id; a.textContent = txt.substr(best.i, best.len);
    const after = node.splitText(best.i); after.nodeValue = after.nodeValue.slice(best.len);
    node.parentNode.insertBefore(a, after);
    nodes.unshift(node, after);
  }
}
let stack = [];
let scrolls = [];
function open(id){ const x = BY[id]; if (!x) return; if (stack.length) scrolls[stack.length-1] = $("#sBody").scrollTop; stack.push(id); render(); }
function render(){
  const id = stack[stack.length-1], x = BY[id];
  $("#sBack").classList.toggle("on", stack.length > 1);
  $("#sheet").classList.toggle("tall", x.kind === "team" || x.kind === "star");
  if (x.kind === "skill") {
    $("#sDot").outerHTML = `<div class="dot" id="sDot" style="background:var(--c${x.cat})">${x.cat}</div>`;
    $("#sTitle").textContent = x.n;
    $("#sMeta").textContent = `${x.cat==="T"?"Trait":"Compétence "+CATS[x.cat]} · ${x.act?"Actif":"Passif"}${x.obl?" · obligatoire (*)":""}${x.elite?" · Élite":""}`;
    $("#sBody").innerHTML = `<p>${linkify(x.d, x.id)}</p>
      <p class="note">${x.act?"Actif : utilisable seulement Debout et non Déconcentré (sauf mention contraire).":"Passif : s'applique toujours, quel que soit l'état du joueur."}${x.obl?" Obligatoire : doit être utilisé dès qu'il s'applique.":""}</p>
      <div class="src">Résumé · livre de règles p. ${x.p}</div>`;
  } else if (x.kind === "rule") {
    $("#sDot").outerHTML = `<div class="dot" id="sDot" style="background:var(--surface2);color:var(--gold)">§</div>`;
    $("#sTitle").textContent = x.t;
    $("#sMeta").textContent = x.g;
    $("#sBody").innerHTML = x.b + `<div class="src">Résumé · livre de règles p. ${x.p}</div>`;
  } else if (x.kind === "team") {
    $("#sDot").outerHTML = `<div class="dot emo" id="sDot">${(window.BB_TEAM_EMOJI||{})[x.n] || "🏈"}</div>`;
    $("#sTitle").textContent = x.n;
    $("#sMeta").textContent = `Équipe · ${x.pl.length} postes`;
    $("#sBody").innerHTML = teamBody(x);
  } else if (x.kind === "star") {
    $("#sDot").outerHTML = `<div class="dot emo" id="sDot">⭐</div>`;
    $("#sTitle").textContent = x.n;
    $("#sMeta").textContent = `Star Player · ${x.c} 000 po${x.pair ? " les deux" : ""}`;
    $("#sBody").innerHTML = starBody(x);
  } else if (x.kind === "trule") {
    $("#sDot").outerHTML = `<div class="dot" id="sDot" style="background:var(--surface2);color:var(--gold)">★</div>`;
    $("#sTitle").textContent = x.t;
    $("#sMeta").textContent = "Règle spéciale d'équipe";
    $("#sBody").innerHTML = `<p>${esc(x.d)}</p><div class="src">Résumé · livre de règles p. 154-155</div>`;
  } else {
    $("#sDot").outerHTML = `<div class="dot emo" id="sDot">${x.e}</div>`;
    $("#sTitle").textContent = x.t;
    $("#sMeta").textContent = "Tableau · " + x.dice;
    $("#sBody").innerHTML = tableCard(x).replace('class="card"','class="card" style="padding:0;background:none"').replace(/<h3>.*?<\/h3>/,"") + `<div class="src">Résumé · livre de règles p. ${x.p}</div>`;
  }
  linkDom($("#sBody"), id);
  $("#sBody").scrollTop = scrolls[stack.length-1] || 0;
  if (!$("#sheet").classList.contains("on")) { $("#scrim").classList.add("on"); $("#sheet").classList.add("on"); }
}
function close(){ $("#scrim").classList.remove("on"); $("#sheet").classList.remove("on"); stack = []; scrolls = []; }
// Fermer une fiche ramène à la précédente (ex : compétence → équipe)
function back(){ if (stack.length > 1) { scrolls.length = stack.length - 1; stack.pop(); render(); } else close(); }


// ---------- Navigation ----------
let tab = "skills";
function show(t){
  tab = t;
  document.querySelectorAll("nav button").forEach(b => b.classList.toggle("on", b.dataset.tab===t));
  const q = $("#q").value.trim();
  const view = q ? "search" : t;
  document.querySelectorAll(".view").forEach(v => v.classList.toggle("on", v.id==="v-"+view));
  $("#chips").classList.toggle("off", !!q || t!=="skills");
  $("#achips").classList.toggle("off", !!q || t!=="skills");
  document.dispatchEvent(new CustomEvent("bb:view", {detail: view}));
  setHH();
}
function setHH(){ document.documentElement.style.setProperty("--hh", $("header").offsetHeight + "px"); }

// ---------- Évènements ----------
document.addEventListener("click", e => {
  const a = e.target.closest("[data-id]");
  if (a) { e.preventDefault(); open(a.dataset.id); return; }
  const g = e.target.closest("[data-seg]");
  if (g) { teamSeg = g.dataset.seg; renderTeams(); window.scrollTo(0,0); return; }
  const sl = e.target.closest("[data-slg]");
  if (sl) { starLg = sl.dataset.slg; renderTeams(); return; }
  const stm = e.target.closest("[data-steam]");
  if (stm) { starTeam = stm.dataset.steam; renderTeams(); return; }
  const sso = e.target.closest("[data-ssort]");
  if (sso) { const k = sso.dataset.ssort; if (starSort === k) starDir = -starDir; else { starSort = k; starDir = 1; } renderTeams(); return; }
  if (e.target.closest("[data-sreset]")) { starLg = starTeam = "all"; renderTeams(); return; }
  const c = e.target.closest("[data-cat]");
  if (c) { cat = c.dataset.cat; renderChips(); renderSkills(); window.scrollTo(0,0); return; }
  const ac = e.target.closest("[data-act]");
  if (ac) { act = ac.dataset.act; renderChips(); renderSkills(); window.scrollTo(0,0); return; }
  const n = e.target.closest("nav button");
  if (n) { if ($("#q").value) { $("#q").value=""; $("#searchBox").classList.remove("has"); } show(n.dataset.tab); window.scrollTo(0,0); }
});
$("#scrim").addEventListener("click", back);
$("#q").addEventListener("input", e => {
  const q = e.target.value.trim();
  $("#searchBox").classList.toggle("has", !!e.target.value);
  if (q) renderSearch(q);
  show(tab);
  window.scrollTo(0,0);
});
$("#q").addEventListener("keydown", e => { if (e.key==="Enter") e.target.blur(); });
$("#clear").addEventListener("click", () => { $("#q").value=""; $("#searchBox").classList.remove("has"); show(tab); $("#q").focus(); });
$("#sBack").addEventListener("click", back);
$("#sClose").addEventListener("click", back);
window.addEventListener("resize", setHH);

// Glisser la fiche vers le bas pour fermer
let y0 = null;
$("#sheet").addEventListener("touchstart", e => { if ($("#sBody").scrollTop <= 0) y0 = e.touches[0].clientY; }, {passive:true});
$("#sheet").addEventListener("touchmove", e => { if (y0===null) return; const dy = e.touches[0].clientY - y0; if (dy > 0) $("#sheet").style.transform = `translateY(${dy}px)`; }, {passive:true});
$("#sheet").addEventListener("touchend", e => { if (y0===null) return; const dy = e.changedTouches[0].clientY - y0; $("#sheet").style.transform = ""; y0 = null; if (dy > 90) back(); });

renderChips(); renderSkills(); renderRules(); renderTables(); renderTeams(); show("skills");

if ("serviceWorker" in navigator && location.protocol === "https:") {
  // Quand une nouvelle version s'installe, on recharge une fois pour l'afficher tout de suite
  const had = !!navigator.serviceWorker.controller;
  let reloaded = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => { if (had && !reloaded) { reloaded = true; location.reload(); } });
  navigator.serviceWorker.register("sw.js", {updateViaCache: "none"}).then(r => r.update()).catch(()=>{});
}
})();
