// src/app/api/send-email/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { email, message } = await request.json();
  console.log('Received message:', { email, message });

  const apiKey = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN;

  const mailgunUrl = `https://api.mailgun.net/v3/${domain}/messages`;

  try {
    const response = await fetch(mailgunUrl, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        from: `<mailgun@${domain}>`,
        to: 'rebbapragada.s@northeastern.edu',
        subject: 'New message from portfolio contact form',
        text: `Email: ${email}\nMessage: ${message}`,
      }),
    });

    if (!response.ok) {
      console.error('Failed to send message:', response.statusText);
      return NextResponse.json({ error: `Failed to send message: ${response.statusText}` }, { status: response.status });
    }
    console.log('Message sent successfully');
    return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
