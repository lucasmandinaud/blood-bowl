// ---------- Chrono de match ----------
// Le temps est calculé à partir d'horodatages (et non d'un compteur) :
// il reste juste même si l'iPhone se verrouille ou si l'app est fermée puis rouverte.
(() => {
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const KEY = "bb-timer";
const TURNS = 8;                       // tours par coach et par mi-temps
const COL = ["var(--cA)", "var(--cF)"];

const DEF_CFG = { mode:"total", totalMin:120, setupMin:15, turnMin:4, carry:true, cap:2, names:["Coach 1","Coach 2"], first:0 };
let cfg = {...DEF_CFG}, st = {phase:"setup"};
try { const s = JSON.parse(localStorage.getItem(KEY)); if (s) { cfg = {...DEF_CFG, ...s.cfg}; st = s.st || st; } } catch(e){}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify({cfg, st})); } catch(e){} };

// ---------- Calculs ----------
const baseMs = () => cfg.mode === "total"
  ? Math.max(30000, (cfg.totalMin - cfg.setupMin) * 60000 / (4 * TURNS))
  : cfg.turnMin * 60000;
const who = () => (st.first + st.idx + (st.half === 2 ? 1 : 0)) % 2;
const now = () => Date.now();
function elapsed(){
  if (!st.turnStart) return 0;
  const t = st.pauseAt || now();
  return t - st.turnStart - (st.pausedAcc || 0);
}
const allowance = () => st.base + (st.carry ? st.bank[who()] : 0);
const remaining = () => allowance() - elapsed();
function fmt(ms){
  const neg = ms < 0; ms = Math.abs(ms);
  const s = neg ? Math.floor(ms / 1000) : Math.ceil(ms / 1000);
  const m = Math.floor(s / 60), r = s % 60;
  return (neg ? "+" : "") + m + ":" + String(r).padStart(2, "0");
}
function fmtLong(ms){
  const s = Math.round(ms / 1000), h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), r = s % 60;
  if (h) return `${h} h ${String(m).padStart(2,"0")}`;
  if (!m) return `${r} s`;
  return r && m < 10 ? `${m} min ${String(r).padStart(2,"0")} s` : `${m} min`;
}
const clock = t => new Date(t).toLocaleTimeString("fr-FR", {hour:"2-digit", minute:"2-digit"});
const hm = min => `${Math.floor(min/60)} h ${String(min%60).padStart(2,"0")}`;

// ---------- Son, vibration, écran allumé ----------
let ac = null;
function unlockAudio(){
  try { if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)(); if (ac.state === "suspended") ac.resume(); } catch(e){}
}
function beep(n = 1, f = 880){
  if (!ac) return;
  for (let i = 0; i < n; i++) {
    const o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime + i * 0.28;
    o.frequency.value = f; o.type = "square";
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.25, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
    o.connect(g).connect(ac.destination); o.start(t); o.stop(t + 0.22);
  }
  if (navigator.vibrate) navigator.vibrate(n > 1 ? [200,100,200,100,400] : 150);
}
let lock = null;
async function wake(on){
  try {
    if (on && !lock && "wakeLock" in navigator) { lock = await navigator.wakeLock.request("screen"); lock.addEventListener("release", () => lock = null); }
    if (!on && lock) { await lock.release(); lock = null; }
  } catch(e){ lock = null; }
}

