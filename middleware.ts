// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withErrorHandler } from "./utils/with.error.handler";
import { ForbiddenException } from "./utils/http.errors";
import { verifySessionOnServer } from "./lib/auth";

async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/pub")) {
    return NextResponse.next();
  }

  const session = await verifySessionOnServer();
  if (!session) {
    throw new ForbiddenException();
  }

  return NextResponse.next();
}

export default withErrorHandler(middleware);

export const config = {
  matcher: "/api/:path*",
};
