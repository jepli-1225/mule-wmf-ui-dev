import { auth } from "@/app/auth";

export default async function UserCard() {
  const session = await auth();
  if (!session || !session.user) return null;

  return (
    <div className="text-base grid grid-cols-[auto,1fr] gap-x-14 gap-y-2 w-full max-w-2xl">
      <p>Email:</p>
      <p> {session.user.email}</p>
      <p>Role:</p>
      <p> {session.user.role}</p>
    </div>
  );
}
