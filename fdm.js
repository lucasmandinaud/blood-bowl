// ---------- Feuille de match (Lutèce) ----------
// Saisie rapide pendant et après le match, puis génération d'un PDF A4
// qui reproduit la feuille officielle (image de fond + valeurs dessinées dessus).
// Le brouillon est gardé dans le téléphone (localStorage) à chaque modification.
(() => {
const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const KEY = "bb-fdm";
const TEAMS = (window.BB_TEAMS || []).map(t => t.n).sort((a,b) => a.localeCompare(b, "fr"));
const BRUTES = new Set((window.BB_TEAMS || []).filter(t => (t.sr || []).includes("Bagarreurs Brutaux")).map(t => t.n));
const TBL = id => (window.BB_TABLES || []).find(t => t.id === id || t.id === "t-" + id);
const METEO = (TBL("meteo")?.rows || []).map(r => r[1]);
const PRIERES = (TBL("prieres")?.rows || []).map(r => r[1]);
const SKILLS = (window.BB_SKILLS || []).map(s => s.n.replace(/ \(X\+?\)/, ""));
const COLS = ["#d0484a", "#3b8fd9"];            // Équipe 1 rouge, Équipe 2 bleu (comme la feuille papier)

const newPlayer = () => ({n:"", td:0, reu:0, sor:0, int:0, jpv:false, al:"", ch:"", cc:"", ma:false, bp:false, rc:"", mort:false});
const newTeam = () => ({nom:"", coach:"", roster:"", bb:false, pub:"", met:"", agr:0, sp:0, cdp:"", tempo:true, fd:"", ach:"", vir:"", enc:"", err:"", pl:[]});
let S = { j:"", met:"", t:[newTeam(), newTeam()] };
try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.t) S = s; } catch(e){}
// Météo : un seul champ commun aux deux équipes (ancien format : un par équipe)
if (S.met === undefined) S.met = METEO.includes(S.t[0].met) ? S.t[0].met : "";
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch(e){} };
const openSec = new Set(["infos"]);
let pdfFile = null, pdfUrl = "";

// ---------- Calculs ----------
const score = i => S.t[i].pl.reduce((a, p) => a + (+p.td || 0), 0);
const num = v => { const n = parseFloat(String(v).replace(",", ".")); return isNaN(n) ? null : n; };
function gains(i){
  const a = num(S.t[0].pub), b = num(S.t[1].pub);
  if (a === null || b === null) return null;
  return ((a + b) / 2 + score(i) + (S.t[i].tempo ? 1 : 0)) * 10000;
}
const po = n => n === null ? "" : n.toLocaleString("fr-FR").replace(/ | /g, " ") + " po";
function psp(p, bb){
  return (+p.reu||0) + (+p.int||0) * 2 + (+p.sor||0) * (bb ? 3 : 2) + (+p.td||0) * (bb ? 2 : 3) + (p.jpv ? 4 : 0);
}
const filled = p => p.n || p.td || p.reu || p.sor || p.int || p.jpv || p.al || p.ch || p.cc || p.ma || p.bp || p.rc || p.mort;
const teamName = i => S.t[i].nom || `Équipe ${i+1}`;

// ---------- Écran ----------
const field = (i, k, ph = "", extra = "") => `<input data-f="${k}" data-t="${i}" value="${esc(S.t[i][k])}" placeholder="${esc(ph)}" autocomplete="off" ${extra}>`;
const counter = (attrs, v) => `<div class="fd-cnt"><button data-inc="-1" ${attrs} aria-label="moins">−</button><b>${v || 0}</b><button data-inc="1" ${attrs} aria-label="plus">+</button></div>`;
const seg = (attrs, opts, cur) => `<div class="fd-seg">${opts.map(([v,l]) => `<button data-set="${esc(v)}" ${attrs} class="${String(cur)===String(v)?"on":""}">${l}</button>`).join("")}</div>`;
const two = (label, cell, note = "") => `<div class="fd-row"><p class="fd-lbl">${label}${note ? ` <small>${note}</small>` : ""}</p><div class="fd-two">${cell(0)}${cell(1)}</div></div>`;
const heads = () => `<div class="fd-two fd-heads">${[0,1].map(i => `<span style="color:${COLS[i]}">${esc(teamName(i))}</span>`).join("")}</div>`;
const sec = (id, title, body, right = "") => `<details class="rgrp fd-sec" data-sec="${id}"${openSec.has(id) ? " open" : ""}><summary><span>${title}</span>${right}</summary><div class="fd-body">${body}</div></details>`;