// ---------- Actions ----------
function start(){
  unlockAudio();
  st = { phase:"running", half:1, idx:0, first:cfg.first, base:baseMs(), carry:cfg.carry, cap:cfg.carry && cfg.cap ? cfg.cap * baseMs() : 0, bank:[0,0], over:[0,0], used:[0,0],
         turnStart:now(), pausedAcc:0, pauseAt:null, log:[], matchStart:now(), warned:0 };
  commit();
}
function endTurn(){
  if (st.phase !== "running" && st.phase !== "paused") return;
  unlockAudio();
  const w = who(), used = elapsed(), rem = allowance() - used;
  st.log.push({w, used, bank:st.bank[w], over:st.over[w]});
  st.used[w] += used;
  if (rem < 0) st.over[w] += -rem;
  if (st.carry) st.bank[w] = st.cap ? Math.min(st.cap, Math.max(0, rem)) : Math.max(0, rem);
  st.idx++;
  st.warned = 0;
  if (st.idx >= 2 * TURNS) { st.phase = st.half === 1 ? "half" : "done"; st.turnStart = null; if (st.phase === "done") st.matchEnd = now(); }
  else { st.phase = "running"; st.turnStart = now(); st.pausedAcc = 0; st.pauseAt = null; }
  commit();
}
function undo(){
  if (!st.log || !st.log.length || st.log[st.log.length-1].w === -1) return;
  const last = st.log[st.log.length-1];
  if (!confirm(`Annuler la fin du tour de ${cfg.names[last.w]} ?\n\nLe chrono revient à son tour, avec le temps qu'il lui restait.`)) return;
  const l = st.log.pop();
  if (st.phase === "half" || st.phase === "done") { if (st.idx === 0) { st.half = 1; st.idx = 2 * TURNS; } st.phase = "running"; }
  st.idx--;
  st.bank[l.w] = l.bank; st.over[l.w] = l.over; st.used[l.w] -= l.used;
  st.turnStart = now() - l.used; st.pausedAcc = 0; st.pauseAt = null; st.warned = 0;
  if (st.phase === "paused") st.pauseAt = now();
  commit();
}
function pause(){
  if (st.phase === "running") { st.pauseAt = now(); st.phase = "paused"; }
  else if (st.phase === "paused") { unlockAudio(); st.pausedAcc += now() - st.pauseAt; st.pauseAt = null; st.phase = "running"; }
  commit();
}
function secondHalf(){
  unlockAudio();
  st.half = 2; st.idx = 0; st.phase = "running"; st.turnStart = now(); st.pausedAcc = 0; st.pauseAt = null; st.warned = 0;
  st.log.push({w:-1}); // repère de mi-temps (non annulable au-delà)
  commit();
}
function reset(){
  if (st.phase !== "done" && !confirm("Arrêter le match en cours et revenir aux réglages ?")) return;
  st = {phase:"setup"}; commit();
}
function commit(){ save(); wake(st.phase === "running"); render(); }

