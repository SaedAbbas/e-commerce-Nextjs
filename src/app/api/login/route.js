import { parse } from "cookie";

export async function getServerSideProps({ req }) {
  const cookies = parse(req.headers.cookie || "");
  const token = cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // هنا تقدر تستخدم التوكن لعمل أي تحقق أو استعلام من Strapi
  return {
    props: { token },
  };
}
