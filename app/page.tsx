import Link from "next/link";
import { day, issue, looks } from "@/lib/data";

export default function HomePage() {
  return (
    <main>
      <p className="kicker">Número {issue.number} · {issue.date} · {issue.kicker}</p>
      <h1>Renta. El dinero se va en la foto, que es lo que queda.</h1>
      <p className="lead">Un lunes para la chava de prepa cuya mamá ya pidió cotización. Fiesta de 100 mil a 200 mil. Nada de pasarela.</p>
      <section className="cards">
        {looks.map((look) => (
          <article className="card" key={look.slug}>
            <img src={look.image} alt={look.title} />
            <div>
              <p className="price">{look.price}</p>
              <h2>{look.title}</h2>
              <p>{look.note}</p>
            </div>
          </article>
        ))}
      </section>
      <section>
        <p className="kicker">El día</p>
        <div className="day">
          {day.map((item) => (
            <article className="slot" key={item.time}>
              <p className="price">{item.time}</p>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>
      <p style={{ marginTop: 28 }}>
        <Link className="button" href="/eventos">Ver fiestas por zona</Link>
      </p>
    </main>
  );
}
