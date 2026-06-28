export async function onRequestGet({ params, request }) {
  const base = new URL(request.url).origin;
  const app = params.app;

  const metaUrl = `${base}/meta/apps/${encodeURIComponent(app)}.json`;
  const resp = await fetch(metaUrl, { headers: { "Accept": "application/json" } });

  if (!resp.ok) return new Response("App not found", { status: 404 });

  const data = await resp.json();
  const latest = data?.latest;

  if (!latest || typeof latest !== "string") {
    return new Response("Invalid app meta: missing latest", { status: 500 });
  }

  return Response.redirect(
    `${base}/apk/${encodeURIComponent(app)}/${encodeURIComponent(latest)}.apk`,
    302
  );
}