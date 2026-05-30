import { Resend } from "resend";
import { NextResponse } from "next/server";

const rateMap = new Map<string, { count: number; resetAt: number }>();

function strip(s: string): string {
  return s.replace(/<[^>]*>/g, "");
}

export async function POST(req: Request) {
  if (!req.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Unsupported media type." }, { status: 415 });
  }

  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (contentLength > 10240) {
    return NextResponse.json({ error: "Payload too large." }, { status: 413 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (entry && now < entry.resetAt) {
    if (entry.count >= 5) {
      return NextResponse.json(
        { error: "Muitas tentativas. Tente novamente em 1 minuto." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }
    entry.count++;
  } else {
    rateMap.set(ip, { count: 1, resetAt: now + 60_000 });
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Corpo inválido." }, { status: 400 });
  }

  // Honeypot: bots preenchem campos ocultos, humanos não
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const { nome, email, telefone, mensagem } = body as Record<string, string>;

  if (!nome?.trim() || !email?.trim() || !mensagem?.trim()) {
    return NextResponse.json(
      { error: "Campos obrigatórios ausentes." },
      { status: 400 }
    );
  }
  if (nome.length > 100) {
    return NextResponse.json({ error: "Nome muito longo." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
  }
  if (telefone && telefone.length > 20) {
    return NextResponse.json({ error: "Telefone inválido." }, { status: 400 });
  }
  if (mensagem.length > 2000) {
    return NextResponse.json({ error: "Mensagem muito longa." }, { status: 400 });
  }

  const nomeSafe = strip(nome.trim());
  const emailSafe = strip(email.trim());
  const telefoneSafe = telefone ? strip(telefone.trim()) : null;
  const mensagemSafe = strip(mensagem.trim());

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "labpaulistaia@gmail.com",
      subject: `Contato via site — ${nomeSafe}`,
      text: [
        `Nome: ${nomeSafe}`,
        `E-mail: ${emailSafe}`,
        telefoneSafe ? `Telefone: ${telefoneSafe}` : null,
        ``,
        `Mensagem:`,
        mensagemSafe,
      ]
        .filter((l) => l !== null)
        .join("\n"),
    });

    if (error) {
      console.error("[Resend error]", JSON.stringify(error));
      return NextResponse.json({ error: "Falha ao enviar." }, { status: 500 });
    }

    console.log("[Resend ok]", data?.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Resend exception]", err);
    return NextResponse.json({ error: "Exceção ao enviar." }, { status: 500 });
  }
}
