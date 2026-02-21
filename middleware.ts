import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // /api/leads へのアクセスを保護（GET のみ。POSTは公開チャットから呼ばれるため許可）
    if (pathname === '/api/leads' && request.method === 'GET') {
        const token = request.cookies.get('admin_token')?.value;
        if (!token) {
            return NextResponse.json(
                { error: '認証が必要です' },
                { status: 401 }
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/api/leads'],
};
