import {NextRequest, NextResponse} from "next/server";

export default function secureTools(request: NextRequest) {
    if( request.nextUrl.pathname.startsWith("/tools")) return NextResponse.redirect(new URL('/', request.url));
}
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}