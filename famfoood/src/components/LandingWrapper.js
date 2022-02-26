import HeroPartner from "./HeroPartner";
import '../App.css'
import Growth from "./Growth";
import Growth2 from "./Growth2";
import Cover from "./Cover";
import Growth3 from "./Growth3"
import Growth4 from "./Growth4";
import Growth5 from "./Growth5";

export default function LandingWrapper() {
  return (
    <>
      <HeroPartner />
      <Growth />
      <Growth3 />
      
      <Cover />
      <Growth2 />
     
      <Growth4 />
      <Growth5 />
      </>

  )
}