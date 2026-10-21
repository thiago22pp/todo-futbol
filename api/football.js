<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#07140f">
<meta name="description" content="Todo Fútbol: partidos reales, resultados y tablas de posiciones.">
<title>Todo Fútbol | Resultados en vivo</title>

<style>
:root {
  --bg:#07140f;
  --panel:#10231a;
  --panel2:#142b20;
  --text:#f4f7f4;
  --muted:#a5b6aa;
  --green:#9cff57;
  --line:#284536;
  --orange:#ffb45d;
}
* {box-sizing:border-box}
html {scroll-behavior:smooth}
body {
  margin:0;background:var(--bg);color:var(--text);
  font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif
}
a {color:inherit;text-decoration:none}
button,input,select {font:inherit}
button {cursor:pointer}
.wrap {width:min(1120px,94%);margin:auto}
header {
  position:sticky;top:0;z-index:10;background:#07140fee;
  border-bottom:1px solid var(--line);backdrop-filter:blur(12px)
}
.nav {
  min-height:65px;display:flex;align-items:center;
  justify-content:space-between;gap:12px
}
.brand {font-size:1.15rem;font-weight:950}
.brand span {color:var(--green)}
.navlinks {display:flex;gap:17px;color:var(--muted);font-size:.9rem}
.navlinks a:hover {color:var(--green)}
.menu {display:none}
button,.btn {
  border:1px solid var(--line);border-radius:10px;
  padding:10px 13px;background:var(--panel2);color:var(--text)
}
.primary {background:var(--green);color:#102014;font-weight:850;border:0}
.hero {padding:35px 0 25px}
.eyebrow,.label {
  color:var(--green);font-size:.76rem;font-weight:900;
  letter-spacing:1px;text-transform:uppercase
}
h1 {font-size:clamp(2.5rem,8vw,4.6rem);line-height:1;margin:15px 0}
h1 span {color:var(--green)}
p {line-height:1.55}
.muted {color:var(--muted)}
.panel {
  background:var(--panel);border:1px solid var(--line);
  border-radius:16px;padding:16px
}
.section {padding:24px 0}
.section-head {
  display:flex;justify-content:space-between;
  align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:15px
}
h2 {margin:5px 0;font-size:1.65rem}
.controls {display:flex;gap:8px;flex-wrap:wrap;margin:15px 0}
input,select {
  min-width:0;background:var(--bg);color:var(--text);
  border:1px solid var(--line);border-radius:10px;padding:11px
}
.search {display:flex;gap:8px;flex:1;min-width:230px}
.search input {flex:1;width:100%}
.tabs {display:flex;gap:7px;flex-wrap:wrap;margin:15px 0}
.tab.active {background:var(--green);color:#102014;font-weight:900}
.grid {
  display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px
}
.match {min-width:0}
.league {
  color:var(--muted);font-size:.8rem;
  display:flex;justify-content:space-between;gap:8px;margin-bottom:15px
}
.league b {color:var(--green)}
.teams {display:flex;align-items:center;justify-content:space-between;gap:6px}
.team {flex:1;min-width:0;text-align:center;font-size:.88rem;font-weight:800}
.team img {width:36px;height:36px;object-fit:contain;display:block;margin:0 auto 7px}
.vs {color:var(--muted);font-size:.8rem}
.score {font-size:1.35rem;font-weight:950;white-space:nowrap}
.meta {
  border-top:1px solid var(--line);margin-top:14px;padding-top:11px;
  color:var(--muted);font-size:.78rem;display:flex;
  justify-content:space-between;gap:8px;flex-wrap:wrap
}
.status {color:var(--orange);font-weight:800}
.error {color:#ffb4a8}
.empty {text-align:center;padding:30px 12px;color:var(--muted)}
.table-wrap {overflow-x:auto}
table {border-collapse:collapse;width:100%;min-width:400px;font-size:.88rem}
th,td {text-align:left;padding:12px 9px;border-bottom:1px solid var(--line)}
th {color:var(--muted);font-size:.75rem}
td:last-child,th:last-child {text-align:right}
.club {font-weight:800;white-space:nowrap}
.club img {width:23px;height:23px;object-fit:contain;vertical-align:middle;margin-right:5px}
footer {margin-top:30px;border-top:1px solid var(--line);padding:24px 0;color:var(--muted);font-size:.82rem}
[hidden] {display:none!important}

@media(max-width:760px) {
  .grid {grid-template-columns:repeat(2,minmax(0,1fr))}
  .navlinks {display:none}
  .navlinks.open {
    display:flex;position:absolute;top:60px;left:3%;right:3%;
    padding:17px;background:var(--panel);border:1px solid var(--line);
    border-radius:13px;flex-direction:column
  }
  .menu {display:block}
}
@media(max-width:440px) {
  .grid {grid-template-columns:1fr}
  .section {padding:18px 0}
  .panel {padding:13px}
  .search {min-width:100%}
}
</style>
</head>

<body>
<header>
  <div class="wrap nav">
    <a class="brand" href="#inicio">⚽ TODO <span>FÚTBOL</span></a>
    <nav class="navlinks" id="navlinks">
      <a href="#partidos">Partidos</a>
      <a href="#tabla">Posiciones</a>
      <a href="#favoritos">Mi equipo</a>
    </nav>
    <button class="menu" id="menuBtn">☰ Menú</button>
  </div>
</header>

<main class="wrap" id="inicio">
  <section class="hero">
    <div class="eyebrow">● Fútbol en un solo lugar</div>
    <h1>Viví el <span>fútbol</span><br>como nunca.</h1>
    <p class="muted">Buscá a Boca, River, la Liga Argentina y equipos de todo el mundo. Consultá resultados y posiciones con datos del proveedor deportivo.</p>
    <div class="controls">
      <a class="btn primary" href="#partidos">Ver partidos ↓</a>
      <a class="btn" href="#tabla">Tabla de posiciones</a>
    </div>
  </section>

  <section class="section" id="partidos">
    <div class="section-head">
      <div>
        <div class="label">Calendario</div>
        <h2>Partidos y resultados</h2>
      </div>
      <button id="refreshBtn" class="primary">↻ Actualizar</button>
    </div>

    <div class="panel">
      <form id="searchForm" class="search">
        <input id="searchInput" placeholder="Buscar Boca, River, Real Madrid..." aria-label="Buscar equipo">
        <button class="primary">Buscar</button>
      </form>

      <div class="controls">
        <select id="leagueSelect" aria-label="Competición">
          <option value="128">Liga Argentina</option>
          <option value="39">Premier League</option>
          <option value="140">La Liga de España</option>
          <option value="135">Serie A de Italia</option>
          <option value="78">Bundesliga</option>
          <option value="61">Ligue 1</option>
          <option value="2">Champions League</option>
          <option value="13">Copa Libertadores</option>
        </select>
        <select id="seasonSelect" aria-label="Temporada">
          <option value="2026">Temporada 2026</option>
          <option value="2025">Temporada 2025</option>
        </select>
      </div>

      <div class="tabs" id="tabs">
        <button class="tab active" data-filter="todos">Todos</button>
        <button class="tab" data-filter="hoy">Hoy</button>
        <button class="tab" data-filter="proximos">Próximos</button>
        <button class="tab" data-filter="finalizados">Finalizados</button>
      </div>

      <p id="dataStatus" class="muted">Cargando partidos reales...</p>
    </div>

    <div id="matchGrid" class="grid" style="margin-top:14px"></div>
  </section>

  <section class="section" id="tabla">
    <div class="label">Clasificación oficial</div>
    <h2>Tabla de posiciones</h2>
    <p class="muted">Elegí una competición y una temporada para consultar su clasificación.</p>

    <div class="panel">
      <button id="loadTableBtn" class="primary">Cargar posiciones</button>
      <p id="tableStatus" class="muted">Esperando datos...</p>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>#</th><th>Equipo</th><th>PJ</th><th>DG</th><th>Pts</th></tr>
          </thead>
          <tbody id="tableBody"></tbody>
        </table>
      </div>
    </div>
  </section>

  <section class="section" id="favoritos">
    <div class="label">Personalizá tu página</div>
    <h2>Tu equipo favorito</h2>
    <div class="panel">
      <form id="favForm" class="search">
        <input id="favInput" placeholder="Ej.: Boca Juniors">
        <button class="primary">Guardar</button>
      </form>
      <p id="favStatus" class="muted">Elegí un equipo para encontrarlo más fácilmente.</p>
    </div>
  </section>
</main>

<footer>
  <div class="wrap">
    ⚽ TODO FÚTBOL · Resultados y posiciones sujetos a la disponibilidad de la API.
  </div>
</footer>

<script>
const $ = id => document.getElementById(id);
let matches = [];
let activeFilter = 'todos';
let searchTerm = '';
let favorite = '';

function todayLocal() {
  const d = new Date();
  return [
    d.getFullYear(),
    String(d.getMonth()+1).padStart(2,'0'),
    String(d.getDate()).padStart(2,'0')
  ].join('-');
}

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, c => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;',
    '"':'&quot;', "'":'&#39;'
  })[c]);
}

