import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('admin_session')
  const { pathname } = request.nextUrl

  // თუ მომხმარებელი ცდილობს /admin-ით დაწყებულ გვერდზე შესვლას
  if (pathname.startsWith('/admin')) {

    // თუ სხვა ადმინ გვერდზეა და არ აქვს სესია, გავაგდოთ ლოგინზე
    // login გვერდი (auth)/login-შია, ანუ URL-ი არის /login
    if (!session) {
      return NextResponse.redirect(new URL('/login?error=session_expired', request.url))
    }
  }

  return NextResponse.next()
}

// კონფიგურაცია: middleware მხოლოდ ადმინ როუტებზე მუშაობს
export const config = {
  matcher: '/admin/:path*',
}
