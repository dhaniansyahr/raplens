import LoginForm from "@/components/oragnism/login/LoginForm";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen p-6 md:grid md:grid-cols-2 md:p-10 bg-[#F4F4F4]">
      <div className="w-full h-full hidden md:flex items-center justify-center">
        <Image
          src="/banner-login.png"
          width={640}
          height={640}
          alt="Raplens: Rapor Online Holistik"
          className="max-w-[640px] max-h-[640px]"
        />
      </div>
      <LoginForm />
    </main>
  );
}
