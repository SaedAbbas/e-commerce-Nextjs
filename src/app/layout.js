import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/Compenets/Header";
import Footer from "@/Compenets/Footer";
import ReduxProvider from "@/Redux/ReduxProvider";

// استدعاء الخط بشكل صحيح
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat", // اسم متغير واضح
});

// معلومات الصفحة
export const metadata = {
  title: "E-commerce",
  description: "Generated by create next app",
};

// RootLayout
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <ReduxProvider>
          <Header />
          {children}
          {/* <Footer /> */}
        </ReduxProvider>
      </body>
    </html>
  );
}