function matchState(m) {
  const short = m.fixture?.status?.short || '';
  if (['FT','AET','PEN','PST','CANC','ABD','AWD','WO'].includes(short))
    return 'finalizados';
  const date = String(m.fixture?.date || '').slice(0,10);
  if (date === todayLocal()) return 'hoy';
  return 'proximos';
}

function formatDate(value) {
  if (!value) return 'Horario por confirmar';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return 'Horario por confirmar';
  return new Intl.DateTimeFormat('es-AR',{
    dateStyle:'short',timeStyle:'short'
  }).format(d);
}

function renderMatches() {
  const grid = $('matchGrid');
  const filtered = matches.filter(m => {
    const home = m.teams?.home || {};
    const away = m.teams?.away || {};
    const league = m.league?.name || '';
    const haystack = `${home.name||''} ${away.name||''} ${league}`.toLocaleLowerCase('es');
    const queryOk = !searchTerm || haystack.includes(searchTerm);
    const stateOk = activeFilter === 'todos' || matchState(m) === activeFilter;
    const favOk = !favorite || !searchTerm ||
      haystack.includes(favorite) || haystack.includes(searchTerm);
    return queryOk && stateOk && favOk;
  });

  if (!filtered.length) {
    grid.innerHTML = '<div class="panel empty" style="grid-column:1/-1">No hay partidos que coincidan con tu búsqueda y estos filtros. Probá otra fecha o competición.</div>';
    return;
  }

  grid.innerHTML = filtered.map(m => {
    const h = m.teams?.home || {};
    const a = m.teams?.away || {};
    const goals = m.goals || {};
    const status = m.fixture?.status || {};
    const live = ['1H','2H','HT','ET','P','LIVE'].includes(status.short);
    const finished = matchState(m) === 'finalizados';
    const score = goals.home != null && goals.away != null
      ? `${goals.home} - ${goals.away}` : 'VS';
    const stateLabel = live ? 'EN VIVO' :
      finished ? 'FINALIZADO' :
      matchState(m) === 'hoy' ? 'HOY' : 'PRÓXIMO';

    return `<article class="panel match">
      <div class="league">
        <span>${escapeHTML(m.league?.country || '')} · ${escapeHTML(m.league?.name || 'Fútbol')}</span>
        <b>${stateLabel}</b>
      </div>
      <div class="teams">
        <div class="team">
          ${h.logo ? `<img src="${escapeHTML(h.logo)}" alt="">` : '⚽'}
          <div>${escapeHTML(h.name || 'Local')}</div>
        </div>
        <div class="score">${score}</div>
        <div class="team">
          ${a.logo ? `<img src="${escapeHTML(a.logo)}" alt="">` : '⚽'}
          <div>${escapeHTML(a.name || 'Visitante')}</div>
        </div>
      </div>
      <div class="meta">
        <span>${formatDate(m.fixture?.date)}</span>
        <span>${escapeHTML(status.elapsed ? status.elapsed + "'" : status.long || stateLabel)}</span>
      </div>
    </article>`;
  }).join('');
}

