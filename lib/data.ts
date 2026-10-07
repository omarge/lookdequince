export type Look = {
  slug: string;
  title: string;
  price: string;
  where: string;
  image: string;
  note: string;
};

export type ZoneEvent = {
  id: string;
  title: string;
  estado: string;
  municipio: string;
  venue: string;
  date: string;
  cover: string;
  status: "published";
};

export const issue = {
  number: "01",
  date: "7 de octubre de 2026",
  kicker: "Para chavas de C y C+",
};

export const looks: Look[] = [
  {
    slug: "misa",
    title: "La de la misa de las 12",
    price: "Renta 4,500–6,500",
    where: "Liverpool o renta de colonia",
    image: "/looks/salon.jpg",
    note: "Rosa polvo, moño bajo, arete de argolla. Se ve en foto de día y no pide vestido de 20 mil.",
  },
  {
    slug: "salon",
    title: "La que se guardan",
    price: "Renta 5,000–7,000",
    where: "Salón con lámpara cálida",
    image: "/looks/salon.jpg",
    note: "Satín champaña y saco corto. Es la que la mamá manda al grupo de cotizaciones.",
  },
  {
    slug: "azotea",
    title: "La que sí me la creo",
    price: "Renta 4,000–6,000",
    where: "Azotea o jardín",
    image: "/looks/azotea.jpg",
    note: "Tul rosa y tenis blancos. Para la entrada de tarde, no para el vals.",
  },
];

export const day = [
  { time: "7:40", title: "Encuesta", body: "¿El vestido de la prima: renta o compra? En este nivel gana la renta." },
  { time: "8:10", title: "Tres looks", body: "Misa, salón y azotea. Precio en pesos, no en pasarela." },
  { time: "11:00", title: "Maquillaje de iglesia", body: "Base que no sale naranja, rubor líquido, pestaña. Tope: 400 pesos. Maybelline, NYX o Bissú." },
  { time: "14:30", title: "Test", body: "Qué entrada eres: jardín, salón con luces, o mesa de postres." },
  { time: "17:00", title: "La mamá", body: "Negocia la hora extra, el pastel de los niños y la prueba de maquillaje. No negocies el vals de regalo." },
  { time: "20:10", title: "El de la prepa", body: "Si vas a su partido, no le escribas durante. La foto va al día siguiente, sin el “pensé en ti”." },
];

export const seedEvents: ZoneEvent[] = [
  {
    id: "tepo-renata",
    title: "Quince de Renata",
    estado: "morelos",
    municipio: "tepoztlan",
    venue: "Jardín del centro",
    date: "2026-03-14",
    cover: "/looks/azotea.jpg",
    status: "published",
  },
  {
    id: "coyo-luna",
    title: "Quince de Luna",
    estado: "ciudad-de-mexico",
    municipio: "coyoacan",
    venue: "Salón de Coyoacán",
    date: "2026-02-21",
    cover: "/looks/salon.jpg",
    status: "published",
  },
];

export const states = [
  { slug: "morelos", name: "Morelos", towns: [{ slug: "tepoztlan", name: "Tepoztlán" }, { slug: "cuernavaca", name: "Cuernavaca" }] },
  { slug: "ciudad-de-mexico", name: "Ciudad de México", towns: [{ slug: "coyoacan", name: "Coyoacán" }, { slug: "naucalpan", name: "Naucalpan" }] },
  { slug: "estado-de-mexico", name: "Estado de México", towns: [{ slug: "naucalpan", name: "Naucalpan" }, { slug: "tlalnepantla", name: "Tlalnepantla" }] },
];

export function label(slug: string) {
  return slug.replace(/-/g, " ");
}
