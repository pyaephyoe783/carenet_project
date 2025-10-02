import Image from "next/image";

// 🔑 Partner Logo များ၏ Data Array (ပုံ Path နှင့် နာမည်)
const partnerLogos = [
    { src: "/logos/unicef.png", alt: "UNICEF", width: 110, height: 40 },
    { src: "/logos/redcross.png", alt: "Red Cross", width: 90, height: 40 },
    { src: "/logos/global-fund.jpg", alt: "Global Fund", width: 130, height: 40 },
    { src: "/logos/care-international.png", alt: "Care International", width: 120, height: 40 },
];

const PartnerSection = () => (
    <section className="mb-16">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">
            Trusted by Our Partners
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-10 opacity-70">
            {partnerLogos.map((logo, index) => (
                <Image 
                    key={index} 
                    src={logo.src} // ✅ Public Path ကို သုံးခြင်း (ဥပမာ: /logos/unicef.svg)
                    alt={logo.alt} 
                    width={logo.width} 
                    height={logo.height} 
                    className="object-contain max-h-10 size-20" // 💡 Logo တွေရဲ့ အမြင့်ကို ထိန်းညှိဖို့
                />
            ))}
        </div>
    </section>
);


export default PartnerSection;