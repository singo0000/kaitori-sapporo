import { NextResponse } from 'next/server';
import crypto from 'crypto';

// 管理パスワードは環境変数から取得
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'kaitori2026';

// トークン生成
function generateToken(): string {
    return crypto.randomBytes(32).toString('hex');
}

// 有効なトークンを保持（サーバーメモリ内）
// 本番環境ではRedisやDBで管理すべきだが、小規模サイトにはこれで十分
const validTokens = new Map<string, { createdAt: number }>();

// トークンの有効期限（24時間）
const TOKEN_EXPIRY = 24 * 60 * 60 * 1000;

// 期限切れトークンのクリーンアップ
function cleanExpiredTokens() {
    const now = Date.now();
    for (const [token, data] of validTokens.entries()) {
        if (now - data.createdAt > TOKEN_EXPIRY) {
            validTokens.delete(token);
        }
    }
}

// トークンの検証（外部からも利用）
export function verifyToken(token: string): boolean {
    cleanExpiredTokens();
    return validTokens.has(token);
}

// POST: ログイン
export async function POST(request: Request) {
    const body = await request.json();
    const { password } = body;

    if (password === ADMIN_PASSWORD) {
        const token = generateToken();
        validTokens.set(token, { createdAt: Date.now() });

        const response = NextResponse.json({ success: true });

        // HttpOnly Cookie にトークンを保存（XSS対策）
        response.cookies.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 24時間
            path: '/',
        });

        return response;
    }

    return NextResponse.json(
        { success: false, error: 'パスワードが正しくありません' },
        { status: 401 }
    );
}

// GET: トークン検証（ログイン状態チェック）
export async function GET(request: Request) {
    const token = request.headers.get('cookie')
        ?.split(';')
        .find(c => c.trim().startsWith('admin_token='))
        ?.split('=')[1];

    if (token && verifyToken(token)) {
        return NextResponse.json({ authenticated: true });
    }

    return NextResponse.json({ authenticated: false }, { status: 401 });
}
