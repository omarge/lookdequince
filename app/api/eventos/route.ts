import { put } from "@vercel/blob";
import { randomUUID } from "crypto";
import { ensureSchema, sql } from "@/lib/db";
import { rejection } from "@/lib/moderate";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const form = await request.formData();
  const title = String(form.get("title") || "").slice(0, 80);
  const estado = String(form.get("estado") || "").slice(0, 40);
  const municipio = String(form.get("municipio") || "").slice(0, 40);
  const venue = String(form.get("venue") || "").slice(0, 80);
  const date = String(form.get("date") || "");
  const note = String(form.get("note") || "").slice(0, 400);
  const guardian = form.get("guardian");
  if (!title || !estado || !municipio || !venue || !date || !guardian) {
    return Response.json({ message: "Faltan datos o la autorización de mamá o papá." }, { status: 400 });
  }
  const blocked = rejection(`${title} ${note} ${venue}`);
  if (blocked) return Response.json({ message: blocked }, { status: 400 });

  const files = form.getAll("photos").filter((item): item is File => item instanceof File && item.size > 0);
  if (files.length < 1 || files.length > 12) {
    return Response.json({ message: "Sube de 1 a 12 fotos." }, { status: 400 });
  }

  const q = sql();
  if (!q || !process.env.BLOB_READ_WRITE_TOKEN) {
    return Response.json({
      message: "La ficha está bien. Falta conectar Postgres y Blob de Vercel para guardarla. El número 01 ya está publicado con las fiestas de muestra.",
    });
  }

  await ensureSchema();
  const id = randomUUID();
  const urls: string[] = [];
  for (const file of files) {
    const blob = await put(`eventos/${id}/${file.name}`, file, { access: "public" });
    urls.push(blob.url);
  }
  await q`
    insert into events (id, title, estado, municipio, venue, event_date, cover_url, status, guardian_ok, note)
    values (${id}, ${title}, ${estado}, ${municipio}, ${venue}, ${date}, ${urls[0]}, 'pending', true, ${note})
  `;
  for (const url of urls) {
    await q`insert into event_photos (id, event_id, url) values (${randomUUID()}, ${id}, ${url})`;
  }
  return Response.json({ message: "Quedó en revisión. No se publica hasta que pase el filtro." });
}