// ---------- Rendu ----------
function stepper(k, label, val, sub){
  return `<div class="tm-step"><div><b>${label}</b>${sub?`<small>${sub}</small>`:""}</div>
    <div class="tm-ctl"><button data-tk="${k}" data-d="-1" aria-label="Moins">−</button><output>${val}</output><button data-tk="${k}" data-d="1" aria-label="Plus">+</button></div></div>`;
}
function seg(k, opts, v){
  return `<div class="tm-seg">${opts.map(([val,lab]) => `<button data-ts="${k}" data-v="${val}" class="${String(v)===String(val)?"on":""}">${lab}</button>`).join("")}</div>`;
}
function setupView(){
  const b = baseMs();
  const res = cfg.mode === "total"
    ? `<b>${fmtLong(b)}</b> par tour · ${4*TURNS} tours (${TURNS} par coach et par mi-temps)`
    : `Tours : <b>${hm(Math.round(b * 4 * TURNS / 60000))}</b> max, plus les coups d'envoi`;
  return `<h2 class="group">⏱️ Chrono de match</h2>
  <div class="card tm-card">
    ${seg("mode", [["total","On a X heures"],["turn","Minutes par tour"]], cfg.mode)}
    ${cfg.mode === "total"
      ? stepper("totalMin", "Temps de jeu disponible", hm(cfg.totalMin)) +
        stepper("setupMin", "Réserve hors tours", cfg.setupMin + " min", "Coups d'envoi, mises en place, mi-temps")
      : stepper("turnMin", "Durée d'un tour", String(cfg.turnMin).replace(".", ",") + " min")}
    <div class="tm-res">${res}</div>
    <button class="tm-tog${cfg.carry?" on":""}" data-tt="carry"><span><b>Réserve de temps</b><small>Le temps non utilisé (tour rapide, turnover) est mis de côté. Il ne sert que si un tour dépasse son temps de base.</small></span><i></i></button>
    ${cfg.carry ? stepper("cap", "Plafond de la réserve", cfg.cap ? fmt(cfg.cap * b) : "Aucun", cfg.cap ? `${cfg.cap} tour${cfg.cap > 1 ? "s" : ""} de base` : "La réserve peut grossir sans limite") : ""}
  </div>
  <h2 class="group">🏈 Coachs</h2>
  <div class="card tm-card">
    ${[0,1].map(i => `<label class="tm-name"><i style="background:${COL[i]}"></i><input data-tn="${i}" value="${esc(cfg.names[i])}" maxlength="18" autocomplete="off"></label>`).join("")}
    <p class="lbl" style="margin:12px 0 6px">Reçoit en 1re mi-temps (joue en premier)</p>
    ${seg("first", [[0,esc(cfg.names[0])],[1,esc(cfg.names[1])]], cfg.first)}
  </div>
  <button class="tm-big" data-ta="start">▶ Coup d'envoi</button>
  <p class="pnote" style="text-align:center">Pendant le match, le chrono reste visible en bas de l'écran sur tous les onglets.</p>`;
}
function scoreCards(){
  return `<div class="tm-score">${[0,1].map(i => `<div style="border-color:${COL[i]}"><b><i style="background:${COL[i]}"></i>${esc(cfg.names[i])}</b>
    ${st.carry ? `<span>Réserve <em id="tmBank${i}">${fmt(st.bank[i])}</em></span>` : ""}
    <span>Temps joué <em>${fmtLong(st.used[i])}</em></span>
    <span>Dépassements <em class="${st.over[i] ? "red" : ""}">${st.over[i] ? fmt(st.over[i]).replace("+","") : "0:00"}</em></span></div>`).join("")}</div>`;
}
function runView(){
  const w = who(), turn = Math.floor(st.idx / 2) + 1, paused = st.phase === "paused";
  return `<h2 class="group">⏱️ ${st.half === 1 ? "1re" : "2e"} mi-temps · Tour ${turn}/${TURNS}</h2>
  <div class="tm-main" id="tmMain" style="--tc:${COL[w]}">
    <div class="tm-who"><i></i>${esc(cfg.names[w])}${paused ? ` <span class="tm-p">EN PAUSE</span>` : ""}</div>
    <div class="tm-time" id="tmTime">${fmt(remaining())}</div>
    <div class="tm-bar"><i id="tmBar"></i></div>
    <div class="tm-info" id="tmInfo"></div>
    ${st.carry ? `<div class="tm-res2" id="tmRes"></div>` : ""}
  </div>
  <button class="tm-big" data-ta="end">Fin du tour ⏭</button>
  <div class="tm-row">
    <button data-ta="pause">${paused ? "▶ Reprendre" : "⏸ Pause"}</button>
    <button data-ta="undo"${st.log.length && st.log[st.log.length-1].w !== -1 ? "" : " disabled"}>↩ Annuler fin de tour</button>
  </div>
  <div class="tm-row"><button class="tm-stop" data-ta="reset">⏹ Arrêter le match</button></div>
  ${scoreCards()}
  <p class="pnote" id="tmEta"></p>`;
}
function halfView(){
  const w = (st.first + 1) % 2;
  return `<h2 class="group">⏱️ Mi-temps</h2>
  <div class="card tm-card" style="text-align:center"><div style="font-size:40px">🍺</div><p><b>Fin de la 1re mi-temps.</b><br>${esc(cfg.names[w])} reçoit et joue en premier.</p></div>
  <button class="tm-big" data-ta="half">▶ Coup d'envoi 2e mi-temps</button>
  <div class="tm-row"><button data-ta="undo">↩ Annuler fin de tour</button><button class="tm-stop" data-ta="reset">⏹ Arrêter le match</button></div>
  ${scoreCards()}`;
}
function doneView(){
  return `<h2 class="group">🏁 Fin du match</h2>
  <div class="card tm-card" style="text-align:center"><p><b>Durée totale : ${fmtLong(st.matchEnd - st.matchStart)}</b><br><span class="pnote">Commencé à ${clock(st.matchStart)}, fini à ${clock(st.matchEnd)}</span></p></div>
  ${scoreCards()}
  <div class="tm-row"><button data-ta="undo">↩ Annuler fin de tour</button></div>
  <button class="tm-big" data-ta="reset">Nouveau match</button>`;
}
function render(){
  const v = $("#v-match");
  v.innerHTML = st.phase === "setup" ? setupView() : st.phase === "half" ? halfView() : st.phase === "done" ? doneView() : runView();
  tick();
}

