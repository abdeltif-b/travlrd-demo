import { createBusiness, deleteBusiness, logout, updateBusiness } from "@/components/actions";
import { CancelBusinessButton, DeleteBusinessButton, LogoutButton, SaveBusinessButton } from "@/components/buttons";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function LogoutForm() {
  return (
    <form action={logout}>
      <LogoutButton />
    </form>
  );
}

export async function DeleteBusinessForm({ businessId }: { businessId: number }) {
  const deleteBusinessWithId = deleteBusiness.bind(null, businessId);

  return (
    <form action={deleteBusinessWithId}>
      <DeleteBusinessButton />
    </form>
  );
}

export async function UpdateBusinessForm({ businessId }: { businessId: number }) {
  const updateBusinessWithId = updateBusiness.bind(null, businessId);

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.from("business").select("name").eq("id", businessId).limit(1).single();
  console.log(data);
  console.log(error);
  return (
    <form action={updateBusinessWithId} className="flex gap-2">
      <Input type="text" name="name" defaultValue={data?.name} />
      <CancelBusinessButton />
      <SaveBusinessButton />
    </form>
  );
}

export async function CreateBusinessForm() {
  return (
    <form action={createBusiness} className="flex gap-2">
      <Input type="text" name="name" />
      <CancelBusinessButton />
      <SaveBusinessButton />
    </form>
  );
}
