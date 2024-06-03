import Image from "next/image";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <main className="flex min-h-screen w-full justify-between font-inter">
        {children}

        <div className="auth-asset">
          <div>
            <Image
              src="/icons/auth-image.png"
              alt="auth-image"
              width={500}
              height={500}
            />
          </div>
        </div>
      </main>
    </Suspense>
  );
}
