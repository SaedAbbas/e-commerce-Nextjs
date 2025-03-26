import Hero from "@/Compenets/Hero";
import ProudctSection from "@/Compenets/ProudctSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto">
          <Hero/>
          <ProudctSection/>

    </div>
  );
}