function infos(){
  return `<div class="fd-row"><p class="fd-lbl">Journée N°</p><input class="fd-j" data-j value="${esc(S.j)}" inputmode="numeric" placeholder="…" autocomplete="off"></div>
  ${two("Nom des équipes", i => field(i, "nom", `Équipe ${i+1}`), "dans l'ordre du site")}
  ${two("Roster", i => `<select data-f="roster" data-t="${i}"><option value="">—</option>${TEAMS.map(n => `<option${S.t[i].roster===n?" selected":""}>${esc(n)}</option>`).join("")}</select>`)}
  ${two("Coach", i => field(i, "coach", "Nom du coach"))}
  ${two("Score", i => `<div class="fd-calc" style="color:${COLS[i]}"><b data-calc="score${i}">${score(i)}</b><small>TD des joueurs</small></div>`)}
  ${two("Public", i => field(i, "pub", "D3 + FD", 'inputmode="numeric"'), "1D3 + Fans Dévoués")}
  <div class="fd-row"><p class="fd-lbl">Séquence météo</p><select data-met><option value="">—</option>${METEO.map(m => `<option${S.met===m?" selected":""}>${esc(m)}</option>`).join("")}</select></div>
  ${two("Agressions", i => counter(`data-k="agr" data-t="${i}"`, S.t[i].agr))}
  ${two("Sorties Public", i => counter(`data-k="sp" data-t="${i}"`, S.t[i].sp))}
  ${two("Coups de pouce & Prières", i => field(i, "cdp", "Pot-de-vin, Prière…", 'list="fdPrieres"'))}
  ${two("Brawling Brute", i => seg(`data-k="bb" data-t="${i}"`, [[true,"Oui"],[false,"Non"]], S.t[i].bb), "Bagarreurs Brutaux · auto selon le roster")}`;
}
function players(i){
  const t = S.t[i], n7 = t.pl.filter(filled).length > 7;
  return t.pl.map((p, k) => `<div class="fd-pl${p.jpv ? " jpv" : ""}">
    <div class="fd-ph"><label>N°<input data-p="n" data-t="${i}" data-k2="${k}" value="${esc(p.n)}" inputmode="numeric" autocomplete="off"></label>
      <span class="fd-psp" data-calc="psp${i}-${k}">${psp(p, t.bb)} PSP</span>
      <button class="fd-jpv${p.jpv ? " on" : ""}" data-jpv="${k}" data-t="${i}">⭐ JPV</button>
      <button class="fd-del" data-del="${k}" data-t="${i}" aria-label="Supprimer">✕</button></div>
    <div class="fd-cnts">${[["td","TD"],["reu","Réu"],["sor","Sorties"],["int","Inter"]].map(([f,l]) => `<div><small>${l}</small>${counter(`data-k="${f}" data-t="${i}" data-k2="${k}"`, p[f])}</div>`).join("")}</div>
    <details class="fd-more"${p.al||p.ch||p.cc||p.ma||p.bp||p.rc||p.mort ? " open" : ""}><summary>Compétences & blessures</summary>
      <div class="fd-sk">${[["al","Aléatoire"],["ch","Choisie"],["cc","Carac ou Comp"]].map(([f,l]) => `<label><small>${l}</small><input data-p="${f}" data-t="${i}" data-k2="${k}" value="${esc(p[f])}" list="fdSkills" autocomplete="off"></label>`).join("")}</div>
      <div class="fd-inj">${[["ma","MA"],["bp","BP"],["mort","☠️ Mort"]].map(([f,l]) => `<button class="${p[f]?"on":""}" data-tog="${f}" data-t="${i}" data-k2="${k}">${l}</button>`).join("")}</div>
      <p class="fd-lbl" style="margin-top:8px">Réduction de carac</p>${seg(`data-k="rc" data-t="${i}" data-k2="${k}"`, [["","—"],["M","M"],["F","F"],["AG","AG"],["CP","CP"],["AR","AR"]], p.rc)}
    </details></div>`).join("")
  + `<button class="fd-add" data-addp="${i}">＋ Ajouter un joueur</button>`
  + (n7 ? `<p class="pnote">⚠️ La feuille papier n'a que 7 lignes : seuls les 7 premiers joueurs (par N°) seront dans le PDF.</p>` : "")
  + `<p class="pnote">PSP indicatifs${t.bb ? " (Brawling Brute : TD 2, Sortie 3)" : ""} · Réu 1, Inter 2, Sortie ${t.bb?3:2}, TD ${t.bb?2:3}, JPV 4.</p>`;
}
function apres(){
  return heads()
  + two("Bonus Tempo +1", i => seg(`data-k="tempo" data-t="${i}"`, [[true,"Oui"],[false,"Non"]], S.t[i].tempo))
  + two("Gains", i => `<div class="fd-calc"><b data-calc="gains${i}">${gains(i) === null ? "—" : po(gains(i))}</b><small>(Public total ÷ 2) + TD + Tempo</small></div>`)
  + two("Fans dévoués", i => seg(`data-k="fd" data-t="${i}"`, [["+1","+1"],["=","="],["-1","−1"]], S.t[i].fd))
  + two("Achats joueurs", i => field(i, "ach", "—"))
  + two("Joueurs virés", i => field(i, "vir", "—"))
  + two("Achats encadrement / Journalier", i => field(i, "enc", "—"))
  + two("Erreur coûteuse (1D6)", i => `<select data-f="err" data-t="${i}">${[["","— (pas de jet)"],...[1,2,3,4,5,6].map(n => [String(n), "Jet : " + n])].map(([v,l]) => `<option value="${v}"${S.t[i].err===v?" selected":""}>${l}</option>`).join("")}</select>`, "pas de jet si Trésorerie &lt; 100 000");
}
function render(){
  const v = $("#v-fdm"); if (!v) return;
  const y = window.scrollY;
  v.innerHTML = `<div class="fd-top"><h2 class="group">📝 Feuille de match</h2><button data-fdnew>＋ Nouvelle feuille</button></div>
  ${sec("infos", "📋 Infos du match", heads() + infos())}
  ${[0,1].map(i => sec("pl" + i, `<i class="fd-dot" style="background:${COLS[i]}"></i>Joueurs · ${esc(teamName(i))}`, players(i), `<em>${S.t[i].pl.filter(filled).length}</em>`)).join("")}
  ${sec("apres", "💰 Séquence d'après-match", apres())}
  <button class="tm-big" data-pdf>📄 Générer le PDF</button>
  <div id="fdOut"></div>
  <p class="pnote" style="text-align:center">Tout est enregistré au fur et à mesure dans le téléphone.</p>
  <datalist id="fdSkills">${SKILLS.map(s => `<option value="${esc(s)}">`).join("")}</datalist>
  <datalist id="fdPrieres">${PRIERES.map(s => `<option value="${esc(s)}">`).join("")}</datalist>`;
  window.scrollTo(0, y);
}
function refreshCalc(){
  [0,1].forEach(i => {
    const s = document.querySelector(`[data-calc="score${i}"]`); if (s) s.textContent = score(i);
    const g = document.querySelector(`[data-calc="gains${i}"]`); if (g) g.textContent = gains(i) === null ? "—" : po(gains(i));
    S.t[i].pl.forEach((p, k) => { const e = document.querySelector(`[data-calc="psp${i}-${k}"]`); if (e) e.textContent = psp(p, S.t[i].bb) + " PSP"; });
  });
}
function dropPdf(){ pdfFile = null; if (pdfUrl) URL.revokeObjectURL(pdfUrl); pdfUrl = ""; const o = $("#fdOut"); if (o) o.innerHTML = ""; }