async function api(path) {
  const response = await fetch(path, {cache:'no-store'});
  let data;
  try { data = await response.json(); }
  catch { throw new Error('La API devolvió una respuesta inválida.'); }

  if (!response.ok) throw new Error(data.error || 'Error al consultar los datos.');
  if (data.errors && Object.keys(data.errors).length)
    throw new Error('La API rechazó la consulta. Revisá la clave y los límites.');
  return data;
}

async function loadFixtures() {
  $('dataStatus').textContent = 'Consultando partidos reales...';
  $('dataStatus').className = 'muted';
  $('matchGrid').innerHTML = '';

  try {
    const date = todayLocal();
    const data = await api(
      `/api/football?type=fixtures&date=${encodeURIComponent(date)}`
    );

    matches = Array.isArray(data.response) ? data.response : [];

    if (!matches.length) {
      $('dataStatus').textContent = 'No se encontraron partidos para hoy. Probá buscar por equipo o cambiar la fecha.';
      renderMatches();
      return;
    }

    $('dataStatus').textContent = `Se cargaron ${matches.length} partidos reales de hoy.`;
    renderMatches();
  } catch (error) {
    matches = [];
    $('dataStatus').textContent = error.message +
      ' Verificá que exista /api/football y que la clave de API esté configurada en Vercel.';
    $('dataStatus').className = 'error';
    $('matchGrid').innerHTML =
      '<div class="panel empty" style="grid-column:1/-1">No se pudieron cargar los partidos. No se mostrarán resultados inventados.</div>';
  }
}

