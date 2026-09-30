import { NextResponse } from 'next/server';

const API_URL = 'https://api.polza.ai/api/v1/chat/completions';

export async function POST(req: Request) {
  const apiKey = process.env.POLZA_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'POLZA_API_KEY is not set' }, { status: 500 });
  }

  const { system, content } = await req.json();

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'openai/gpt-4o',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content },
      ],
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Upstream request failed' }, { status: res.status });
  }

  const json = await res.json();
  return NextResponse.json({ text: json.choices[0].message.content });
}
