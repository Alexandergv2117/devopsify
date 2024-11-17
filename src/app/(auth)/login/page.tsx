"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";

export default function LoginPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState({ message: "" });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const res = await signIn("credentials", {
      email: data.user,
      password: data.password,
      redirect: false,
    });

    console.log(res);

    if (res?.error) {
      setErrorMessage({
        message: res.error,
      });
    } else {
      router.push("/");
    }
  });

  return (
    <div className="max-w-md w-full space-y-6 p-6 bg-background rounded-lg shadow-lg my-auto">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-primary">Login</h1>
      </div>
      <div>
        {errorMessage.message !== "invalid password" &&
          errorMessage.message !== "" && (
            <div className="text-red-500 text-sm p-2 bg-red-50 rounded-md">
              <p>{errorMessage.message}</p>
            </div>
          )}
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="text"
            label="Enter your email or username"
            isInvalid={
              !!errors.email ||
              errorMessage.message === "Email or username not found"
            }
            errorMessage={
              (errors.email && "Email or username is required") ||
              (errorMessage.message === "email not found" &&
                "Email or username not found")
            }
            {...register("user", { required: true })}
          />
        </div>
        <div className="space-y-2">
          <Input
            type="password"
            label="Password"
            minLength={8}
            isInvalid={
              !!errors.password || errorMessage.message === "invalid password"
            }
            errorMessage={
              (errors.password &&
                "Password is required or password is too short") ||
              (errorMessage.message === "invalid password" &&
                "Invalid password")
            }
            {...register("password", { required: true })}
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Sign in
        </Button>
      </form>
    </div>
  );
}
