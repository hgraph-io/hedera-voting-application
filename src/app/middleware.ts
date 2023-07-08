import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
import type { Database } from '@/types';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !['/', '/speaker/login'].includes(req.nextUrl.pathname))
    return NextResponse.redirect(new URL('/', req.url));

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - vote (vote routes to be handled by hedera wallet)
     * - public (public files)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!committee|public|_next/static|_next/image|favicon.ico).*)',
  ],
};
