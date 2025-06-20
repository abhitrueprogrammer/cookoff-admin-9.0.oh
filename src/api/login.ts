import { handleAPIError } from "@/lib/error";
import { type ApiResponse } from "@/schemas/api";
import { type loginFormSchema } from "@/schemas/forms/login";
import { type z } from "zod";
import api from ".";
import { signupFormSchema } from "@/app/signup/page";

export async function login(body: z.infer<typeof loginFormSchema>) {
  try {
    const { data } = await api.post<ApiResponse>(`/login/user`, body);
    return data.message;
  } catch (e) {
    throw handleAPIError(e);
  }
}


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