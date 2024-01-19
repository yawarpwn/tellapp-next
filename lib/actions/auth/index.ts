'use server'

import { headers, cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";


type State = {
  errors?: {
    email?: string[]
    password?: string[]
  },
  message?: string | null
}

const AuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function signIn(prev: State, formData: FormData) {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string
  };

  const validateFields = AuthSchema.safeParse(rawData);

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Campos incorrectos'
    }
  }

  const { email, password } = validateFields.data

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect("/login?message=Crendenciales Incorrectas");
  }

  return redirect("/dashboard");
}

export async function signUp(formData: FormData) {
  const origin = headers().get("origin");
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return redirect("/login?message=Crendenciales Incorrectas");
  }

  return redirect("/login?message=Check email to continue sign in process");
}
