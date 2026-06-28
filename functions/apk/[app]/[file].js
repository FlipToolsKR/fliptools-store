export async function onRequestGet({ params }) {
  const app = params.app;
  const file = params.file;

  // .apk만
  if (!/\.apk$/i.test(file)) return new Response("Not found", { status: 404 });

  // upstream: fliptools-store repo의 apk 폴더를 raw로
  const upstream =
    "https://github.com/FlipToolsKR/fliptools-files/apk/" +
    encodeURIComponent(app) + "/" + encodeURIComponent(file);

  const r = await fetch(upstream);
  if (!r.ok) return new Response("Not found", { status: 404 });

  // attachment로 강제
  return new Response(r.body, {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.android.package-archive",
      "Content-Disposition": `attachment; filename="${file}"`,
      "Cache-Control": "public, max-age=3600"
    }
  });
}