export async function onRequestGet({ params }) {
  const file = params.file;

  if (!/\.(png|jpg|jpeg|webp|svg)$/i.test(file)) {
    return new Response("Not found", { status: 404 });
  }

  const upstream =
    "https://flipstore-web.pages.dev/meta/icons/" +
    encodeURIComponent(file);

  const r = await fetch(upstream);
  if (!r.ok) return new Response("Not found", { status: 404 });

  const ext = file.split(".").pop().toLowerCase();
  const typeMap = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    webp: "image/webp",
    svg: "image/svg+xml",
  };

  return new Response(r.body, {
    status: 200,
    headers: {
      "Content-Type": typeMap[ext] || "application/octet-stream",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
