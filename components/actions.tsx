"use server";
import { createClient } from "@/lib/supabase/server";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { error } = await supabase.auth.signOut();
  redirect("/auth/login");
}

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect("/auth/login?message=Could not authenticate user");
  }
  return redirect("/");
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
    return redirect("/auth/login?message=Could not authenticate user");
  }

  return redirect("/auth/login?message=Check email to continue sign in process");
}

export async function deleteBusiness(businessId: number, formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.from("business").delete().eq("id", businessId);

  redirect("/");
}

export async function updateBusiness(businessId: number, formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("business")
    .update({ name: formData.get("name") })
    .eq("id", businessId)
    .select();

  if (data?.length) {
    redirect("/");
  }
}

export async function createBusiness(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("business")
    .insert({ name: formData.get("name") })
    .select();

  if (data?.length) {
    // redirect(`/business/${data?.[0]?.id}`);
    redirect("/");
  }
}
