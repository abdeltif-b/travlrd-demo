import { CodeIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { LogoutForm } from "@/components/forms";

export default async function Menu() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  return (
    <header className="flex items-center justify-between sticky w-full px-6 py-2 bg-white dark:bg-gray-900 shadow-md">
      <Link className="flex items-center" href="#">
        <CodeIcon className="w-8 h-8" />
        <span className="ml-2 text-lg font-bold text-gray-800 dark:text-gray-100">travlrd-demo</span>
      </Link>
      <div>{session ? session.user.email : null}</div>
      <div>{session ? <LogoutForm /> : null}</div>
    </header>
  );
}
