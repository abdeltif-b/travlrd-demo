import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { redirect } from "next/navigation";
import { RedirectToBusinessCreatePageButton, RedirectToBusinessUpdatePageButton } from "@/components/buttons";
import { Database } from "@/types/supabase";

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  type Business = Database["public"]["Tables"]["business"]["Row"];
  type Profile = Database["public"]["Tables"]["profiles"]["Row"];
  type NestedBusiness = Business & { profiles: Profile };
  const { data } = await supabase
    .from("business")
    .select(
      `
      id,
      name,
      created_at,
      profiles (
        id,
        email
      )
      `
    )
    .order("id", { ascending: false })
    .returns<NestedBusiness[]>();
  if (!session) redirect("/auth/login");

  return (
    <div className="flex flex-col gap-2 p-6">
      <RedirectToBusinessCreatePageButton />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-2">
        {data?.map((item) => (
          <div key={item.id}>
            <Card className="mx-auto min-w-md">
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>
                  Created by <b>{item.profiles.email}</b> at{" "}
                  <b>{format(new Date(item.created_at), "yyyy-MM-dd HH:mm")}</b>
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter>
                <RedirectToBusinessUpdatePageButton
                  businessId={item.id}
                  disabled={session?.user.id !== item.profiles.id}
                />
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
