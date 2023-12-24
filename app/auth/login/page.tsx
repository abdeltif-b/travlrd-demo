import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, signUp } from "@/components/actions";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/buttons";

export default function Login({ searchParams }: { searchParams: { message: string } }) {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Card className="mx-auto min-w-md">
        <CardHeader>
          <CardTitle>Login or sign-up</CardTitle>
          <CardDescription>Use your email to login or sign-up</CardDescription>
        </CardHeader>
        <form className="flex flex-col gap-2" action={signIn}>
          <CardContent>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" placeholder="you@example.com" required />
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" name="password" placeholder="••••••••" required />
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <LoginButton />
            <div className="text-xs">OR</div>
            <Button className="w-full" variant="secondary" formAction={signUp}>
              Sign-up
            </Button>
            {searchParams?.message && (
              <p className="text-red-500 text-sm font-semibold text-center">{searchParams.message}</p>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
