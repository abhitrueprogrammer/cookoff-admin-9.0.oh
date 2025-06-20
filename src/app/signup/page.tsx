"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import toast from "react-hot-toast";
import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import api from "@/api";
import { handleAPIError } from "@/lib/error";
import { signup, signupFormSchema } from "@/api/login";


export default function ProfileForm() {
  const [password, setPassword] = useState<string | null>(null);
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      regNumber: "",
      username: "",
    },
  });

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard
      .writeText(password)
      .then(() => {
        toast.success("Password copied to clipboard");
      })
      .catch(() => {
        toast.error("Failed to copy password");
      });
  };

  async function onSubmit(values: z.infer<typeof signupFormSchema>) {
    return toast.promise(
      (async () => {
        const response = await signup(values);
        setPassword(response.password);
        return response; // Important: return the response for success handling
      })(),
      {
        loading: "Creating account...",
        success: "Account created successfully!",
        error: "Failed to create account",
      },
    );
  }

  return (
    <div className="min-h-screen">
      <h1 className="s-sling pt-5 text-3xl font-bold text-accent">
        Create Your Account
      </h1>
      <p className="text-sm text-gray-500">
        Please fill out the form below to create your account. Your password
        will be generated after submission. Make sure to save it securely.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    className="text-white"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter your full name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="yourname@vitstudent.ac.in"
                    className="text-white"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Your VIT student email address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="regNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="REG123456"
                    className="text-white"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Your unique registration number.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="shadcn"
                    className="text-white"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
        <div className="mt-4 flex items-center space-x-2 text-sm text-gray-500">
          <p className="flex-1">
            {password
              ? `Your password is: ${password}. Please save it securely.`
              : "Your password will be generated after submission."}
          </p>
          {password && (
            <button
              type="button"
              onClick={handleCopy}
              aria-label="Copy password to clipboard"
              className="rounded p-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <Copy className="h-5 w-5" />
            </button>
          )}
        </div>
      </Form>
    </div>
  );
}
