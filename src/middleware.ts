import { myDetails, verifyToken } from "@/api/auth/authApi";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (req.nextUrl.pathname.startsWith("/home")) {
    if (token) {
      try {
        const data = await verifyToken(token);

        if (data.success) {
          return NextResponse.next();
        }
      } catch (error) {
        console.error("Token verification failed:", error);
      }
    } else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*"],
};
