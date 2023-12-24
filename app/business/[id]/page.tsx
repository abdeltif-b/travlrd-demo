import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DeleteBusinessForm, UpdateBusinessForm } from "@/components/forms";

export default async function Page({ params }: { params: { id: number } }) {
  return (
    <div className="flex flex-col gap-2 p-6">
      <Card className="mx-auto min-w-full">
        <CardHeader>
          <CardTitle>Update the business</CardTitle>
        </CardHeader>
        <CardContent>
          <UpdateBusinessForm businessId={params.id} />
        </CardContent>
        <CardFooter className="flex gap-2">
          <DeleteBusinessForm businessId={params.id} />
        </CardFooter>
      </Card>
    </div>
  );
}