async function searchTeam() {
  const q = $('searchInput').value.trim().toLocaleLowerCase('es');
  searchTerm = q;
  activeFilter = 'todos';
  document.querySelectorAll('.tab').forEach(t =>
    t.classList.toggle('active', t.dataset.filter === 'todos')
  );

  if (!q) {
    renderMatches();
    $('dataStatus').textContent = 'Mostrando todos los partidos cargados.';
    return;
  }

  let local = matches.filter(m => {
    const names = `${m.teams?.home?.name||''} ${m.teams?.away?.name||''}`.toLocaleLowerCase('es');
    return names.includes(q);
  });

  if (local.length) {
    renderMatches();
    $('dataStatus').textContent = `Encontré ${local.length} partido(s) entre los cargados.`;
    $('partidos').scrollIntoView({behavior:'smooth'});
    return;
  }

  $('dataStatus').textContent = 'Buscando el equipo en la API...';

  try {
    const data = await api(
      `/api/football?type=fixtures&date=${encodeURIComponent(todayLocal())}`
    );
    matches = Array.isArray(data.response) ? data.response : [];
    renderMatches();

    const count = matches.filter(m =>
      `${m.teams?.home?.name||''} ${m.teams?.away?.name||''}`
        .toLocaleLowerCase('es').includes(q)
    ).length;

    $('dataStatus').textContent = count
      ? `Encontré ${count} partido(s) para tu búsqueda.`
      : 'No aparece ese equipo entre los partidos de hoy. Para encontrar el próximo partido de Boca, hace falta una búsqueda de equipo por ID en el servidor.';
  } catch (error) {
    $('dataStatus').textContent = error.message;
  }
  $('partidos').scrollIntoView({behavior:'smooth'});
}

async function loadStandings() {
  $('tableStatus').textContent = 'Cargando clasificación oficial...';
  $('tableBody').innerHTML = '';

  try {
    const league = $('leagueSelect').value;
    const season = $('seasonSelect').value;
    const data = await api(
      `/api/football?type=standings&league=${encodeURIComponent(league)}&season=${encodeURIComponent(season)}`
    );

    const standings = data.response?.[0]?.league?.standings?.[0] || [];
    if (!standings.length) {
      $('tableStatus').textContent = 'No hay tabla disponible para esta competición y temporada.';
      return;
    }

    $('tableBody').innerHTML = standings.map(row => `
      <tr>
        <td>${escapeHTML(row.rank)}</td>
        <td class="club">
          ${row.team?.logo ? `<img src="${escapeHTML(row.team.logo)}" alt="">` : '⚽'}
          ${escapeHTML(row.team?.name || 'Equipo')}
        </td>
        <td>${escapeHTML(row.all?.played ?? 0)}</td>
        <td>${escapeHTML(row.goalsDiff ?? 0)}</td>
        <td><b>${escapeHTML(row.points ?? 0)}</b></td>
      </tr>
    `).join('');

    $('tableStatus').textContent = `Clasificación real · ${data.response[0].league.name} · Temporada ${season}.`;
  } catch (error) {
    $('tableStatus').textContent = error.message +
      ' Revisá la configuración de /api/football en Vercel.';
  }
}

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    activeFilter = tab.dataset.filter;
    document.querySelectorAll('.tab').forEach(t =>
      t.classList.toggle('active', t === tab)
    );
    renderMatches();
  });
});

