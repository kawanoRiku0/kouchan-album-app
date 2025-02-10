import { type NextRequest, NextResponse } from 'next/server';

const USERNAME = process.env.BASIC_AUTH_USER;
const PASSWORD = process.env.BASIC_AUTH_PASSWORD;

export function middleware(req: NextRequest) {
  if (!USERNAME || !PASSWORD) {
    throw new Error('BASIC_AUTH_USER or BASIC_AUTH_PASSWORD is not set');
  }

  const authHeader = req.headers.get('authorization');

  if (!authHeader) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  // Basic 認証情報の解析
  const auth = authHeader.split(' ')[1];
  const decoded = Buffer.from(auth ?? '', 'base64').toString();
  const [user, pass] = decoded.split(':');

  if (user !== USERNAME || pass !== PASSWORD) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/albums/:path*',
};
