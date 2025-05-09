import { NextRequest, NextResponse } from "next/server"


export const middleware = (request: NextRequest) => {
    const { pathname } = request.nextUrl
    // const auth = Cookie.get('auth')
    let auth = !!request?.cookies.get('auth')
    console.log('auth', auth)
    const PUBLIC_ROUTES = ['/auth/login', '/']
    if (!PUBLIC_ROUTES.includes(pathname) && !auth) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    if (auth && PUBLIC_ROUTES.includes(pathname)) {
        return NextResponse.redirect(new URL("/home", request.url));
    }

    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt).*)"]
};
