import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { password } = await req.json();
    const envPass = process.env.ADMIN_PASSWORD;
    if (!envPass) {
      // Fallback if environment variable is not set
      return NextResponse.json({ success: password === 'Vishal@11111' });
    }
    return NextResponse.json({ success: password === envPass });
  } catch(e) {
    return NextResponse.json({ success: false });
  }
}