// Pré-remplit les coachs depuis le Timer quand c'est vide
function prefill(){
  try {
    const t = JSON.parse(localStorage.getItem("bb-timer"));
    const names = t && t.cfg && t.cfg.names || [];
    names.forEach((n, i) => { if (S.t[i] && !S.t[i].coach && n && !/^Coach \d$/.test(n)) S.t[i].coach = n; });
  } catch(e){}
}

// ---------- Évènements ----------
document.addEventListener("click", e => {
  const v = e.target.closest("#v-fdm"); if (!v) return;
  const b = e.target.closest("button"); if (!b) return;
  const d = b.dataset, i = +(d.t ?? d.addp), t = S.t[i];
  if ("fdnew" in d) {
    if (!confirm("Commencer une nouvelle feuille ?\n\nToute la feuille actuelle est effacée (le n° de journée passe au suivant).")) return;
    const j = parseInt(S.j, 10);
    S = { j: isNaN(j) ? "" : String(j + 1), met:"", t:[newTeam(), newTeam()] };
    prefill(); save(); dropPdf(); render(); return;
  }
  if ("pdf" in d) { makePdf(); return; }
  if ("share" in d) { sharePdf(); return; }
  if ("inc" in d) {
    const o = d.k2 !== undefined ? t.pl[+d.k2] : t;
    o[d.k] = Math.max(0, (+o[d.k] || 0) + (+d.inc));
    b.parentElement.querySelector("b").textContent = o[d.k];
    if (d.k2 !== undefined) v.querySelector(`details[data-sec="pl${i}"] summary em`).textContent = t.pl.filter(filled).length;
    save(); dropPdf(); refreshCalc(); return;
  }
  if ("set" in d) {
    const o = d.k2 !== undefined ? t.pl[+d.k2] : t;
    o[d.k] = d.set === "true" ? true : d.set === "false" ? false : d.set;
    b.parentElement.querySelectorAll("button").forEach(x => x.classList.toggle("on", x === b));
    save(); dropPdf(); refreshCalc(); return;
  }
  if ("addp" in d) { t.pl.push(newPlayer()); save(); render();
    const ins = v.querySelectorAll(`details[data-sec="pl${i}"] [data-p="n"]`); const last = ins[ins.length-1]; if (last) last.focus(); return; }
  if ("del" in d) {
    const p = t.pl[+d.del];
    if (filled(p) && !confirm(`Supprimer le joueur${p.n ? " n° " + p.n : ""} ?`)) return;
    t.pl.splice(+d.del, 1); save(); dropPdf(); render(); return;
  }
  if ("jpv" in d) { const k = +d.jpv, on = !t.pl[k].jpv; t.pl.forEach((p, x) => p.jpv = on && x === k); save(); dropPdf(); render(); return; }
  if ("tog" in d) { const p = t.pl[+d.k2]; p[d.tog] = !p[d.tog]; b.classList.toggle("on", p[d.tog]); save(); dropPdf(); return; }
});
// Safari n'envoie pas toujours « input » sur les listes déroulantes : on écoute aussi « change »
const onField = e => {
  const el = e.target; if (!el.closest || !el.closest("#v-fdm")) return;
  if (e.type === "change" && el.tagName !== "SELECT") return;
  const d = el.dataset;
  if ("j" in d) S.j = el.value;
  else if ("met" in d) S.met = el.value;
  else if (d.p) S.t[+d.t].pl[+d.k2][d.p] = el.value;
  else if (d.f) {
    S.t[+d.t][d.f] = el.value;
    if (d.f === "roster" && el.value) { S.t[+d.t].bb = BRUTES.has(el.value); save(); dropPdf(); render(); return; }
    if (d.f === "nom") { const h = document.querySelectorAll("#v-fdm .fd-heads span"); h.forEach((x, k) => { if (k % 2 === +d.t) x.textContent = teamName(+d.t); }); }
  } else return;
  save(); dropPdf(); refreshCalc();
};
document.addEventListener("input", onField);
document.addEventListener("change", onField);
document.addEventListener("toggle", e => {
  const s = e.target.closest && e.target.closest("details[data-sec]");
  if (s && e.target === s) s.open ? openSec.add(s.dataset.sec) : openSec.delete(s.dataset.sec);
}, true);

