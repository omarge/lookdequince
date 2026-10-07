import { neon } from "@neondatabase/serverless";
import { seedEvents, type ZoneEvent } from "./data";

export function dbUrl() {
  return process.env.POSTGRES_URL || process.env.DATABASE_URL || "";
}

export function sql() {
  const url = dbUrl();
  if (!url) return null;
  return neon(url);
}

export async function ensureSchema() {
  const q = sql();
  if (!q) return;
  await q`create table if not exists events (
    id text primary key,
    title text not null,
    estado text not null,
    municipio text not null,
    venue text not null,
    event_date date not null,
    cover_url text not null,
    status text not null default 'pending',
    guardian_ok boolean not null default false,
    note text,
    created_at timestamptz not null default now()
  )`;
  await q`create table if not exists event_photos (
    id text primary key,
    event_id text not null references events(id) on delete cascade,
    url text not null,
    rejected_reason text
  )`;
}

export async function publishedEvents(estado?: string, municipio?: string): Promise<ZoneEvent[]> {
  const q = sql();
  const seed = seedEvents.filter((event) => {
    if (estado && event.estado !== estado) return false;
    if (municipio && event.municipio !== municipio) return false;
    return true;
  });
  if (!q) return seed;
  try {
    await ensureSchema();
    const rows = await q`
      select id, title, estado, municipio, venue, event_date::text as date, cover_url as cover
      from events
      where status = 'published'
        and (${estado ?? null}::text is null or estado = ${estado ?? null})
        and (${municipio ?? null}::text is null or municipio = ${municipio ?? null})
      order by event_date desc
    `;
    const fromDb = rows.map((row) => ({
      id: String(row.id),
      title: String(row.title),
      estado: String(row.estado),
      municipio: String(row.municipio),
      venue: String(row.venue),
      date: String(row.date),
      cover: String(row.cover),
      status: "published" as const,
    }));
    return fromDb.length ? fromDb : seed;
  } catch {
    return seed;
  }
}
