import { CreateBusinessForm } from "@/components/forms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Page() {
  return (
    <div className="flex flex-col gap-2 p-6">
      <Card className="mx-auto min-w-full">
        <CardHeader>
          <CardTitle>Create a new business</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateBusinessForm />
        </CardContent>
      </Card>
    </div>
  );
}
