const API_BASE = 'https://v3.football.api-sports.io';
const TIMEZONE = 'America/Argentina/Buenos_Aires';

export default async function handler(req, res) {
  res.setHeader(
    'Cache-Control',
    's-maxage=60, stale-while-revalidate=300'
  );
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({
      error: 'Método no permitido. Usá GET.'
    });
  }

  const key = process.env.API_FOOTBALL_KEY;

  if (!key) {
    return res.status(503).json({
      error: 'Falta configurar API_FOOTBALL_KEY en Vercel.'
    });
  }

  const type = String(req.query.type || 'fixtures');
  const params = new URLSearchParams();
  let endpoint;

  const validNumber = (value) => /^\d+$/.test(String(value));

  if (type === 'fixtures') {
    endpoint = 'fixtures';
    params.set('timezone', TIMEZONE);

    // Consultar un partido concreto para ver sus detalles.
    if (req.query.id != null) {
      const id = String(req.query.id);

      if (!validNumber(id)) {
        return res.status(400).json({
          error: 'El ID del partido no es válido.'
        });
      }

      params.set('id', id);
    } else if (req.query.team != null) {
      // Próximos partidos de un equipo.
      const team = String(req.query.team);

      if (!validNumber(team)) {
        return res.status(400).json({
          error: 'El ID del equipo no es válido.'
        });
      }

      params.set('team', team);

      const next = String(req.query.next || '5');

      if (!validNumber(next) || Number(next) < 1) {
        return res.status(400).json({
          error: 'La cantidad de partidos no es válida.'
        });
      }

      // Mostrar pocos partidos por consulta.
      params.set('next', String(Math.min(Number(next), 5)));
    } else {
      const date = req.query.date;

      if (date != null) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(String(date))) {
          return res.status(400).json({
            error: 'Fecha no válida. Usá AAAA-MM-DD.'
          });
        }

        const parsed = new Date(`${date}T00:00:00Z`);

        if (
          Number.isNaN(parsed.getTime()) ||
          parsed.toISOString().slice(0, 10) !== date
        ) {
          return res.status(400).json({
            error: 'La fecha indicada no existe.'
          });
        }

        params.set('date', String(date));
      } else {
        // Fecha actual de Argentina.
        const parts = new Intl.DateTimeFormat('en-CA', {
          timeZone: TIMEZONE,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }).formatToParts(new Date());

        const get = (name) =>
          parts.find((part) => part.type === name).value;

        params.set(
          'date',
          `${get('year')}-${get('month')}-${get('day')}`
        );
      }
    }
  } else if (type === 'standings') {
    endpoint = 'standings';

    const league = String(req.query.league || '128');
    const season = String(
      req.query.season || new Date().getFullYear()
    );

    if (
      !validNumber(league) ||
      !/^\d{4}$/.test(season)
    ) {
      return res.status(400).json({
        error: 'Liga o temporada no válida.'
      });
    }

    params.set('league', league);
    params.set('season', season);
  } else if (type === 'leagues') {
    // Listar competiciones argentinas disponibles.
    endpoint = 'leagues';
    params.set('country', 'Argentina');

    const season = String(
      req.query.season || new Date().getFullYear()
    );

    if (!/^\d{4}$/.test(season)) {
      return res.status(400).json({
        error: 'La temporada no es válida.'
      });
    }

    params.set('season', season);
  } else {
    return res.status(400).json({
      error: 'Tipo no válido. Usá fixtures, standings o leagues.'
    });
  }

  try {
    const upstream = await fetch(
      `${API_BASE}/${endpoint}?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          'x-apisports-key': key,
          Accept: 'application/json'
        },
        signal: AbortSignal.timeout(12000)
      }
    );

    let data;

    try {
      data = await upstream.json();
    } catch {
      console.error(
        'API-Football devolvió una respuesta no JSON.'
      );

      return res.status(502).json({
        error: 'El proveedor devolvió una respuesta inesperada.'
      });
    }

    if (!upstream.ok) {
      console.error(
        'Error HTTP de API-Football:',
        upstream.status
      );

      return res.status(502).json({
        error: 'API-Football rechazó la solicitud.',
        providerStatus: upstream.status
      });
    }

    if (
      data.errors &&
      Object.keys(data.errors).length > 0
    ) {
      console.error(
        'API-Football informó errores:',
        JSON.stringify(data.errors)
      );

      return res.status(502).json({
        error: 'API-Football informó un error.',
        details: data.errors
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(
      'Error de conexión con API-Football:',
      error.name === 'TimeoutError'
        ? 'Tiempo de espera agotado'
        : error.name || 'Error desconocido'
    );

    return res.status(502).json({
      error:
        error.name === 'TimeoutError'
          ? 'API-Football tardó demasiado en responder.'
          : 'No se pudo conectar con API-Football.'
    });
  }
        }
