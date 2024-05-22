"use client";

import { register } from "@/actions/register";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { signUpSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function SignUp() {
  const [user, setUser] = useState(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signUpSchema>) => {
    startTransition(() => {
      register(values).then((data) => {
        console.log(data);
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
              {user ? "Link Account" : "Sign Up"}
              <p className="text-16 font-normal text-gray-600">
                {user
                  ? "Link your account to get started"
                  : "Please enter your details"}
              </p>
            </h1>
          </div>
        </header>
        {user ? (
          <div className="flex flex-col gap-4">{/* PlaidLink*/}</div>
        ) : (
          <>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="flex gap-4">
                  <CustomInput
                    control={form.control}
                    name="firstName"
                    label="First Name"
                    placeholder="Enter your first name"
                    type="text"
                  />
                  <CustomInput
                    control={form.control}
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter your first name"
                  />
                </div>
                <CustomInput
                  control={form.control}
                  name="address1"
                  label="Address"
                  placeholder="Enter your specific address"
                />
                <CustomInput
                  control={form.control}
                  name="city"
                  label="City"
                  placeholder="Enter your city"
                />
                <div className="flex gap-4">
                  <CustomInput
                    control={form.control}
                    name="state"
                    label="State"
                    placeholder="Example: NY"
                  />
                  <CustomInput
                    control={form.control}
                    name="postalCode"
                    label="Postal Code"
                    placeholder="Example: 11101"
                  />
                </div>
                <div className="flex gap-4">
                  <CustomInput
                    control={form.control}
                    name="dateOfBirth"
                    label="Date of Birth"
                    placeholder="YYYY-MM-DD"
                    type="date"
                  />
                  <CustomInput
                    control={form.control}
                    name="aadhar"
                    label="Aadhar"
                    placeholder="Example: 1234 5555 4321"
                    maxLength={12}
                  />
                </div>

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
                      "Sign Up"
                    )}
                  </Button>
                </div>
              </form>
            </Form>

            <footer className="flex justify-center gap-1">
              <p className="text-14 font-normal text-gray-600">
                Already have an account?
              </p>
              <Link href="/sign-in" className="form-link">
                Sign in
              </Link>
            </footer>
          </>
        )}
      </section>
    </section>
  );
}
