import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = await req.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Corpo inválido." }, { status: 400 });
  }

  const { nome, email, telefone, mensagem } = body as Record<string, string>;

  if (!nome?.trim() || !email?.trim() || !mensagem?.trim()) {
    return NextResponse.json(
      { error: "Campos obrigatórios ausentes." },
      { status: 400 }
    );
  }

  const { error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "contato@labpaulistarc.com.br",
    subject: `Contato via site — ${nome}`,
    text: [
      `Nome: ${nome}`,
      `E-mail: ${email}`,
      telefone ? `Telefone: ${telefone}` : null,
      ``,
      `Mensagem:`,
      mensagem,
    ]
      .filter((l) => l !== null)
      .join("\n"),
  });

  if (error) {
    return NextResponse.json({ error: "Falha ao enviar." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
