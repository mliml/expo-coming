import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { featureId } = body;

    if (!featureId) {
      return NextResponse.json(
        { error: 'Feature ID is required' },
        { status: 400 }
      );
    }

    // Get user IP address
    const forwarded = request.headers.get('x-forwarded-for');
    const ipAddress = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
    const userAgent = request.headers.get('user-agent') || '';

    // Check if user has already voted for this feature (optional anti-spam)
    // You can uncomment this to prevent duplicate votes from same IP
    /*
    const existingVote = await prisma.vote.findFirst({
      where: {
        featureId,
        ipAddress,
      },
    });

    if (existingVote) {
      return NextResponse.json(
        { error: 'You have already voted for this feature' },
        { status: 400 }
      );
    }
    */

    // Create vote record
    await prisma.vote.create({
      data: {
        featureId,
        ipAddress,
        userAgent,
      },
    });

    // Increment feature vote count
    const updatedFeature = await prisma.feature.update({
      where: { id: featureId },
      data: {
        votes: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(updatedFeature);
  } catch (error) {
    console.error('Error processing vote:', error);
    return NextResponse.json(
      { error: 'Failed to process vote' },
      { status: 500 }
    );
  }
}
