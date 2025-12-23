import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 1. ფუნქციას აუცილებლად უნდა ერქვას middleware
export async function middleware(request: NextRequest) {
  const session = request.cookies.get('admin_session')
  const { pathname } = request.nextUrl

  // თუ მომხმარებელი ცდილობს /admin-ით დაწყებულ გვერდზე შესვლას
  if (pathname.startsWith('/admin')) {

    // თუ ლოგინის გვერდზეა, გავატაროთ
    if (pathname === '/admin/login') {
      // მაგრამ თუ უკვე დალოგინებულია, გადავიყვანოთ დეშბორდზე
      if (session) {
        return NextResponse.redirect(new URL('/admin/dashboard/', request.url))
      }
      return NextResponse.next()
    }

    // თუ სხვა ადმინ გვერდზეა და არ აქვს სესია, გავაგდოთ ლოგინზე
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

// 2. კონფიგურაცია, რომ middleware-მა მხოლოდ ადმინ როუტებზე იმუშაოს
export const config = {
  matcher: '/admin/:path*',
}
