import { auth } from "@/app/auth";
import Image from "next/image";

export default async function UserAvatar() {
  const session = await auth();

  if (!session || !session.user) return null;

  return (
    <div className="flex items-center">
      <Image
        src={session.user.img}
        width={20}
        height={20}
        alt="Avatar"
        className="overflow-hidden rounded-full"
      />
      <span className="ml-2">Welcome {session.user.name}</span>
    </div>
  );
}
