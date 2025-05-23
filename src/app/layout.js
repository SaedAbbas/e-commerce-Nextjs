import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/Compenets/Header";
import Footer from "@/Compenets/Footer";
import ReduxProvider from "@/Redux/ReduxProvider";
import { Toaster } from "sonner";

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
        <Toaster />
        <ReduxProvider>
          <Header />
          {children}
          <Footer />
        </ReduxProvider>
        <script src="/assets/vendor/preline/dist/preline.js" defer></script>
      </body>
    </html>
  );
}
