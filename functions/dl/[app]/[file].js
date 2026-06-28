export async function onRequestGet({ params }) {
  const app = params.app;

  // app meta에서 latest 버전 읽기
  const metaUrl =
    "https://flipstore-web.pages.dev/meta/apps/" +
    encodeURIComponent(app) + ".json";

  const m = await fetch(metaUrl);
  if (!m.ok) return new Response("App not found", { status: 404 });

  const data = await m.json();
  const latest = data.latest;
  if (!latest) return new Response("No latest", { status: 404 });

  const file = latest + ".apk";
  const upstream =
    "https://flipstore-web.pages.dev/apk/" +
    encodeURIComponent(app) + "/" + file;

  const r = await fetch(upstream);
  if (!r.ok) return new Response("Not found", { status: 404 });

  const binName = app + "-" + latest + ".apk.bin";

  return new Response(r.body, {
    status: 200,
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${binName}"`,
      "Cache-Control": "public, max-age=3600",
      "X-Content-Type-Options": "nosniff"
    }
  });
}