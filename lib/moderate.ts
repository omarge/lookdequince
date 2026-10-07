const blocked = [
  "borracho",
  "borrachos",
  "pelea",
  "pleito",
  "sexo",
  "desnuda",
  "desnudo",
  "beso",
  "cerveza",
  "shot",
  "falda levantada",
];

export function rejection(note: string) {
  const text = note.toLowerCase();
  const hit = blocked.find((word) => text.includes(word));
  if (hit) return `No entra: la nota menciona “${hit}”.`;
  return null;
}
