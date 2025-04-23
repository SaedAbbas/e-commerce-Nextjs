import LinearLoginCodeEmail from '@/Compenets/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, validationCode } = body;

    const { data, error } = await resend.emails.send({
      from: 'Saeed Abbas <onboarding@resend.dev>',
      to: [email],
      subject: 'سعيد يشكرك – هذا رمز تأكيدك الشخصي',
      react: LinearLoginCodeEmail({ validationCode }),
    });

    if (error) {
      return new Response(JSON.stringify({ error }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
