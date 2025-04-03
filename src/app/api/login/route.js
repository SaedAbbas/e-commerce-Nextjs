import fetch from 'node-fetch';
import { serialize } from 'cookie';

export async function POST(req, res) {
  if (req.method === 'POST') {
    const { email, password } = await req.json();  // استلام البريد وكلمة المرور

    try {
      // إرسال الطلب إلى Strapi لتسجيل الدخول
      const response = await fetch(`${process.env.STRAPI_API_URL}/auth/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier: email, password: password }),
      });

      const data = await response.json();

      if (data.jwt) {
        // تخزين التوكن في HTTP-Only Cookie
        res.setHeader(
          'Set-Cookie',
          serialize('token', data.jwt, {
            httpOnly: true,  // الجافاسكريبت مش هتقدر تقرأ الكوكيز
            secure: process.env.NODE_ENV === 'production', // تشغيل HTTPS في بيئة الإنتاج
            sameSite: 'Strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 7,  // مدة الكوكيز: 7 أيام
          })
        );

        res.status(200).json({ message: 'Logged in successfully' });
      } else {
        res.status(400).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
