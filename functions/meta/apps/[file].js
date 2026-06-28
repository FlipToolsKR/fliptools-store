export async function onRequestGet({ params }) {
  const file = params.file;

  if (!file.endsWith(".json")) {
    return new Response("Not found", { status: 404 });
  }

  const upstream =
    "https://flipstore-web.pages.dev/meta/apps/" +
    encodeURIComponent(file);

  const r = await fetch(upstream);
  if (!r.ok) return new Response("Not found", { status: 404 });

  return new Response(r.body, {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      "Pragma": "no-cache",
      "Expires": "0"
    }
  });
}
