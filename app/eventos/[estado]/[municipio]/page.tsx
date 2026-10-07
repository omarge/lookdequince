import { label } from "@/lib/data";
import { publishedEvents } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function TownPage({
  params,
}: {
  params: Promise<{ estado: string; municipio: string }>;
}) {
  const { estado, municipio } = await params;
  const events = await publishedEvents(estado, municipio);
  return (
    <main>
      <p className="kicker">{label(estado)}</p>
      <h1>Quinceañeras en {label(municipio)}</h1>
      <section className="cards">
        {events.length === 0 ? <p>Todavía no hay una fiesta publicada en este pueblo.</p> : null}
        {events.map((event) => (
          <article className="card" key={event.id}>
            <img src={event.cover} alt={event.title} />
            <div>
              <p className="price">{event.date}</p>
              <h2>{event.title}</h2>
              <p>{event.venue}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
