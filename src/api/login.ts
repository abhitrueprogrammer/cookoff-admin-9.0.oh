import { handleAPIError } from "@/lib/error";
import { type ApiResponse } from "@/schemas/api";
import { type loginFormSchema } from "@/schemas/forms/login";
import api from ".";
import { z } from "zod";

export async function login(body: z.infer<typeof loginFormSchema>) {
  try {
    const { data } = await api.post<ApiResponse>(`/login/user`, body);
    return data.message;
  } catch (e) {
    throw handleAPIError(e);
  }
}

export const signupFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    .refine((email) => email.endsWith("@vitstudent.ac.in"), {
      message: "Email must be from vitstudent.ac.in domain.",
    }),
  regNumber: z.string().min(1, {
    message: "Registration number is required.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export type SignupResponse = {
  message: string;
  email: string;
  password: string;
};

export async function signup(
  body: z.infer<typeof signupFormSchema>
): Promise<SignupResponse> {
  try {
    const payload = {
      email: body.email,
      name: body.name,
      reg_no: body.regNumber,
      fuck_you: process.env.NEXT_PUBLIC_PASSWD_KEY,
    };

    const { data } = await api.post<SignupResponse>("/user/signup", payload);
    return data;
  } catch (e) {
    throw handleAPIError(e);
  }
}