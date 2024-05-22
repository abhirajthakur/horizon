import { getUser } from "@/actions/user";
import { auth } from "@/auth";
import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const user = await getUser(session?.user?.id);

  return (
    <main className="flex h-screen w-full font-inter">
      <SessionProvider session={session}>
        <Sidebar user={user} />

        <div className="flex flex-col size-full">
          <div className="root-layout">
            <Image src="/icons/logo.svg" alt="logo" width={30} height={30} />
            <div className="">
              <MobileNav user={user} />
            </div>
          </div>
          {children}
        </div>
      </SessionProvider>
    </main>
  );
}
