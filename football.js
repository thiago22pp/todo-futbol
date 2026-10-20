export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
  const key = process.env.API_FOOTBALL_KEY;
  if (!key) return res.status(503).json({ error: 'Falta configurar API_FOOTBALL_KEY en Vercel.' });
  const type = String(req.query.type || 'fixtures');
  let endpoint = '';
  if (type === 'fixtures') {
    const date = req.query.date || new Date().toISOString().slice(0, 10);
    endpoint = `fixtures?date=${encodeURIComponent(date)}&timezone=America%2FArgentina%2FBuenos_Aires`;
  } else if (type === 'standings') {
    const league = req.query.league || '128';
    const season = req.query.season || String(new Date().getFullYear());
    endpoint = `standings?league=${encodeURIComponent(league)}&season=${encodeURIComponent(season)}`;
  } else {
    return res.status(400).json({ error: 'Tipo no válido. Usá fixtures o standings.' });
  }
  try {
    const upstream = await fetch(`https://v3.football.api-sports.io/${endpoint}`, {
      headers: { 'x-apisports-key': key }
    });
    const data = await upstream.json();
    if (!upstream.ok) return res.status(upstream.status).json({ error: 'El proveedor deportivo respondió con un error.' });
    if (data.errors && Object.keys(data.errors).length) {
      return res.status(502).json({ error: 'La API deportiva rechazó la solicitud. Revisá la clave, cobertura y límites.' });
    }
    return res.status(200).json(data);
  } catch {
    return res.status(502).json({ error: 'No se pudo conectar con el proveedor deportivo.' });
  }
}
