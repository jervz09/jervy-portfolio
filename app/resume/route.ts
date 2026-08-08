const resumeSource = "https://raw.githubusercontent.com/jervz09/jervy-portfolio/main/public/Resume%20-%20Jervy%20Ariola.pdf";

export async function GET() {
  const response = await fetch(resumeSource, { next: { revalidate: 86400 } });
  if (!response.ok) return new Response("Resume is temporarily unavailable.", { status: 502 });

  return new Response(response.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Resume - Jervy Ariola.pdf"',
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