// ---------- PDF ----------
// Coordonnées en pixels sur l'image de fond (A4 à 150 ppp : 1240 × 1753)
const T1 = { x:101, w:350.3, y:195, rows:[36.6,54.2,40.3,47.8,48.1,48.1,35.4,50.7,53.6] };
const T2 = { x:101, w:350.3, y:650, rows:[46.1,55.0,39.7,55.4,48.8,55.4,34.5] };
const PC = [55.1,71.9,70.5,80.1,74.4,59.5,67.2,101.7,94.5,92.9,70.9,71.5,77.0,65.6];
const PT = [{x:100, y:1051}, {x:100, y:1414}];
const BOX = [{y:1015}, {y:1378}], BOX_X = {oui:434, non:527};
const rowY = (T, r) => T.y + T.rows.slice(0, r).reduce((a, b) => a + b, 0);
const INK = "#16306b";
const FONT = w => `${w} {S}px -apple-system, "Helvetica Neue", Helvetica, Arial, sans-serif`;

function fitText(c, txt, x, y, w, h, size = 24, weight = 600){
  txt = String(txt ?? "").trim(); if (!txt) return;
  c.fillStyle = INK; c.textAlign = "center"; c.textBaseline = "middle";
  const words = txt.split(/\s+/);
  for (let s = size; s >= 11; s--) {
    c.font = FONT(weight).replace("{S}", s);
    const lines = []; let cur = "";
    words.forEach(wd => { const t = cur ? cur + " " + wd : wd; if (c.measureText(t).width <= w - 12 || !cur) cur = t; else { lines.push(cur); cur = wd; } });
    if (cur) lines.push(cur);
    const lh = s * 1.12, maxL = Math.max(1, Math.floor((h - 4) / lh));
    if (lines.length <= maxL && lines.every(l => c.measureText(l).width <= w - 12)) {
      lines.forEach((l, k) => c.fillText(l, x + w/2, y + h/2 + (k - (lines.length - 1)/2) * lh));
      return;
    }
  }
  c.font = FONT(weight).replace("{S}", 11);
  let t = txt; while (t.length > 1 && c.measureText(t + "…").width > w - 8) t = t.slice(0, -1);
  c.fillText(t + "…", x + w/2, y + h/2);
}
const loadImg = src => new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = src; });

