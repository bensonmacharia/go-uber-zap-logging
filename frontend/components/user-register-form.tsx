"use client";

import { FormEvent, useState } from "react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";

export function UserRegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onChangeRegister: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });
      if (response.ok) {
        const data = await response.json();
        const { message } = data;
        setRegisterData({
          username: "",
          email: "",
          password: "",
        });
        setIsLoading(false);
        router.push("/login");
        return toast({
          title: "Welcome",
          description: "Successfully registered, you can login now.",
        });
      } else {
        setIsLoading(false);
        return toast({
          title: "Something went wrong.",
          description: "Failed to register. Try again",
          variant: "destructive",
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
            <Label className="sr-only" htmlFor="username">
              Username
            </Label>
            <Input
              name="username"
              id="username"
              placeholder="username"
              type="text"
              onChange={onChangeRegister}
              value={registerData.username}
              autoCapitalize="none"
              autoCorrect="off"
              required
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              name="email"
              id="email"
              placeholder="name@example.com"
              type="email"
              onChange={onChangeRegister}
              value={registerData.email}
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
              placeholder="******"
              type="password"
              onChange={onChangeRegister}
              value={registerData.password}
              required
            />
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
