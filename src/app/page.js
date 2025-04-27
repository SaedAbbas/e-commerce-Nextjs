import Hero from "@/Compenets/Hero";
import ProudctSection from "@/Compenets/ProudctSection";
import Image from "next/image";
import image from "@/assets/image.jpg";
import image1 from "@/assets/image (1).jpg";
import image2 from "@/assets/image (2).jpg";

export default function Home() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
      <Image
        src={image}
        alt="hero"
        width={350}
        height={350}  
        className=""
      />
      <Image
        src={image1}
        alt="hero"
        width={350}
        height={350}  
        className=""
      />
      <Image
        src={image2}
        alt="hero"
        width={350}
        height={350}  
        className=""
      />

          {/* <Hero/>
          <ProudctSection/> */}
    </div>
  );
}
