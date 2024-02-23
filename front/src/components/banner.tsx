import React from "react";
import Image from "next/image";

function Banner() {
 return (
  <div className=" h-[6.25rem] bg-[#8556AA] flex gap-8 py-6 pl-[15.5rem] text-white">
   <div className=" flex gap-3 items-center">
    <Image
     src={"/dribble-square.svg"}
     width={50}
     height={52}
     alt="dribble square icon"
    />
    <div>
     <div className=" mb-3 font-bold">Tipo de quadra</div>
     <div className=" font-light">Society</div>
    </div>
   </div>
   <div className=" flex gap-3 items-center">
    <Image
     src={"/align-left.svg"}
     width={50}
     height={52}
     alt="dribble square icon"
    />
    <div>
     <div className=" mb-3 font-bold">Nível</div>
     <div className=" font-light">Semi-Profissional</div>
    </div>
   </div>
   <div className=" flex gap-3 items-center">
    <Image
     src={"/trophy.svg"}
     width={50}
     height={52}
     alt="dribble square icon"
    />
    <div>
     <div className=" mb-3 font-bold">Vitórias</div>
     <div className=" font-light">345</div>
    </div>
   </div>
  </div>
 );
}

export default Banner;