// Mise à jour légère, 4 fois par seconde
function tick(){
  const live = st.phase === "running" || st.phase === "paused";
  const pill = $("#pill"), sT = $("#sTimer");
  const showPill = live && !$("#v-match").classList.contains("on");
  document.body.classList.toggle("has-pill", showPill);
  sT.classList.toggle("on", live);
  if (!live) { pill.className = "pill"; return; }
  const w = who(), rem = remaining(), all = allowance();
  // Temps de base d'abord, puis la réserve fond, puis dépassement
  const baseRem = st.base - elapsed(), bank = st.carry ? st.bank[w] : 0;
  const inRes = baseRem <= 0 && rem > 0 && bank > 0;
  const resNow = inRes ? rem : bank;
  const shown = baseRem > 0 ? baseRem : rem;
  const txt = fmt(shown);
  const state = rem <= 0 ? "over" : inRes ? "res" : (rem < 30000 ? "warn" : "");
  // Alertes sonores : 30 s restantes (ou entrée dans la réserve), puis temps écoulé
  if (st.phase === "running") {
    if (inRes && st.warned < 1) { st.warned = 1; save(); beep(1, 660); }
    if (!bank && rem < 30000 && rem > 0 && all > 45000 && st.warned < 1) { st.warned = 1; save(); beep(1); }
    if (rem <= 0 && st.warned < 2) { st.warned = 2; save(); beep(3, 1040); }
  }
  // Pastille flottante
  pill.style.setProperty("--tc", COL[w]);
  pill.className = "pill " + (showPill ? "on " : "") + state + (st.phase === "paused" ? " paused" : "");
  $("#pName").textContent = cfg.names[w] + " · T" + (Math.floor(st.idx/2)+1) + (st.phase === "paused" ? " · pause" : inRes ? " · réserve" : "");
  $("#pTime").innerHTML = esc(txt) + (st.carry && (bank || inRes) && baseRem > 0 ? ` <small>+ ${fmt(resNow)}</small>` : "");
  $("#pPause").textContent = st.phase === "paused" ? "▶" : "⏸";
  // Rappel dans les fiches
  sT.style.setProperty("--tc", COL[w]);
  sT.className = "stimer on " + state;
  sT.innerHTML = `<i></i>${esc(cfg.names[w])} · <b>${txt}</b>${inRes ? " · réserve" : st.carry && bank && baseRem > 0 ? ` <span>+ ${fmt(bank)}</span>` : ""}`;
  // Vue Match
  const t = $("#tmTime"); if (!t) return;
  t.textContent = txt;
  $("#tmMain").className = "tm-main " + state;
  $("#tmBar").style.width = Math.max(0, Math.min(100, (inRes ? rem / bank : baseRem / st.base) * 100)) + "%";
  $("#tmInfo").textContent = rem <= 0 ? "Temps écoulé !" : inRes ? "Temps de base écoulé · la réserve est utilisée" : `Temps de base · ${fmt(st.base)}`;
  const bk = $("#tmBank" + w); if (bk) bk.textContent = fmt(Math.max(0, resNow));
  const r = $("#tmRes");
  if (r) { r.className = "tm-res2" + (inRes ? " on" : "") + (rem <= 0 ? " empty" : ""); r.innerHTML = `<span>🔋 Réserve</span><b>${fmt(Math.max(0, resNow))}</b>${st.cap ? `<small>max ${fmt(st.cap)}</small>` : ""}`; }
  // Fin estimée si chacun utilise tout son temps
  const left = 4 * TURNS - ((st.half - 1) * 2 * TURNS + st.idx) - 1;
  const eta = now() + Math.max(0, rem) + left * st.base + (st.carry ? st.bank[1 - w] : 0);
  $("#tmEta").textContent = `Fin des tours au plus tard vers ${clock(eta)} (sans compter les coups d'envoi${st.half === 1 ? " et la mi-temps" : ""}).`;
}
setInterval(tick, 250);

// ---------- Évènements ----------
document.addEventListener("bb:view", () => tick());
document.addEventListener("click", e => {
  const a = e.target.closest("[data-ta]");
  if (a) { ({start, end:endTurn, pause, undo, half:secondHalf, reset})[a.dataset.ta](); return; }
  const k = e.target.closest("[data-tk]");
  if (k) {
    const d = +k.dataset.d, key = k.dataset.tk;
    const R = { totalMin:[15, 30, 480], setupMin:[5, 0, 60], turnMin:[0.5, 1, 10], cap:[1, 0, 5] }[key];
    cfg[key] = Math.min(R[2], Math.max(R[1], cfg[key] + d * R[0]));
    if (cfg.setupMin > cfg.totalMin - 30) cfg.setupMin = Math.max(0, cfg.totalMin - 30);
    save(); render(); return;
  }
  const s = e.target.closest("[data-ts]");
  if (s) { const k2 = s.dataset.ts; cfg[k2] = k2 === "first" ? +s.dataset.v : s.dataset.v; save(); render(); return; }
  const tg = e.target.closest("[data-tt]");
  if (tg) { cfg[tg.dataset.tt] = !cfg[tg.dataset.tt]; save(); render(); return; }
  if (e.target.closest("#pEnd")) { endTurn(); return; }
  if (e.target.closest("#pPause")) { pause(); return; }
  if (e.target.closest("#pOpen")) { document.querySelector('nav button[data-tab="match"]').click(); }
});
document.addEventListener("input", e => {
  const n = e.target.closest("[data-tn]");
  if (!n) return;
  const i = +n.dataset.tn;
  cfg.names[i] = n.value.trim() || DEF_CFG.names[i]; save();
  const b = document.querySelector(`[data-ts="first"][data-v="${i}"]`); if (b) b.textContent = cfg.names[i];
});
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") { wake(st.phase === "running"); tick(); } });

render();
if (st.phase === "running") wake(true);
})();
