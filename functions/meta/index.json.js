export async function onRequestGet() {
  const upstream =
    "https://flipstore-web.pages.dev/meta/index.json";

  const r = await fetch(upstream);
  if (!r.ok) return new Response("Upstream error", { status: 502 });

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
