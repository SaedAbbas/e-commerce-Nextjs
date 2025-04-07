// pages/api/login.ts
import { serialize } from 'cookie';  // استيراد serialize لتحويل الكوكي إلى سلسلة نصية
import axios from 'axios';  // استيراد axios لإجراء طلبات API
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req, res) {
  const { email, password } = req.body;  // استخراج الإيميل وكلمة المرور من الطلب

  try {
    // إرسال طلب POST لسترابي للتحقق من بيانات المستخدم
    const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/local`, {
      identifier: email,  // استخدام الإيميل كـ identifier
      password: password  // إرسال كلمة المرور
    });

    const { jwt } = response.data;  // استخراج التوكن (JWT) من الاستجابة

    // حفظ التوكن في الكوكي باستخدام `serialize`
    res.setHeader('Set-Cookie', serialize('token', jwt, {
      httpOnly: true,  // جعل الكوكي غير قابل للوصول بواسطة جافاسكربت (أمان ضد XSS)
      secure: process.env.NODE_ENV === 'production',  // إرسال الكوكي فقط في بيئة الإنتاج باستخدام HTTPS
      sameSite: 'strict',  // منع إرسال الكوكي مع طلبات من مواقع أخرى (أمان ضد CSRF)
      path: '/',  // جعل الكوكي صالحًا لكل المسارات
      maxAge: 60 * 60 * 24,  // تحديد مدة صلاحية الكوكي (24 ساعة)
    }));

    res.status(200).json({ message: 'Login successful' });  // إرسال استجابة ناجحة للمستخدم

  } catch (error) {
    res.status(401).json({ message: 'Invalid credentials' });  // إذا كانت البيانات غير صحيحة
  }
}

// import { parse } from "cookie";

// export async function getServerSideProps({ req }) {
//   const cookies = parse(req.headers.cookie || "");
//   const token = cookies.token;

//   if (!token) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   // هنا تقدر تستخدم التوكن لعمل أي تحقق أو استعلام من Strapi
//   return {
//     props: { token },
//   };
// }

