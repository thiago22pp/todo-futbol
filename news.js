export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=900');
  const key = process.env.GNEWS_API_KEY;
  if (!key) return res.status(503).json({ error: 'Falta configurar GNEWS_API_KEY en Vercel.' });
  try {
    const url = new URL('https://gnews.io/api/v4/search');
    url.searchParams.set('q', 'fútbol OR futbol OR soccer');
    url.searchParams.set('lang', 'es');
    url.searchParams.set('country', 'ar');
    url.searchParams.set('max', '6');
    url.searchParams.set('apikey', key);
    const upstream = await fetch(url);
    const data = await upstream.json();
    if (!upstream.ok) return res.status(upstream.status).json({ error: 'El proveedor de noticias respondió con un error.' });
    return res.status(200).json({
      articles: (data.articles || []).map(a => ({
        title: a.title, description: a.description, url: a.url,
        image: a.image, source: a.source?.name
      }))
    });
  } catch {
    return res.status(502).json({ error: 'No se pudo conectar con el proveedor de noticias.' });
  }
}
