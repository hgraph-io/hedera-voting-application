// https://nextjs.org/docs/app/building-your-application/routing/middleware
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
import type { Database } from '@/types';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });

  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs
  // "The getSession function must be called for any Server Component routes that use a Supabase client."
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user)
    switch (true) {
      case req.nextUrl.pathname.startsWith('/login'):
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  else
    switch (true) {
      case req.nextUrl.pathname.startsWith('/submission'):
      case req.nextUrl.pathname.startsWith('/dashboard'):
        return NextResponse.redirect(new URL('/login', req.url));
    }

  return res;
}
