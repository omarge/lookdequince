"use client";

import { FormEvent, useState } from "react";
import { states } from "@/lib/data";

export default function SubirPage() {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/eventos", { method: "POST", body: form });
    const data = await response.json();
    setMessage(data.message || "Listo.");
    setPending(false);
  }

  return (
    <main>
      <p className="kicker">Subir fiesta</p>
      <h1>La manda la mamá. Nosotros decidimos si entra.</h1>
      <p className="note">Si sale una botella, una pelea o una pose, no se publica. Hace falta la casilla de mamá o papá: las fotos son de una menor.</p>
      <form onSubmit={onSubmit}>
        <input name="title" placeholder="Quince de Renata" required />
        <select name="estado" required defaultValue="morelos">
          {states.map((state) => <option key={state.slug} value={state.slug}>{state.name}</option>)}
        </select>
        <input name="municipio" placeholder="tepoztlan" required />
        <input name="venue" placeholder="Jardín o salón, sin número" required />
        <input name="date" type="date" required />
        <textarea name="note" placeholder="Qué se ve en las fotos" rows={4} />
        <label><input type="checkbox" name="guardian" required /> Mamá o papá autoriza publicar</label>
        <input name="photos" type="file" accept="image/*" multiple required />
        <button disabled={pending}>{pending ? "Revisando" : "Mandar a revisión"}</button>
      </form>
      {message ? <p className="note">{message}</p> : null}
    </main>
  );
}