async function draw(){
  const bg = await loadImg("fdm-bg.jpg?v=1");
  const cv = document.createElement("canvas"); cv.width = 1240; cv.height = 1753;
  const c = cv.getContext("2d");
  c.fillStyle = "#fff"; c.fillRect(0, 0, cv.width, cv.height);
  c.drawImage(bg, 0, 0, cv.width, cv.height);
  // Journée
  if (S.j) { c.fillStyle = INK; c.font = FONT(800).replace("{S}", 40); c.textAlign = "left"; c.textBaseline = "alphabetic"; c.fillText(S.j, 345, 216); }
  // Tableau du haut
  const top = [t => t.nom, t => t.coach, (t, i) => String(score(i)), t => t.pub, () => "", t => t.agr ? String(t.agr) : "0", t => t.sp ? String(t.sp) : "0", t => t.cdp];
  top.forEach((fn, r) => [0,1].forEach(i => fitText(c, fn(S.t[i], i), T1.x + T1.w * (i + 1), rowY(T1, r + 1), T1.w, T1.rows[r + 1], r === 2 ? 30 : 24, r === 2 ? 800 : 600)));
  [0,1].forEach(i => fitText(c, S.met, T1.x + T1.w * (i + 1), rowY(T1, 5), T1.w, T1.rows[5]));
  // Après-match
  const fdTxt = v => v === "+1" ? "+1" : v === "-1" ? "−1" : v === "=" ? "=" : "";
  const aft = [t => t.tempo ? "OUI" : "NON", (t, i) => gains(i) === null ? "" : po(gains(i)), t => fdTxt(t.fd), t => t.ach, t => t.vir, t => t.enc, t => t.err];
  aft.forEach((fn, r) => [0,1].forEach(i => fitText(c, fn(S.t[i], i), T2.x + T2.w * (i + 1), rowY(T2, r), T2.w, T2.rows[r])));
  // Brawling Brute
  [0,1].forEach(i => fitText(c, "X", (S.t[i].bb ? BOX_X.oui : BOX_X.non), BOX[i].y, 29, 25, 22, 800));
  // Joueurs
  [0,1].forEach(i => {
    const t = S.t[i];
    const list = t.pl.filter(filled).sort((a, b) => (parseInt(a.n, 10) || 999) - (parseInt(b.n, 10) || 999)).slice(0, 7);
    list.forEach((p, r) => {
      const y = PT[i].y + 51.9 + r * 35.1;
      const cells = [p.n, p.td || "", p.reu || "", p.sor || "", p.int || "", p.jpv ? "X" : "", "", p.al, p.ch, p.cc, p.ma ? "X" : "", p.bp ? "X" : "", p.rc, p.mort ? "X" : ""];
      let x = PT[i].x;
      cells.forEach((v, k) => { fitText(c, v, x, y, PC[k], 35.1, 20, k === 0 ? 800 : 600); x += PC[k]; });
    });
  });
  return cv;
}
// PDF minimal : une page A4 contenant l'image JPEG de la feuille
function jpegToPdf(bytes, wPx, hPx){
  const enc = new TextEncoder(), parts = [], offs = [];
  let len = 0;
  const add = x => { const b = typeof x === "string" ? enc.encode(x) : x; parts.push(b); len += b.length; };
  const obj = (n, body) => { offs[n] = len; add(`${n} 0 obj\n`); body(); add("\nendobj\n"); };
  const W = 595.28, H = 841.89, cs = `q ${W} 0 0 ${H} 0 0 cm /Im0 Do Q`;
  add("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n");
  obj(1, () => add("<< /Type /Catalog /Pages 2 0 R >>"));
  obj(2, () => add("<< /Type /Pages /Kids [3 0 R] /Count 1 >>"));
  obj(3, () => add(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /XObject << /Im0 5 0 R >> >> /Contents 4 0 R >>`));
  obj(4, () => add(`<< /Length ${cs.length} >>\nstream\n${cs}\nendstream`));
  obj(5, () => { add(`<< /Type /XObject /Subtype /Image /Width ${wPx} /Height ${hPx} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${bytes.length} >>\nstream\n`); add(bytes); add("\nendstream"); });
  const xref = len;
  add(`xref\n0 6\n0000000000 65535 f \n${[1,2,3,4,5].map(n => String(offs[n]).padStart(10, "0") + " 00000 n \n").join("")}trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`);
  return new Blob(parts, {type: "application/pdf"});
}
const fileName = () => {
  const clean = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return ["FDM", S.j ? "J" + clean(S.j) : "", clean(S.t[0].nom) || "Equipe1", "vs", clean(S.t[1].nom) || "Equipe2"].filter(Boolean).join("_") + ".pdf";
};
async function makePdf(){
  const out = $("#fdOut");
  const miss = [];
  if (!S.j) miss.push("le numéro de journée");
  [0,1].forEach(i => { if (!S.t[i].nom) miss.push(`le nom de l'équipe ${i+1}`); });
  if (miss.length && !confirm(`Il manque ${miss.join(", ")}.\n\nGénérer le PDF quand même ?`)) return;
  out.innerHTML = `<p class="pnote" style="text-align:center">Création du PDF…</p>`;
  try {
    const cv = await draw();
    const url = cv.toDataURL("image/jpeg", 0.86);
    const bin = atob(url.split(",")[1]), bytes = new Uint8Array(bin.length);
    for (let k = 0; k < bin.length; k++) bytes[k] = bin.charCodeAt(k);
    const blob = jpegToPdf(bytes, cv.width, cv.height);
    pdfFile = new File([blob], fileName(), {type: "application/pdf"});
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    pdfUrl = URL.createObjectURL(blob);
    out.innerHTML = `<div class="card fd-prev"><img src="${url}" alt="Aperçu de la feuille de match"></div>
      <button class="tm-big fd-send" data-share>✉️ Envoyer le PDF</button>
      <p class="pnote" style="text-align:center">${esc(pdfFile.name)} · ${Math.round(blob.size / 1024)} Ko<br>Choisis Gmail ou Mail dans le menu de partage : le PDF est déjà en pièce jointe.</p>`;
    out.scrollIntoView({behavior: "smooth", block: "start"});
  } catch(err) {
    out.innerHTML = `<p class="pnote" style="text-align:center;color:#ff6b73">Le PDF n'a pas pu être créé (${esc(err && err.message || err)}).</p>`;
  }
}
async function sharePdf(){
  if (!pdfFile) return;
  if (navigator.canShare && navigator.canShare({files: [pdfFile]})) {
    try { await navigator.share({files: [pdfFile], title: pdfFile.name}); } catch(e) {}
    return;
  }
  const a = document.createElement("a"); a.href = pdfUrl; a.download = pdfFile.name; a.target = "_blank";
  document.body.appendChild(a); a.click(); a.remove();
}

document.addEventListener("bb:view", e => { if (e.detail === "fdm") { prefill(); save(); render(); } });
})();
