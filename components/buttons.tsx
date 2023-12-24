"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, CheckIcon, Cross1Icon, TrashIcon, Pencil1Icon, ExitIcon, EnterIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

export function LogoutButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant="destructive" type="submit" disabled={pending}>
      <ExitIcon className="mr-2 h-4 w-4" /> Logout
    </Button>
  );
}
export function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" disabled={pending}>
      <EnterIcon className="mr-2 h-4 w-4" /> Login
    </Button>
  );
}

export function RedirectToBusinessCreatePageButton() {
  const router = useRouter();

  return (
    <Button onClick={() => router.push("/business/")}>
      <PlusIcon className="mr-2 h-4 w-4" /> Create a new business
    </Button>
  );
}

export function RedirectToBusinessUpdatePageButton({
  businessId,
  disabled,
}: {
  businessId: number;
  disabled: boolean;
}) {
  const router = useRouter();

  return (
    <Button variant="outline" disabled={disabled} onClick={() => router.push(`/business/${businessId}`)}>
      <Pencil1Icon className="mr-2 h-4 w-4" /> Update
    </Button>
  );
}

export function CancelBusinessButton() {
  const router = useRouter();

  return (
    <Button variant="outline" type="reset" onClick={() => router.push("/")}>
      <Cross1Icon className="mr-2 h-4 w-4" /> cancel
    </Button>
  );
}

export function DeleteBusinessButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant="destructive" type="submit" disabled={pending}>
      <TrashIcon className="mr-2 h-4 w-4" /> Delete
    </Button>
  );
}

export function SaveBusinessButton() {
  const { pending, ...props } = useFormStatus();
  console.log(props);
  return (
    <Button type="submit" disabled={pending}>
      <CheckIcon className="mr-2 h-4 w-4" /> Save
    </Button>
  );
}
