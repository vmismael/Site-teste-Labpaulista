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

  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "labpaulistaia@gmail.com",
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
      console.error("[Resend error]", JSON.stringify(error));
      return NextResponse.json(
        { error: "Falha ao enviar.", detail: error },
        { status: 500 }
      );
    }

    console.log("[Resend ok]", data?.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Resend exception]", err);
    return NextResponse.json(
      { error: "Exceção ao enviar.", detail: String(err) },
      { status: 500 }
    );
  }
}
