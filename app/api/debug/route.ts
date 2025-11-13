import { NextResponse } from 'next/server';

export async function GET() {
  const debug = {
    databaseUrl: process.env.DATABASE_URL ? 'Set (hidden)' : 'NOT SET',
    databaseUrlLength: process.env.DATABASE_URL?.length || 0,
    nodeEnv: process.env.NODE_ENV,
    prismaClientExists: true,
  };

  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    await prisma.$connect();
    debug.prismaClientExists = true;
    await prisma.$disconnect();
    return NextResponse.json({ success: true, debug });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        debug,
      },
      { status: 500 }
    );
  }
}
