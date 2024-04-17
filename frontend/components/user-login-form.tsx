"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";

export function UserLoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const onChangeLogin: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: loginData.email,
        password: loginData.password,
      });
      if (result?.error) {
        setIsLoading(false);
        // Handle login error
        return toast({
          title: "Wrong credentials.",
          description: "Invalid email or password. Try again.",
          variant: "destructive",
        });
      } else {
        setIsLoading(false);
        // Redirect or handle successful login
        router.push("/dashboard");
        router.refresh;
        return toast({
          title: "Logged in",
          description: "Successfully logged in. Welcome",
        });
      }
    } catch (error: any) {
      setIsLoading(false);
      return toast({
        title: "Something went wrong.",
        description: error,
        variant: "destructive",
      });
    }
  }

  return (
    <div className={cn("grid gap-6")}>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              name="email"
              id="email"
              onChange={onChangeLogin}
              value={loginData.email}
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              required
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              name="password"
              id="password"
              onChange={onChangeLogin}
              value={loginData.password}
              placeholder="******"
              type="password"
              required
            />
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
