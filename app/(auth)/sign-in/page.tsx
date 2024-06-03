"use client";

import { login } from "@/actions/login";
import CustomInput from "@/components/CustomInput";
import { FormError } from "@/components/FormError";
import PlaidLink from "@/components/PlaidLink";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { signInSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function SignIn() {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (values: z.infer<typeof signInSchema>) => {
    setError("");

    startTransition(() => {
      login(values, callbackUrl).then((data) => {
        setError(data?.error);
        setUser(data?.user);
      });
    });
  };

  return (
    <section className="flex-center size-full max-sm:px-6">
      <section className="auth-form">
        <header className="flex flex-col gap-5 md:gap-8">
          <Link href="/" className="flex cursor-pointer items-center gap-1">
            <Image
              src="/icons/logo.svg"
              alt="Horizon Logo"
              height={34}
              width={34}
            />
            <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
              Horizon
            </h1>
          </Link>

          <div className="flex flex-col gap-1 md:gap-3">
            <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
              {user ? "Link Account" : "Sign In"}
              <p className="text-16 font-normal text-gray-600">
                {user
                  ? "Link your account to get started"
                  : "Please enter your details"}
              </p>
            </h1>
          </div>
        </header>
        {user ? (
          <div className="flex flex-col gap-4">
            <PlaidLink user={user} />
          </div>
        ) : (
          <>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <CustomInput
                  control={form.control}
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                />

                <CustomInput
                  control={form.control}
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                />

                <FormError message={error} />

                <div className="flex flex-col gap-4">
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="form-btn"
                  >
                    {isPending ? (
                      <>
                        <Loader2 size={20} className="animate-spin" /> &nbsp;
                        Loading...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </div>
              </form>
            </Form>

            <footer className="flex justify-center gap-1">
              <p className="text-14 font-normal text-gray-600">
                Don&apos;t have an account?
              </p>
              <Link href="/sign-up" className="form-link">
                Sign up
              </Link>
            </footer>
          </>
        )}
      </section>
    </section>
  );
}