$('searchForm').addEventListener('submit', e => {
  e.preventDefault();
  searchTeam();
});

$('refreshBtn').addEventListener('click', loadFixtures);
$('loadTableBtn').addEventListener('click', loadStandings);
$('leagueSelect').addEventListener('change', loadStandings);
$('seasonSelect').addEventListener('change', loadStandings);

$('favForm').addEventListener('submit', e => {
  e.preventDefault();
  favorite = $('favInput').value.trim().toLocaleLowerCase('es');
  $('favStatus').textContent = favorite
    ? `Equipo favorito guardado en esta sesión: ${$('favInput').value.trim()}.`
    : 'Escribí el nombre de tu equipo.';
  searchTerm = favorite;
  $('searchInput').value = favorite;
  searchTeam();
});

$('menuBtn').addEventListener('click', () =>
  $('navlinks').classList.toggle('open')
);

document.querySelectorAll('#navlinks a').forEach(a =>
  a.addEventListener('click', () => $('navlinks').classList.remove('open'))
);

loadFixtures();
loadStandings();
</script>
</body>
  </html><!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#07140f">
<meta name="description" content="Todo Fútbol: partidos reales, resultados y tablas de posiciones.">
<title>Todo Fútbol | Resultados en vivo</title>

<style>
:root {
  --bg:#07140f;
  --panel:#10231a;
  --panel2:#142b20;
  --text:#f4f7f4;
  --muted:#a5b6aa;
  --green:#9cff57;
  --line:#284536;
  --orange:#ffb45d;
}
* {box-sizing:border-box}
html {scroll-behavior:smooth}
body {
  margin:0;background:var(--bg);color:var(--text);
  font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif
}
a {color:inherit;text-decoration:none}
button,input,select {font:inherit}
button {cursor:pointer}
.wrap {width:min(1120px,94%);margin:auto}
header {
  position:sticky;top:0;z-index:10;background:#07140fee;
  border-bottom:1px solid var(--line);backdrop-filter:blur(12px)
}
.nav {
  min-height:65px;display:flex;align-items:center;
  justify-content:space-between;gap:12px
}
.brand {font-size:1.15rem;font-weight:950}
.brand span {color:var(--green)}
.navlinks {display:flex;gap:17px;color:var(--muted);font-size:.9rem}
.navlinks a:hover {color:var(--green)}
.menu {display:none}
button,.btn {
  border:1px solid var(--line);border-radius:10px;
  padding:10px 13px;background:var(--panel2);color:var(--text)
}
.primary {background:var(--green);color:#102014;font-weight:850;border:0}
.hero {padding:35px 0 25px}
.eyebrow,.label {
  color:var(--green);font-size:.76rem;font-weight:900;
  letter-spacing:1px;text-transform:uppercase
}
h1 {font-size:clamp(2.5rem,8vw,4.6rem);line-height:1;margin:15px 0}
h1 span {color:var(--green)}
p {line-height:1.55}
.muted {color:var(--muted)}
.panel {
  background:var(--panel);border:1px solid var(--line);
  border-radius:16px;padding:16px
}
.section {padding:24px 0}
.section-head {
  display:flex;justify-content:space-between;
  align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:15px
}
h2 {margin:5px 0;font-size:1.65rem}
.controls {display:flex;gap:8px;flex-wrap:wrap;margin:15px 0}
input,select {
  min-width:0;background:var(--bg);color:var(--text);
  border:1px solid var(--line);border-radius:10px;padding:11px
}
.search {display:flex;gap:8px;flex:1;min-width:230px}
.search input {flex:1;width:100%}
.tabs {display:flex;gap:7px;flex-wrap:wrap;margin:15px 0}
.tab.active {background:var(--green);color:#102014;font-weight:900}
.grid {
  display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px
}
.match {min-width:0}
.league {
  color:var(--muted);font-size:.8rem;
  display:flex;justify-content:space-between;gap:8px;margin-bottom:15px
}
.league b {color:var(--green)}
.teams {display:flex;align-items:center;justify-content
