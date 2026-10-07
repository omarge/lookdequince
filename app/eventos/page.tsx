import Link from "next/link";
import { states } from "@/lib/data";
import { publishedEvents } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function EventosPage() {
  const events = await publishedEvents();
  return (
    <main>
      <p className="kicker">Eventos</p>
      <h1>La fiesta, por pueblo.</h1>
      <p className="lead">Una de Tepoztlán no le sirve a la de Coyoacán. Aquí solo entra lo que ya pasó revisión.</p>
      <section className="cards">
        {states.map((state) => (
          <article className="zone" key={state.slug}>
            <h2>{state.name}</h2>
            {state.towns.map((town) => (
              <p key={town.slug}>
                <Link href={`/eventos/${state.slug}/${town.slug}`}>{town.name}</Link>
              </p>
            ))}
          </article>
        ))}
      </section>
      <section className="cards">
        {events.map((event) => (
          <article className="card" key={event.id}>
            <img src={event.cover} alt={event.title} />
            <div>
              <p className="price">{event.municipio} · {event.date}</p>
              <h2>{event.title}</h2>
              <p>{event.venue}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
