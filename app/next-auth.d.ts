import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      primaryRole: "Admin" | "User";
      roles: number[];
    } & DefaultSession["User"];
  }

  interface User extends DefaultUser {
    primaryRole: "Admin" | "User";
    roles: number[];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    primaryRole: "Admin" | "User";
    roles: number[];
  }
}
