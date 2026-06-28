export async function onRequestGet({ params }) {
  const app = params.app;

  const metaUrl =
    "https://flipstore-web.pages.dev/meta/apps/" +
    encodeURIComponent(app) + ".json";

  const m = await fetch(metaUrl);
  if (!m.ok) return new Response("meta not found", { status: 404 });

  const data = await m.json();
  const latest = data.latest;
  if (!latest) return new Response("no latest", { status: 404 });

  // ⭐ 여기서 릴리즈 URL로 바로 보내기
  const url = "https://flipstore-web.pages.dev/apk" +
              encodeURIComponent(app + "/" + latest + ".apk");

  return new Response(null, { status: 302, headers: { Location: url } });
}