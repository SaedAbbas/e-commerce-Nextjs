// // app/api/login/route.js
// import { NextResponse } from 'next/server'
// import axios from 'axios'
// import { serialize } from 'cookie'

// export async function POST(request) {
//   const body = await request.json();
//   const { email, password } = body;

//   try {
//     const res = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/local`, {
//       identifier: email,
//       password: password
//     });

//     const { jwt } = res.data;

//     const response = NextResponse.json({ message: 'Login successful' });

//     response.headers.set(
//       'Set-Cookie',
//       serialize('token', jwt, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'strict',
//         path: '/',
//         maxAge: 60 * 60 * 24,
//       })
//     );

//     return response;

//   } catch (err) {
//     return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
//   }
// }


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

